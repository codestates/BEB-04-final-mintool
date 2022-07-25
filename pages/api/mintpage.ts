import promiseClient from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import Caver from "caver-js";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))
    


    const myClient = await promiseClient;
    myClient.db('mint').collection('mintCollections').find().toArray()
    .then(r=>r.map(e=>e.projectName))
    .then(ar=>{res.send({mint : ar})})
    .catch(r=>{res.status(500).send({message: 'error db'})})

    // 
    

}  

