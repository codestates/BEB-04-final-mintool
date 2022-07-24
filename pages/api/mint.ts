import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const { address, pn, bn, mp } = JSON.parse(req.body);          //address : wallet address, pn : projectName, bn : blockNum to start minting, mp : mint price
    console.log(typeof address, typeof pn, typeof bn, typeof mp);     // all data is string.
    console.log(address, pn, bn, mp);

    // DB에서 유저에서 업데이트 + users.
    const myClient = await promiseClient;
    try {
        if ((await myClient.db('users').collection(address).updateOne({ nftName: pn }, { $set: { mintBn: bn, mintPrice: mp } })).acknowledged) {
            if ((await myClient.db('mint').collection('mintCollections').insertOne({ projectName: pn, mintPrice : mp, mintBn : bn })).acknowledged) {
                res.send({ message: true });
                return;
            }
        }
    } catch(e) {console.log(e); res.status(500).send('error'); return;}

    
    res.send({ message: '???' });
}

