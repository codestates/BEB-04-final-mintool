import Caver from "caver-js";
import abi from '../contract/abi.js';



const publicMint = async (account, contractAddr, amount = 1) => {


    try {
        const caver = new Caver(window.klaytn)
        let mintPrice = 0;
        let mintLimit = 0;
        let total = 0;
        let mintIndexForSale = 0;
        const contract = new caver.klay.Contract(abi, contractAddr);

        await contract.methods.mintingInformation().call()
            .then(function (result) {
                mintIndexForSale = parseInt(result[1]);
                mintLimit = parseInt(result[3]);
                total = parseInt(result[5]);
                mintPrice = result[6];
            })

        const check = await contract.methods.balanceOf(account).call();

        if (mintIndexForSale > total) {
            alert("민팅이 종료되었습니다.")
            return;
        }
        else if (check > mintLimit) {
            alert("민팅 개수를 초과했습니다(" + mintLimit, "개)")
            return;
        }
        else {

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

    } catch (err) { console.log(err); }

};

export default publicMint;