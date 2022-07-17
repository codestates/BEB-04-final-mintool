import CaverExtKAS from "caver-js-ext-kas";
import dotenv from 'dotenv'
import bytecode from "../contract/bytecode.js";
import abi from '../contract/abi.js';
dotenv.config({ path: '../.env' });

const transferOwnership = async (toAddress, contractAddr) => {

    const secretAccessKey = process.env.KAS_SECRET_KEY; //server private key      
    const key = process.env.WALLET_SECRET_KEY;
    const accessKey = process.env.KAS_ACCESS_KEY; //server private key      

    try {
        const caver = new CaverExtKAS()
        caver.initKASAPI(1001, accessKey, secretAccessKey);

        const account = caver.klay.accounts.wallet.add(key)

        const contract = new caver.klay.Contract(abi, contractAddr);

        const tx = await contract.methods.transferOwnership(toAddress).send({
            from: account.address,
            gas: '10000000',
            value: '0',
        })
        const owner = await contract.methods.owner().call();

        console.log('Contract Address: ', contractAddr)
        console.log('Owner: ', owner);

    } catch (err) {
        console.log(err)
    }

};
// transferOwnership(useraddr,contractAddr);//function example

export default transferOwnership;