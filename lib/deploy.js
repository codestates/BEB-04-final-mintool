import Caver from "caver-js";
import dotenv from 'dotenv'
import bytecode from "../contract/bytecode.js";
import abi from '../contract/abi.js';
dotenv.config({ path: '../.env' });

const Deploy = async (name, symbol) => {


    const key = process.env.WALLET_SECRET_KEY;


    try {
        const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))

        const account = caver.klay.accounts.wallet.add(key)

        const data = caver.klay.abi.encodeContractDeploy(abi, bytecode, name, symbol)

        const tx = await caver.klay.sendTransaction({
            type: 'SMART_CONTRACT_DEPLOY',
            from: account.address,
            data: '0x' + data,
            gas: '10000000',
            value: '0',
        })

        return tx.contractAddress;

    } catch (err) {
        console.log(err)
    }

};
// const userAddr = '0x8Fb11Ca16007023D271f432A61258C7Ae91fdc07' //test2 account 
// Deploy('this is name', 'thisissymbol', userAddr);//function example

export default Deploy;