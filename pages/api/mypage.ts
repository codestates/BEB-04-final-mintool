import type { NextApiRequest, NextApiResponse } from 'next'




export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log(req.body);
    console.log(req.body.bn);
    


    // const myForm = formidable({multiples : true});
  
    // console.log(req.body);
    res.send("hi");
}  

