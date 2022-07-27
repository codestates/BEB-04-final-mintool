import Caver from "caver-js";
import dotenv from 'dotenv'
import abi from '../contract/abi.js';
dotenv.config({ path: '../.env' });

const transferOwnership = async (toAddress, contractAddr) => {

    const key = process.env.WALLET_SECRET_KEY;

    try {
        const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))

        const account = caver.klay.accounts.wallet.add(key)

        const contract = new caver.klay.Contract(abi, contractAddr);

        await contract.methods.transferOwnership(toAddress).send({
            from: account.address,
            gas: '10000000',
            value: '0',
        })

        await contract.methods.addMinter(toAddress).send({
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