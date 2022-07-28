import { NextApiRequest, NextApiResponse } from "next";
import promiseClinet from "../../../../../lib/mongodb";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { projectname, imgid } = req.query;           // 둘다 string 으로 들어온다. imgid 는 나중에 number값으로 넣어줘야 정상작동하더라.
   
    // db access auth code neeeeeded!!  
    //

    if (typeof projectname === 'string' && typeof imgid === 'string') {
        promiseClinet
        .then(myClient =>{
            myClient.db(projectname).collection('img').findOne({index : parseInt(imgid)})
            .then(pms=> pms?.img?.buffer)
            .then(r=>{ res.setHeader('Content-Type','image/png'); res.setHeader('Content-length', r.length); res.write(r); res.end();})
        })
        .catch(e=>{ res.send({message: 'error db'}) });
 
    }
    else { res.send({message : 'wrong access!'}); return; }

}