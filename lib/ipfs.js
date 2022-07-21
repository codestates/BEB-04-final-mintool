import pinataSDK from "@pinata/sdk";
import dotenv from 'dotenv'
import jsonFile from "jsonfile"
import fs from 'fs'
dotenv.config({ path: '../.env' });

const mkIPFS = async () => {

    const api = process.env.PINATA_API_KEY;
    const secret = process.env.PINATA_SECRET_KEY;
    const pinata = pinataSDK(api, secret);



    fs.readdir('../img', async (err, file_list) => { //img폴더 파일 개수 불러오기
        const sourcePath = '../img';


        let imgIPFS = await pinata.pinFromFS(sourcePath);

        let tokenId = 0;
        for (let i of file_list) {

            const dataBuffer = fs.readFileSync('../json/' + tokenId + '.json')
            const dataJSON=dataBuffer.toString()
            const obj = JSON.parse(dataJSON)
            obj.image = 'ipfs://' + imgIPFS.IpfsHash + '/' + tokenId + '.png' //object image update
            const json = JSON.stringify(obj)
            fs.writeFileSync('../json/' + tokenId + '.json', json)

            tokenId = tokenId + 1;
        }
    }); 
    let result = await pinata.pinFromFS('../json');

    return result.IpfsHash

}

//mkIPFS();//test

export default mkIPFS;