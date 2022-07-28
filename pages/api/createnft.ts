// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next'
import mongoClient from '../../lib/mongodb'
import deploy from '../../lib/deploy'
require('dotenv').config();


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
  projectName : simpleParsedObj
  symbol : simpleParsedObj
}

function isIndexSignaturesOfParedObj(arg: any): arg is indexSignaturesOfParedObj {
  return typeof arg.AttrName === 'string';
}



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // hard coded data 
// const siteURL = process.env.SITE_URL;
const siteURL = req.headers.host;
// console.log(req.headers.host);
  //
  

  const myObj: reqBodyObject = JSON.parse(req.body);
  // console.log(siteURL);
  // console.log(Object.keys(myObj));
  // console.log(Object.values(myObj.description));
  // console.log(Object.values(myObj.external_url));

  // console.log(myObj['1']['AttrName'], myObj['1']['values']);


  //save images from req.body
  const backgroundImg = new Uint8Array(Object.values(myObj['0'].fileArr[0]));
  // const compImg = new Uint8Array(Object.values(myObj['1'].fileArr[4]));
  // let dataArr: { imgBuffer: Buffer | Uint8Array, meta: { trait_type: string, value: string }[] }[] = [];
  let dataArr: Array<{ imgBuffer: Uint8Array, meta: Array<{ trait_type: string, value: string }> }> = [];

  if(!myObj.symbol) { console.log('symbol error'); res.status(400).send({message : "symbol not found"}); return;}
  

  if (isIndexSignaturesOfParedObj(myObj['0'])) {
    dataArr = await Promise.all(
      myObj['0'].fileArr.map(async (file, idx) => {
        //metaData part
        const name = myObj['0'].AttrName;
        const val = myObj['0'].values[idx];
        const meta = { trait_type: name, value: val };

        //image part
        const aImg = new Uint8Array(Object.values(file));

        return { imgBuffer: aImg, meta: [meta] };
      })
    )
  }
  else { res.send({ message: 'received data is not right' }); return; }

  res.send({message: 'ok'});

  // 
  for (let index of Object.keys(myObj).slice(1, -4)) {

    if (isIndexSignaturesOfParedObj(myObj[index])) {
      const indexedObj = myObj[index] as indexSignaturesOfParedObj;
      const indexAttrName = indexedObj.AttrName;

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
                { input : (new Uint8Array(Object.values(indexedObj.fileArr[myObjIndex])) as Buffer) }
              ])
              .toBuffer()

          // img 저장 파트
          // sharp(baseImg)
          //   .composite([
          //     { input: new Uint8Array(Object.values(indexedObj.fileArr[myObjIndex])) }
          //   ])
          //   .toFile(`${dataArrIndex}_${myObjIndex}.png`);
          tmpArr.push({ imgBuffer: img, meta: newMeta });
        }
      }
      dataArr = tmpArr;
    }
    else { console.log({ message: 'received data is not right' }); return; }
  }

  type DataArr = { imgBuffer: Buffer | Uint8Array, meta: { trait_type: string, value: string }[] }[];

  // db structure 

  // dbName : MetaData
  // collectionName : test    // should be username or ...?

  // document structure
  // {
  //   
  //   {
  //     "description": "Friendly OpenSea Creature that enjoys long swims in the ocean.",   // front page should get this field from user. ( optional )
  //     "external_url": "https://openseacreatures.io/3",
  //     "image": "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
  //     "name": "Dave Starbelly",
  //     "attributes": [... ], 
  //   }
  // }
  //  many of document which has this structure wll be placed at db('MetaData').collection(`${userId}`)



  const myClient = await mongoClient;

  const contractAddress = await deploy(myObj.projectName, myObj.symbol[0]);
  if(!(await myClient.db('users').collection(`${myObj.symbol[1]}`).insertOne({contractAddress : contractAddress, nftName : myObj.projectName})).acknowledged) {console.log({message:'db error'}); return; };
  if(!(await myClient.db(`${myObj.projectName}`).collection(`contract`).insertOne({contractAddress : contractAddress})).acknowledged) {console.log({message:'db error'}); return; };
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
      // const imgBuffer: Promise<any> = await myClient.db('test').collection('test').find({ index: idx }).toArray()
      //   .then(
      //     r => {
      //       console.log(Object.keys(r[idx].img));
      //       console.log(r[idx].img?.buffer);     // 이미지 버퍼 쓸때 사용
      //       sharp(r[idx].img?.buffer)
      //         .toFile(`${idx}.png`);
      //       return r[idx].img?.buffer;
      //     }

      //   );
      metaObj['index'] = idx;
      metaObj[`object`] =
      {
        description: myObj.description,
        external_url: myObj.external_url,
        image: `${siteURL}/api/fs/${myObj.projectName}/img/${idx}`,
        name : `${myObj.symbol[0]}#${idx}`,
        attributes : e.meta
      }
      return metaObj;
    })
  const dbres = await myClient.db(`${myObj.projectName}`).collection('meta').insertMany(dbMetaItem);

  
  if(dbres.acknowledged) {console.log({message : true}); return;}
  console.log({message : false});

}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: '4.5mb' // Set desired value here
    }
  }
}
