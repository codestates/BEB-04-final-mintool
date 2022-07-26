import Caver from "caver-js";
import dotenv from 'dotenv'
import abi from '../contract/abi.js';

dotenv.config({ path: '../.env' });

const setURI = async (URI,contractAddr) => {

    const key = process.env.WALLET_SECRET_KEY;

    try {
        const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))

        const account = caver.klay.accounts.wallet.add(key)
        
        const contract = new caver.klay.Contract(abi, contractAddr);

        await contract.methods.setBaseURI(URI).send({
            from: account.address,
            gas: '10000000',
            value: '0',
        }) //baseURI 설정 
    } catch (err) {
        console.log(err)
    }

};

export default setURI;