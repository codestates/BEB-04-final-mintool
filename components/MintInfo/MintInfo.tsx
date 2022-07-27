// import Caver from 'caver-js'
import { Tab, Tabs, Box, Typography, Button, Dialog, DialogTitle, TextField, CircularProgress } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import SearchProject from '../SearchProject/SearchProject';
import BlockNum from '../BlockNum/BlockNum'
import SimpleDialog from '../MintDialog/MintDialog';
import withdraw from '../../lib/withdraw';

declare let caver: any;
declare let klaytn: any;


function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}



const MintInfo = () => {
    const [address, setAddress] = useState<string>('');
    const [value, setValue] = useState<number | boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [totalNftNum, setTotalNftNum] = useState<number>(0);

    const [projectNameArr, setProjectNameArr] = useState<Array<string>>([]);
    const [contractAddressArr, setContractAddressArr] = useState<Array<string>>([]);
    const [isMintedArr, setIsMintedArr] = useState<Array<boolean>>([]);

    const [isLoading, setIsLoading] =useState<boolean>(true);

    //Dialog용 handle들
    const handleClickOpen = () => {
        if (value === false) { alert('please select your nft project'); return; }
        setOpen(true);
    };

    const handleClose = (value: string) => {
        setOpen(false);
    };
    //Dialog 용 handle END


    useEffect(() => {
        klaytn.enable()
            .then((r: any) => { setAddress(r[0]); return r[0] })
            .then((myAddress: string) => {
                fetch('/api/usernftnames', { method: 'POST', body: JSON.stringify({ address: myAddress }) })
                    .then(r => r.json())
                    .then(nftObj => { setProjectNameArr(nftObj.nftNames); setContractAddressArr(nftObj.contractAddress); setIsMintedArr(nftObj.isMinted); })
                    .then(z=>setIsLoading(false))
            })
        //fetch에서 address만 보낼 경우, 문제가 발생하긴한다. (보안이슈) jwt 사용해보자 나중에.
    }, [])


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    return (
        <div >
            <div style={{ width: '100vw', minHeight: '100vh', padding: '10px', float: 'left' }}>

                <Tabs value={value} onChange={handleChange}>

                    {
                        projectNameArr.map((e: any) => (<Tab key={e} style={{ textTransform: 'none' }} label={e} />))
                    }
                </Tabs>
                <div className='HorizontalContainer'>
                    <>{
                        projectNameArr.length === 0 ? 
                        isLoading ?
                        <CircularProgress></CircularProgress>
                        :
                        <div><div>There's no contarct at all.</div> <div>please make NFT contract from <code>CREATENFT</code> tab </div></div> 
                        : 
                        <></>
                    }</>
                    <SimpleDialog
                        open={open}
                        selectedValue={{ pn: projectNameArr[(value as number)], address, tn: totalNftNum, ca: contractAddressArr[(value as number)] }}
                        onClose={handleClose}
                    />
                    {/* <Button onClick={() => { console.log(totalNftNum) }}>totalNFTNUm</Button> */}
                </div>
                {
                    projectNameArr.map((e: any, idx: number) => {
                        return (
                            <TabPanel key={`${e}+idx`} value={value} index={idx} >
                                <div className="containerCenter">
                                    {isMintedArr[idx] ? <Button disabled={true} variant="outlined" >Minted</Button> : <Button variant="outlined" onClick={handleClickOpen}>Mint!</Button>}
                                    <div className="HorizontalContainer">
                                        <SearchProject projectName={e} cb={(n: number) => { setTotalNftNum(n) }} />
                                    </div>
                                    { isMintedArr[idx] ? <Button variant="outlined" onClick={() => withdraw(contractAddressArr[idx])}>Withdraw</Button> : <></>}
                                </div>

                            </TabPanel>
                        )
                    })
                }
            </div>

        </div>

    )
}


export default MintInfo




        //  const myMongoDB = await promiseClinet;
        //     await myMongoDB.db('users').collection(`${myAccount}`).find().toArray().then(console.log)