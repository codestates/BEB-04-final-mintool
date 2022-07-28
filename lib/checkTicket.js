import Caver from "caver-js";
import abi from '../passContract/abi.js';
import contractAddr from '../passContract/ContractAddr.js';



const checkTicket = async (account) => {

    try {
        let caver 
        if(window.klaytn) caver = new Caver(window.klaytn)
        else caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'))
        
        const contract = new caver.klay.Contract(abi, contractAddr);
        const check = await contract.methods.balanceOf(account).call();
        
        if(check > 0 ){
            return true;
        }else{
            return false;
        }


        
    } catch (err) {
        return false;
    }

};

export default checkTicket;