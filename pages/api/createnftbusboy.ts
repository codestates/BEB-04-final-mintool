import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import busboy from 'busboy';
import sharp from 'sharp';
import deploy from '../../lib/deploy';

type simpleParsedObj = { [idx: string]: string }
type indexSignaturesOfParedObj = {
  AttrName: string,
  values: Array<string>,
  fileArr: Array<Uint8Array>
}


interface reqBodyObject {
  [key: string]: indexSignaturesOfParedObj | simpleParsedObj
  description: simpleParsedObj
  external_url: simpleParsedObj
  projectName: simpleParsedObj
  symbol: simpleParsedObj
}

function isIndexSignaturesOfParedObj(arg: any): arg is indexSignaturesOfParedObj {
  return typeof arg.AttrName === 'string';
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if (req.method === 'POST' && req?.headers['content-type']?.includes('multipart/form-data')) {

    const bb = busboy({ headers: req.headers })
    const ret: any[] = [];
    let dataObj: any = {};

    const bbPromise =new Promise((res, rej) => {
      try {
        bb.on('file', (name, file, info) => {
          const { filename, encoding, mimeType } = info;
          let buffArr: any = [];
          let myFile: any = null;
          file.on('data', function (data) {

            buffArr = buffArr.concat(Object.values(data));

          });
          file.on('end', function () {

            myFile = new Uint8Array(buffArr);
            ret.push(myFile);
          });
        })
        bb.on('field', function (fieldname, val) {
          dataObj = JSON.parse(val);
        });

        bb.on('finish', function () {
          let cidx = 0;
          Object.keys(dataObj)
            .slice(0, -4)
            .forEach((k, idx) => {
              // console.log(dataObj[k].fileArr.length);
              const len = dataObj[k].fileArr.length;
              dataObj[k].fileArr = ret.slice(cidx, cidx + len);
              cidx += len;
            })
          res(true);
        });
        req.pipe(bb);
      } catch (e) { rej(false) }
    })


    //site url : 마지막에 슬래시 없이 진행할 것.
    const siteURL = `http://${req.headers.host}`;
    // console.log(siteURL);
    // const siteURL = "https://beb-04-final-mintool.vercel.app"
    let dataArr: Array<{ imgBuffer: Promise<Uint8Array>, meta: Array<{ trait_type: string, value: string }> }> = [];
    type DataArr = { imgBuffer: Buffer | Uint8Array, meta: { trait_type: string, value: string }[] }[];

    


    const myClient = await promiseClient;
    await bbPromise;
    const myObj: reqBodyObject = dataObj;

    let limitNum = 1;
    Object.keys(myObj).slice(0,-4).forEach(idx=>{
      limitNum = limitNum * myObj[idx].fileArr.length;
    }) 
    
    if(limitNum > 500) { res.send({message : 'nft number exceeds limitation'}); return; }
    if(await myClient.db(`${myObj.projectName}`).collection('contract').find({}).toArray().then(r => r.length > 0)) { res.send({ message: 'nft already exists' }); return; }
    
    const isContractDone = deploy(myObj.projectName, myObj.symbol[0]).then(contractAddress=>{
      myClient.db('users').collection(`${myObj.symbol[1]}`).insertOne({ contractAddress: contractAddress, nftName: myObj.projectName }).then(result=>{if(!result.acknowledged){throw "error db"} })
      myClient.db(`${myObj.projectName}`).collection(`contract`).insertOne({ contractAddress: contractAddress }).then(result=>{if(!result.acknowledged){throw "error db"} })
    })


    if (!myObj.symbol) { console.log('symbol error'); res.status(400).send({ message: "symbol not found" }); return; }


    if (isIndexSignaturesOfParedObj(myObj['0'])) {
      dataArr = 
        myObj['0'].fileArr.map((file, idx) => {
          //metaData part
          const name = myObj['0'].AttrName;
          const val = myObj['0'].values[idx];
          const meta = { trait_type: name, value: val };
          const aImg : Promise<Uint8Array> = new Promise(res=>res(file));

          return { imgBuffer: aImg, meta: [meta] };
        })
    }
    else { res.send({ message: 'received data is not right' }); return; }


    for (let index of Object.keys(myObj).slice(1, -4)) {
      // console.log(myObj[index]);
      if (isIndexSignaturesOfParedObj(myObj[index])) {
        const indexedObj = myObj[index] as indexSignaturesOfParedObj;
        const indexAttrName = indexedObj.AttrName;
        // console.log(indexAttrName);

        const tmpArr = [];
        for (let dataArrIndex in dataArr) {

          for (let myObjIndex in indexedObj.fileArr) {
            // metadata part
            const newMeta = JSON.parse(JSON.stringify(dataArr[dataArrIndex].meta));
            const newMetaObj = { trait_type: indexAttrName, value: indexedObj.values[myObjIndex] };
            newMeta.push(newMetaObj);
            // tmpArr.push({meta : newMeta});
            //img part
            const bI = dataArr[dataArrIndex].imgBuffer;
            const img = bI.then(baseImg=>{
              return (
              sharp(baseImg)
              .composite([
                { input: (new Uint8Array(Object.values(indexedObj.fileArr[myObjIndex])) as Buffer) }
              ])
              .toBuffer()
              )
            })
            

            tmpArr.push({ imgBuffer: img, meta: newMeta });
          }
        }
        dataArr = tmpArr;
      }
      else { res.send({ message: 'received data is not right' }); return; }
    }
    // console.log('dataArr metadata is : ', dataArr.map(e => e.meta));
    // console.log('dataArr img is : ', dataArr.map(e => e.imgBuffer.length));

    

    const promiseArr : Array<Promise<any>> = [];
    
    const dbImgItem =
      dataArr.map((e, idx) => {
        const imgObj: { [idx: string]: any } = {};
        promiseArr.push(
          e.imgBuffer.then(img=>{
          imgObj['img'] = img;
        })
        )
        imgObj['index'] = idx;
        return imgObj;
      })
      
      const dbMetaItem =
      dataArr.map((e, idx) => {
        const metaObj: { [idx: string]: any } = {};
        metaObj['index'] = idx;
        metaObj[`object`] =
        {
          description: myObj.description,
          external_url: myObj.external_url,
          image_data: `${siteURL}/api/fs/${myObj.projectName}/img/${idx}`,
          name: `${myObj.symbol[0]}#${idx}`,
          attributes: e.meta
        }
        return metaObj;
      })
      myClient.db(`${myObj.projectName}`).collection('meta').insertMany(dbMetaItem).then(dbres=>{
        if (!dbres.acknowledged) { throw "db error"}
      })
      
      const isImgDone = Promise.all(promiseArr).then( x=>
        myClient.db(`${myObj.projectName}`).collection('img').insertMany(dbImgItem).then(dbres=>{
          if (!dbres.acknowledged) { throw "db error"}
        })
      )

    await isImgDone;
    await isContractDone;

    res.send({message : true})



  }
  else { res.send({ message: 'wrong access' }) }

}


export const config = {
  api: {
    bodyParser: false
  }
}