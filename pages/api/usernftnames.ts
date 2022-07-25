import promiseClinet from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const x = JSON.parse(req.body);
    console.log(x,typeof x["address"]);

    // console.log(req.body.bn);
    const myMongoDB = await promiseClinet;
    const ret = await myMongoDB.db('users').collection(`${x.address}`).find({}).toArray().then((objArr : any)=>objArr.map((e : any)=>e.nftName));
    console.log(ret);

    // const myForm = formidable({multiples : true});
  
    // console.log(req.body);
    res.send({nftNames : ret});
}  

