import CaverExtKAS from "caver-js-ext-kas";
import Caver from "caver-js";
import dotenv from 'dotenv'
import bytecode from "../contract/bytecode.js";
import abi from '../contract/abi.js';
import transferOwnership from './transferOwnership.js';
dotenv.config({ path: '../.env' });

const Deploy = async (name, symbol, toAddress) => {

    // const secretAccessKey = process.env.KAS_SECRET_KEY; //server private key      
    // const accessKey = process.env.KAS_ACCESS_KEY; //server private key      
    const key = process.env.WALLET_SECRET_KEY;


    try {
        const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))
        // caver.initKASAPI(1001, accessKey, secretAccessKey);


        const account = caver.klay.accounts.wallet.add(key)

        const data = caver.klay.abi.encodeContractDeploy(abi, bytecode, name, symbol)

        const tx = await caver.klay.sendTransaction({
            type: 'SMART_CONTRACT_DEPLOY',
            from: account.address,
            data: '0x' + data,
            gas: '10000000',
            value: '0',
        })
        const contractAddress = tx.contractAddress;

        await transferOwnership(toAddress, contractAddress);

        console.log('Done.')
    } catch (err) {
        console.log(err)
    }

};
const userAddr = '0x8Fb11Ca16007023D271f432A61258C7Ae91fdc07' //test2 account 
Deploy('this is name', 'thisissymbol', userAddr);//function example

export default Deploy;