import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import setPublicMint from '../../lib/setPublicMint'

require('dotenv').config();


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    console.log(req.body)
    const url = req.headers.host;
    const { address, pn, bn, mp, tn } = JSON.parse(req.body);          //address : wallet address, pn : projectName, bn : blockNum to start minting, mp : mint price
    console.log(typeof address, typeof pn, typeof bn, typeof mp);     // all data is string.
    console.log(address, pn, bn, mp, tn);


    // DB에서 유저에서 업데이트 + users.
    const myClient = await promiseClient;
    try {
        if ((await myClient.db('mint').collection('mintCollections').insertOne({ projectName: pn, mintPrice: mp, mintBn: bn })).acknowledged) {
            const contractAddress = (await myClient.db('users').collection(address).find({ nftName: pn }).toArray())[0].contractAddress;
            // console.log(`${url}/api/fs/${pn}/meta`,address,bn,mp,ownerAddress)
            await setPublicMint(`${url}/api/fs/${pn}/meta/`, contractAddress, bn, mp+'000000000000000000', address,tn);
            if((await myClient.db('users').collection(address).deleteOne({nftName : pn})).acknowledged){
                res.send({ message: true });
                return;
            }
            else res.send({message: 'db deletion error'})
        }
    
    } catch (e) { console.log(e); res.status(500).send('error'); return; }


// res.send({ message: '???' });
}

