import { NextApiRequest, NextApiResponse } from "next";
import promiseClinet from "../../../../lib/mongodb";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { projectname} = req.query;           // 둘다 string 으로 들어온다. imgid 는 나중에 number값으로 넣어줘야 정상작동하더라.
   
    // db access auth code neeeeeded!!  
    //

    
    // res.send('hi');
    if (typeof projectname === 'string') {
        const myClient = await promiseClinet;
        
        // const myImg = await myClient.db(projectname).collection('img').find().toArray();
        const myMeta = await myClient.db(projectname).collection('meta').find().toArray();
        
        res.send({img : null, meta : myMeta});
        
        // res.send(retImg.toString('base64'));
    }
    else { res.send({message : 'wrong access!'}); return; }

}