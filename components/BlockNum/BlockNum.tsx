import { useEffect, useState } from "react"

declare let caver : any;

const BlockNum = ()=>{
    const [blockNum, setBlockNum] = useState<number>(0)
    
    useEffect(()=>{
        const handleSetinterval = setInterval(() => { caver.klay.getBlockNumber().then((bn: number) => setBlockNum(bn)) }, 1000);
        return () => {
            clearInterval(handleSetinterval);
        }
    },[])

    return (
        <div>BlockNum is {blockNum}</div>
    )
}

export default BlockNum;