import { Button, Card, CardContent, CardHeader, CardMedia, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import publicMint from '../../lib/publicMint'
import { useAppContext } from '../../context/state'


declare let caver : any;
declare global {
    interface Window {
        caver? : any;
    }
}

const MintContainer = (props: { nftName: string }) => {
    const [contract, setContract] = useState<string>('');
    const [blockNum, setBlockNum] = useState<string>('-');
    const [datas, setDatas] = useState<any>({});
    const context = useAppContext();

    useEffect(() => {
        let myTimer : any = null;
        if(window.caver){
            myTimer = setInterval(()=>{caver.klay.getBlockNumber().then((r:string)=>setBlockNum(r))},1000);
        }
        fetch('/api/contractfromname', { method: "POST", body: props.nftName })
            .then(r => r.json())
            .then(obj => { setContract(obj.contract); setDatas(obj)})
        return ()=>{
            if(window.caver){
                clearInterval( myTimer );
            }
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
                            sx={{padding:'15px'}}
                            component="img"
                            height="194"
                            image={`/api/fs/${props.nftName}/img/0`}
                            alt="NFT_image"
                        />
                        <CardContent>
                            <div style={{display : 'flex', flexDirection:'column'}}>
                                <div>contract Name : {contract.slice(0,6)+"..."+contract.slice(-5,-1)}</div>
                                <div>Current Block : {blockNum}</div>
                                <div>Mint start Block : {datas.mintBn}</div>
                                <div>price : {datas.mintPrice} klay</div>
                            </div>
                        </CardContent>
                                <Divider></Divider>
                                <div>
                                    <Button style={{width:"100%"}} onClick={ ()=>{console.log("userwallet and contract",context.accountAddress,contract); publicMint(context.accountAddress,contract)} }>Mint</Button>
                                </div>

                    </Card>
                </div>
                :
                <div>Loading...</div>}
        </>
    )
}

export default MintContainer;