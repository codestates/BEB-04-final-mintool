import { NextApiRequest, NextApiResponse } from "next";
import promiseClinet from "../../../../../lib/mongodb";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { projectname, imgid } = req.query;           // 둘다 string 으로 들어온다. imgid 는 나중에 number값으로 넣어줘야 정상작동하더라.

    if (typeof projectname === 'string' && typeof imgid === 'string') {
        await promiseClinet
            .then(async myClient => {
                await myClient.db(projectname).collection('img').findOne({ index: parseInt(imgid) })
                    .then( pms =>  pms?.img?.buffer)
                    .then( r => {  res.write(r);  res.end(); })
            })
            .catch(e => { res.send({ message: 'error db' }) });

    }
    else { res.send({ message: 'wrong access!' }); return; }

}