import Caver from "caver-js";
import abi from '../passContract/abi.js';
import contractAddr from '../passContract/ContractAddr.js';

const checkTicket = async (account) => {

    try {
        const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))
        const contract = new caver.klay.Contract(abi, contractAddr);
        const check = await contract.methods.balanceOf(account).call();
        
        if(check > 0 ){
            console.log("success")
            return true;
        }else{
            console.log("Fail")
            return false;
        }
    } catch (err) {
        console.log(err)
    }
};

const account = '0x8Fb11Ca16007023D271f432A61258C7Ae91fdc07'
checkTicket(account).then(result=>{
    console.log(result)
}) // example

export default checkTicket;