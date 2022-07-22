import promiseClinet from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const {bn, mp} = JSON.parse(req.body);
    console.log(bn,mp);

    
    res.send({message : 'hi'});
}  

