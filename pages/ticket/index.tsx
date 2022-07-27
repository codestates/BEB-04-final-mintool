import { Card , CardHeader, CardMedia, CardContent, Divider, Button} from "@mui/material";
import { useAppContext } from "../../context/state";
import passMint from '../../lib/passMint'


const ticketpage = ()=>{

    const context = useAppContext();


    return (
        <div>
        { context.accountAddress.length > 0  ?
        <div className="container">
                    <Card>
                        <CardHeader
                            title="CreateNFT Pass"
                        />


                        <CardMedia
                            component="img"
                            height="194"
                            image="https://opensea.mypinata.cloud/ipfs/QmaaS5wGctu9s6io5dkiJRmpHMHWkCC5iYSDrPZ76aDjmJ"
                            alt="CreateNFT_pass_image"
                        />
                        <CardContent>
                            <div style={{display : 'flex', flexDirection:'column'}}>
                                <div>nft total num limit : 1000</div>
                                <div>price : 7 klay </div>
                            </div>
                        </CardContent>
                                <Divider></Divider>
                                <div>
                                    <Button style={{width:"100%"}} onClick={ ()=>{ console.log(context.accountAddress); passMint(context.accountAddress)} }>Mint</Button>
                                </div>

                    </Card>
                </div>
                :
                <div> wallet Login needed</div>
            }
        </div>
    )
}

export default ticketpage;