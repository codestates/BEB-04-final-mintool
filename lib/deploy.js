import CaverExtKAS from "caver-js-ext-kas";
import dotenv from 'dotenv'
import bytecode from "../contract/bytecode.js";
import abi from '../contract/abi.js';
dotenv.config({ path: '../.env' });

const Deploy = async (name, symbol) => {

    const secretAccessKey = process.env.KAS_SECRET_KEY; //server private key      
    const key = process.env.WALLET_SECRET_KEY;
    const accessKey = process.env.KAS_ACCESS_KEY; //server private key      

    try {
        const caver = new CaverExtKAS()
        caver.initKASAPI(1001, accessKey, secretAccessKey);

        const account = caver.klay.accounts.wallet.add(key)

        const test = caver.klay.abi.encodeContractDeploy(abi,bytecode,name,symbol)
        
        const tx = await caver.klay.sendTransaction({
            type: 'SMART_CONTRACT_DEPLOY',
            from: account.address,
            data: '0x'+ test,
            gas: '10000000',
            value: '0',
        })

        console.log(tx.contractAddress)

    } catch (err) {
        console.log(err)
    }

};

Deploy('this is name', 'thisissymbol');//function example

export default Deploy;