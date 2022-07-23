import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const {address, pn, bn, mp} = JSON.parse(req.body);          //address : wallet address, pn : projectName, bn : blockNum to start minting, mp : mint price
    console.log(typeof address, typeof pn,typeof bn,typeof mp);     // all data is string.
    console.log(address, pn, bn, mp);

    const myClient = await promiseClient;
    if((await myClient.db('users').collection(address).updateOne({nftName : pn}, {$set : {mintTime:bn, mintPrice:mp}})).acknowledged) {res.send({message : true}); return;}

    
    res.send({message : 'hi'});
}  

