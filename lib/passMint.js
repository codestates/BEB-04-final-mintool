import Caver from "caver-js";
import abi from '../passContract/abi.js';
import ContractAddr from '../passContract/ContractAddr'

const passMint = async (account, amount = 1) => {

    try {
        const caver = new Caver(window.klaytn)
        let mintPrice = 0;

        const contract = new caver.klay.Contract(abi, ContractAddr);

        const check = await contract.methods.balanceOf(account).call();

        if (check > 0) {
            alert("민팅 개수를 초과했습니다(1개)")
            return;
        } else {


            await contract.methods.mintingInformation().call()
                .then(function (result) {
                    mintPrice = result[6];
                })
            const gasAmount = await contract.methods.publicMint(amount).estimateGas({
                from: account,
                gas: 6000000,
                value: mintPrice
            })
            const result = await contract.methods.publicMint(amount).send({
                from: account,
                gas: gasAmount,
                value: mintPrice
            })
        }

    } catch (err) {
        console.log(err)
    }

};

export default passMint;