// import Caver from 'caver-js'
import { Tab, Tabs, Box, Typography, Button, Dialog, DialogTitle, TextField } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import SearchProject from '../SearchProject/SearchProject';
import BlockNum from '../BlockNum/BlockNum'
import SimpleDialog from '../MintDialog/MintDialog';

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
    const [projectNameArr, setProjectNameArr] = useState<Array<string>>([]);
    const [value, setValue] = useState<number | boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    //Dialog용 handle들
    const handleClickOpen = () => {
        if(value === false) {alert('please select your nft project'); return;}
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
                    .then(nftObj => setProjectNameArr(nftObj.nftNames));
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
                        projectNameArr.map((e: any) => (<Tab key={e} style={{textTransform: 'none'}} label={e} />))
                    }
                </Tabs>
                <div className='HorizontalContainer'>
                    <Button variant="outlined" onClick={handleClickOpen}>Mint!</Button>
                    <SimpleDialog
                        open={open}
                        selectedValue={projectNameArr[(value as number)]}
                        onClose={handleClose}
                    />
                    {/* <Button>MintStart</Button> */}
                </div>
                {
                    projectNameArr.map((e: any, idx: number) => {
                        return (
                            <TabPanel key={`${e}+idx`} value={value} index={idx}>
                                <SearchProject projectName={e} />
                                {/* <div>
                                    <form action='/api/mypage' method='post' target="_blank">

                                        <div>Mint started at BlockNum : <input type="text" name="bn"></input></div>
                                        <div>Mint price : <input type="text" name="price"></input></div>
                                        <input hidden type="text" name="account" value={address} readOnly></input>
                                        <button>submit</button>
                                    </form>
                                </div> */}
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