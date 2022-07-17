import { NextApiRequest, NextApiResponse } from "next";
import promiseClinet from "../../../../../lib/mongodb";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { projectname, imgid } = req.query;           // 둘다 string 으로 들어온다. imgid 는 나중에 number값으로 넣어줘야 정상작동하더라.
   
    // db access auth code neeeeeded!!  
    //

    // console.log(projectname, imgid);
    // res.send('hi');
    if (typeof projectname === 'string' && typeof imgid === 'string') {
        const myClient = await promiseClinet;
        const tmp = await myClient.db(projectname).collection('img').findOne({index : parseInt(imgid)});
        const retImg : Buffer = tmp?.img?.buffer;
        
        res.write(retImg);
        res.end();
        // res.send(retImg.toString('base64'));
    }
    else { res.send({message : 'wrong access!'}); return; }

}