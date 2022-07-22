// import Caver from 'caver-js'
import { useEffect, useState } from 'react';

declare let caver: any;
declare let klaytn : any;

const MintInfo = () => {
    const [blockNum, setBlockNum] = useState(0);
    const [address, setAddress] = useState<string>('');
    // const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'));

    useEffect(() => {
        const handleSetinterval = setInterval(() => { caver.klay.getBlockNumber().then((bn: number) => setBlockNum(bn)) }, 1000);
        klaytn.enable().then((r:any)=>setAddress(r[0]))
        return () => {
            clearInterval(handleSetinterval);
        }
    })

    return (
        <div>

        <form  action='/api/mypage' method='post' target="_blank">
                <div>BlockNum is {blockNum}</div>
                <div>Mint started at BlockNum : <input type="text" name="bn"></input></div>
                <div>Mint price : <input type="text" name="price"></input></div>
                <input hidden type="text" name="account" value={address} readOnly></input>
                <button>submit</button>
            </form>
        </div>

                )
}

         export default MintInfo