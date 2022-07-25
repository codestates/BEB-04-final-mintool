
import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import busboy from 'busboy';
import sharp from 'sharp';
import deploy from '../../lib/deploy';

type simpleParsedObj = { [idx: string]: string }
type indexSignaturesOfParedObj = {
  AttrName: string,
  values: Array<string>,
  fileArr: Array<{ [idx: string]: number }>
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

    const isDone: boolean = await new Promise((res, rej) => {
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

    if (!isDone) { res.send({ message: 'bb error' }); return; }


    const myClient = await promiseClient;

    const myObj: reqBodyObject = dataObj;

    if (await myClient.db(`${myObj.projectName}`).collection('contract').find({}).toArray().then(r => r.length > 0)) { res.send({ message: 'nft already exists' }); return; }

    const siteURL = req.headers.host;



    const backgroundImg = new Uint8Array(Object.values(myObj['0'].fileArr[0]));

    let dataArr: Array<{ imgBuffer: Uint8Array, meta: Array<{ trait_type: string, value: string }> }> = [];

    if (!myObj.symbol) { console.log('symbol error'); res.status(400).send({ message: "symbol not found" }); return; }


    if (isIndexSignaturesOfParedObj(myObj['0'])) {
      dataArr = await Promise.all(
        myObj['0'].fileArr.map(async (file, idx) => {
          //metaData part
          const name = myObj['0'].AttrName;
          const val = myObj['0'].values[idx];
          const meta = { trait_type: name, value: val };

          //image part
          const aImg : any = new Uint8Array(Object.values(file));

          return { imgBuffer: aImg, meta: [meta] };
        })
      )
    }
    else { res.send({ message: 'received data is not right' }); return; }

    res.send({ message: 'ok' });

    // 
    for (let index of Object.keys(myObj).slice(1, -4)) {

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
            const baseImg = dataArr[dataArrIndex].imgBuffer;
            const img = await
              sharp(baseImg)
                .composite([
                  { input: (new Uint8Array(Object.values(indexedObj.fileArr[myObjIndex])) as Buffer) }
                ])
                .toBuffer()

            tmpArr.push({ imgBuffer: img, meta: newMeta });
          }
        }
        dataArr = tmpArr;
      }
      else { res.send({ message: 'received data is not right' }); return; }
    }
    // console.log('dataArr metadata is : ', dataArr.map(e => e.meta));
    // console.log('dataArr img is : ', dataArr.map(e => e.imgBuffer.length));

    type DataArr = { imgBuffer: Buffer | Uint8Array, meta: { trait_type: string, value: string }[] }[];




    console.log(myObj.symbol);
    const contractAddress = await deploy(myObj.projectName, myObj.symbol[0]);
    if (!(await myClient.db('users').collection(`${myObj.symbol[1]}`).insertOne({ contractAddress: contractAddress, nftName: myObj.projectName })).acknowledged) { res.send({ message: 'db error' }); return; };
    if (!(await myClient.db(`${myObj.projectName}`).collection(`contract`).insertOne({ contractAddress: contractAddress })).acknowledged) { res.send({ message: 'db error' }); return; };
    const dbImgItem =
      dataArr.map((e, idx) => {
        const imgObj: { [idx: string]: any } = {};
        imgObj['index'] = idx;
        imgObj['img'] = e.imgBuffer
        return imgObj;
      })
    myClient.db(`${myObj.projectName}`).collection('img').insertMany(dbImgItem);

    const dbMetaItem =
      dataArr.map((e, idx) => {
        const metaObj: { [idx: string]: any } = {};
        metaObj['index'] = idx;
        metaObj[`object`] =
        {
          description: myObj.description,
          external_url: myObj.external_url,
          image: `${siteURL}/api/fs/${myObj.projectName}/img/${idx}`,
          name: `${myObj.symbol[0]}#${idx}`,
          attributes: e.meta
        }
        return metaObj;
      })
    const dbres = await myClient.db(`${myObj.projectName}`).collection('meta').insertMany(dbMetaItem);


    if (dbres.acknowledged) { res.send({ message: true }); return; }
    
    res.send({message : "ok"})



  }
  else { res.send({ message: 'wrong access' }) }

}


export const config = {
  api: {
    bodyParser: false
  }
}