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
    const { address, pn, bn, mp, tn, ca } = JSON.parse(req.body);          //address : wallet address, pn : projectName, bn : blockNum to start minting, mp : mint price
    // console.log(typeof address, typeof pn, typeof bn, typeof mp);     // all data is string.
    console.log("address,pn,bn,mp,tn,ca",address, pn, bn, mp, tn, ca);


    // DB에서 유저에서 업데이트 + users.
    const myClient = await promiseClient;
    try {
        if ((await myClient.db('mint').collection('mintCollections').insertOne({ projectName: pn, mintPrice: mp, mintBn: bn, ca: ca })).acknowledged) {
            // console.log(`${url}/api/fs/${pn}/meta`,address,bn,mp,ownerAddress)
            if ((await setPublicMint(`http://${url}/api/fs/${pn}/meta/`, ca, bn, mp, address, tn))) {
                res.send({ message: true });
                if ((await myClient.db('users').collection(address).updateOne({ nftName: pn }, { $set: { isMinted: true } })).acknowledged) {
                    return;
                }
            }
            else res.send({ message: 'db deletion error' })
        }

    } catch (e) { console.log(e); res.status(500).send('error'); return; }


    // res.send({ message: '???' });
}

