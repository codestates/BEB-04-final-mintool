
import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import busboy from 'busboy';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  // let data = 0;
  // new Promise((res,rej)=>{
  //   req.on('data',(chunk)=>{console.log(chunk.length); data+=chunk.length;})
  //   req.on('end',()=>{console.log('end'); res(1)})
    
  // }).then(z=>res.send({datalen : data}))
  if ( req.method === 'POST' && req?.headers['content-type']?.includes('multipart/form-data') ) {
      console.log('ho');
      const bb = busboy({headers : req.headers})
      
      bb.on('file', (name,file,info)=>{
        const { filename, encoding, mimeType } = info;
        console.log(  `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
        filename,
        encoding,
        mimeType)
        file.on('data', function (data) {
          console.log('File [' + filename + '] got ' + data.length + ' bytes');
        });
        file.on('end', function () {
          console.log('File [' + filename + '] Finished');
        });
      })
      bb.on('field', function (fieldname, val) {
        console.log('Field [' + fieldname + ']: value: ' + val);
      });
      bb.on('finish', function () {
        console.log('Done parsing form!');
        res.send({mesage : 'finished'});
      });

      req.pipe(bb);
      // res.send({message : "hi"});
    }
    else{ res.send({message : 'wrong access'})}
}



export const config = {
    api: {
      bodyParser: false
    }
  }