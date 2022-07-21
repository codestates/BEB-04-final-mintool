// import Caver from 'caver-js'
import { useEffect, useState } from 'react';

declare let caver: any;

const MintInfo = () => {
    const [blockNum, setBlockNum] = useState(0);
    // const caver = new Caver(new Caver.providers.HttpProvider('https://public-node-api.klaytnapi.com/v1/baobab'));

    useEffect(() => {
        const handleSetinterval = setInterval(() => { caver.klay.getBlockNumber().then((bn: number) => setBlockNum(bn)) }, 1000);
        return () => {
            clearInterval(handleSetinterval);
        }
    })

    return (
        <div>

        <form action='/api/mypage' method='post'>
                <div>BlockNum is {blockNum}</div>
                <div>Mint started at BlockNum : <input type="text" name="bn"></input></div>
                <div>Mint price : <input type="text" name="price"></input></div>
                <div>test <input type="file" multiple name="test"></input></div>
                <button>submit</button>
            </form>
        </div>

                )
}

         export default MintInfo