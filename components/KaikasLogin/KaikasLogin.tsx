import { useAppContext } from '../../context/state'
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createRouteLoader } from 'next/dist/client/route-loader';


const KaikasLogin = () => {
    const [isKaikas, setIsKaikas] = useState<boolean>(false);


    const context = useAppContext();
    const clickLogin = async () => {
        if ((window as any).klaytn) {
            const accounts = await (window as any).klaytn.enable().then((r: any) => r[0]);
            context.changeAccountAddress(accounts[0]);
            location.reload()
        }
    }

    useEffect(() => {
        if ((window as any).klaytn) {
            setIsKaikas(true);
            if ((window as any).klaytn.selectedAddress) {
                context.changeAccountAddress((window as any).klaytn.selectedAddress);
            }
        }
    

    }, [])


    return (
        <>
            {isKaikas ?
                context.accountAddress.length > 0 ?
                    <Button color="inherit">Logined</Button>
                    :
                    <Button color="inherit" onClick={clickLogin}>KaikasLogin</Button>
                :
                <Link href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi?hl=ko"><Button color="inherit">install Kaikas</Button></Link> 
            }
        </>
    )

}

export default KaikasLogin;