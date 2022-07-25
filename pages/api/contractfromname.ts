
import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const nftName  = req.body;          //address : wallet address, pn : projectName, bn : blockNum to start minting, mp : mint price


    // DB에서 유저에서 업데이트 + users.
    const myClient = await promiseClient;
    try {
        const myContract = (await myClient.db(nftName).collection('contract').find().toArray())[0].contractAddress;
        const {mintPrice, mintBn} = (await myClient.db('mint').collection('mintCollections').find({projectName: nftName}).toArray())[0];
        console.log(mintPrice, mintBn);
        res.send({contract : myContract, mintPrice, mintBn});
        
    } catch(e) {console.log(e); res.status(500).send('error'); return;}

    
    // res.send({ message: '???' });
}



