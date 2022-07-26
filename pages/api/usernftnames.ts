import promiseClinet from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const x = JSON.parse(req.body);
    // console.log(x, typeof x["address"]);

    // console.log(req.body.bn);
    try {
        const myMongoDB = await promiseClinet;
        const ret : Array<any> = await myMongoDB.db('users').collection(`${x.address}`).find({}).toArray();
        // .then((objArr: any) => objArr.map((e: any) => e.nftName));
        // console.log(ret);

        // const myForm = formidable({multiples : true});

        // console.log(req.body);
        res.send({ nftNames: ret.map(e=>e.nftName), contractAddress : ret.map(e=>e.contractAddress), isMinted : ret.map(e=>e.isMinted ? true : false) });
    } catch(e) {res.send({mftNames : []})}
}

