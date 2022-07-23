import promiseClinet from '../../lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body)
    const {pn, bn, mp} = JSON.parse(req.body);
    console.log(pn, bn, mp);

    
    res.send({message : 'hi'});
}  

