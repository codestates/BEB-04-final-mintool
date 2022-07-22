// import Caver from 'caver-js'
import { useEffect, useState } from 'react';


declare let caver: any;
declare let klaytn: any;

const MintInfo = () => {
    const [blockNum, setBlockNum] = useState(0);
    const [address, setAddress] = useState<string>('');
    const [contractArr, setContractArr] = useState<Array<string>>([]);
    

    useEffect(() => {
        const handleSetinterval = setInterval(() => { caver.klay.getBlockNumber().then((bn: number) => setBlockNum(bn)) }, 1000);
        klaytn.enable()
            .then((r: any) => { setAddress(r[0]); return r[0] })
            .then((myAddress: string) => {
                fetch('/api/usernftnames', { method: 'POST', body: JSON.stringify({address : myAddress}) })
                .then(r=>r.json())
                .then(nftObj=>setContractArr(nftObj.nftNames));
            })
        //fetch에서 address만 보낼 경우, 문제가 발생하긴한다. (보안이슈) jwt 사용해보자 나중에.
        return () => {
            clearInterval(handleSetinterval);
        }
    },[])


    return (
        <div>

            <form action='/api/mypage' method='post' target="_blank">
                {contractArr.map(e=>
                        <div>
                            {e}
                        </div>
                    )}
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




        //  const myMongoDB = await promiseClinet;
        //     await myMongoDB.db('users').collection(`${myAccount}`).find().toArray().then(console.log)