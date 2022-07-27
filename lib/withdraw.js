import Caver from "caver-js";
import abi from '../contract/abi.js';


const withdraw = async (contractAddr) => {

    try {
        const caver = new Caver(window.klaytn)

        const accounts = await window.klaytn.enable();

        console.log(accounts)

        const contract = new caver.klay.Contract(abi, contractAddr);

        await contract.methods.withdraw().send({
            from: accounts[0],
            gas: '10000000',
            value: '0',
        })
        console.log('Withdraw Done.')
    } catch (err) {
        console.log(err);
    }

};
export default withdraw;