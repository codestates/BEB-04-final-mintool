import { Button, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { useEffect, useState } from "react";




const MintContainer = (props: { nftName: string }) => {
    const [contract, setContract] = useState<string>('');
    const mintPrice = 1;

    useEffect(() => {
        fetch('/api/contractfromname', { method: "POST", body: props.nftName })
            .then(r => r.json())
            .then(obj => setContract(obj.contract))
    })

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
                                <div>price : {mintPrice}</div>
                                <Button>Mint</Button>
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