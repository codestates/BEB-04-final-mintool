import { useAppContext } from '../../context/state'
import { Button } from '@mui/material';
import { useEffect } from 'react';


const KaikasLogin = () => {

    
    const context = useAppContext();
    const clickLogin = async ()=>{
        const accounts = await (window as any).klaytn.enable().then((r: any) => r[0]);
        context.changeAccountAddress(accounts[0]);
    }

    useEffect(() => {
        if ((window as any).klaytn ){
            if((window as any).klaytn.selectedAddress){
                context.changeAccountAddress((window as any).klaytn.selectedAddress);
            }
        }
    }, [])

    
    return (
        <>
            {context.accountAddress.length > 0 ?
                <Button color='inherit' disabled>Logined</Button>
                :
                <Button color="inherit" onClick={clickLogin}>KaikasLogin</Button>

        
            }
        </>
    )

}

export default KaikasLogin;