import { Button, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import publicMint from '../../lib/publicMint'
import { useAppContext } from '../../context/state'


declare let caver : any;

const MintContainer = (props: { nftName: string }) => {
    const [contract, setContract] = useState<string>('');
    const [blockNum, setBlockNum] = useState<string>('0');
    const [datas, setDatas] = useState<any>({});
    const context = useAppContext();

    useEffect(() => {
        const myTimer = setInterval(()=>{caver.klay.getBlockNumber().then((r:string)=>setBlockNum(r))},1000);
        fetch('/api/contractfromname', { method: "POST", body: props.nftName })
            .then(r => r.json())
            .then(obj => { setContract(obj.contract); setDatas(obj)})
            .then(r=>console.log(datas))
        return ()=>{
            clearInterval(myTimer);
        }
    },[])

    return (
        <>
            {contract.length > 0 ?
                <div>
                    <Card>
                        <CardHeader
                            title={props.nftName}
                        />


                        <CardMedia
                            component="img"
                            height="194"
                            image={`/api/fs/${props.nftName}/img/0`}
                            alt="NFT_image"
                        />
                        <CardContent>
                            <div style={{display : 'flex', flexDirection:'column'}}>
                                <div>contractName : {contract.slice(0,6)+"..."+contract.slice(-5,-1)}</div>
                                <div>Current Block : {blockNum}</div>
                                <div>Mint start BlockNum : {datas.mintBn}</div>
                                <div>price : {datas.mintPrice}</div>
                                <Button onClick={()=>{console.log(context.accountAddress); publicMint(context.accountAddress,contract)}}>Mint</Button>
                            </div>
                        </CardContent>

                    </Card>
                </div>
                :
                <div>Loading...</div>}
        </>
    )
}

export default MintContainer;