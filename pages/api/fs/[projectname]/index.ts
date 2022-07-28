import { NextApiRequest, NextApiResponse } from "next";
import promiseClinet from "../../../../lib/mongodb";



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    const { projectname } = req.query;           // 둘다 string 으로 들어온다. imgid 는 나중에 number값으로 넣어줘야 정상작동하더라.
    const {pageNum, numShow, total} = JSON.parse(req.body);

    if (typeof projectname === 'string') {
        const myClient = await promiseClinet;
        try{
        // const myImg : any = await myClient.db(projectname).collection('img').find().limit(numShow).skip(pageNum-1).toArray();
        const myMeta = await myClient.db(projectname).collection('meta').find().limit(numShow).skip((pageNum-1)*numShow).toArray();
        let totalCount = null;
        if(total) totalCount = await myClient.db(projectname).collection('meta').estimatedDocumentCount();
        
        // console.log(totalCount)
        
        res.send({total : totalCount, meta : myMeta});
        }
        catch(e) {  res.send({message:`db error : ${e}`}); return;  }
    }
    else { res.send({message : 'wrong access!'}); return; }

}