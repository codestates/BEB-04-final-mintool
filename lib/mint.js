import Caver from "caver-js";
import dotenv from 'dotenv'
import abi from '../contract/abi.js';
dotenv.config({ path: '../.env' });

const mint = async (toAddress,URI,contractAddr,tokenCount) => {

    const secretAccessKey = process.env.KAS_SECRET_KEY; //server private key      
    const key = process.env.WALLET_SECRET_KEY;
    const accessKey = process.env.KAS_ACCESS_KEY; //server private key      

    try {
        const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))
        const account = caver.klay.accounts.wallet.add(key)
        const contract = new caver.klay.Contract(abi, contractAddr);
        const totalSupply = await contract.methods.totalSupply().call();
        //URI = URI+totalSupply
        URI = URI+0 // for test

        
        const tx = await contract.methods.mintWithTokenURI(toAddress,totalSupply,URI).send({
            from: account.address,
            gas: '10000000',
            value: '0',
        }).then(console.log)


        console.log('Done.')
    } catch (err) {
        console.log(err)
    }

};
const userAddr = '0x8Fb11Ca16007023D271f432A61258C7Ae91fdc07' //test2 account 
const contractAddr = '0x9f1cD4E5Eaa778BdCB85ff1f317f618944492F40' //test contract
const URI = 'https://beb-04-final-mintool-fahfjv6cu-ckh7488.vercel.app/api/fs/dev3/meta/' //test URI
mint(userAddr, URI, contractAddr);//function example

export default mint;