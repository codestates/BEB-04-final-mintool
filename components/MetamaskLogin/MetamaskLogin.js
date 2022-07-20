import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/state";
//css
// import styles from './MetaMaskLogin.module.css';

const MetaMaskLogin = ({ cb }) => {
    const [isMetaMask, setIsMetaMask] = useState(false);
    // const [account, setAccount] = useState('');
    const context = useAppContext();
    const account = context.accountAddress;
    const setAccount = context.changeAccountAddress;

    const handleAccountsChanged = (accounts) => {
        // console.log("acc changed", accounts)
        if (accounts.length === 0) {
            setAccount('');
        }
        else if (accounts[0] !== account) {
            setAccount(accounts[0]);
        }
    }

    useEffect(() => {
        const { ethereum } = window;
        if (ethereum && ethereum.isMetaMask) {
            setIsMetaMask(true);
            ethereum.on('accountsChanged', handleAccountsChanged)
            ethereum.request({ method: 'eth_accounts' }).then(accounts => { if (accounts.length > 0) { setAccount(accounts[0]); } })
            // .then(console.log)
            // console.log(account);
        }
    }, [])

    const onClickConnect = async () => {
        if (account.length === 0) {
            try {
                const { ethereum } = window;
                await ethereum.request({ method: 'eth_requestAccounts' });
            } catch (err) { console.error(err); }
        }
        else { if (cb) { cb(account) } }
    }



    return (
        <Button color="inherit"  onClick={onClickConnect} disabled={ account.length > 0 ? true : false }>
            {
                // isMetaMask ? (account === '' ? '지갑연결' : account) : '메타마스크를 설치해야합니다'
                isMetaMask ? (account === '' ? '지갑연결' : 'Logined') : '메타마스크를 설치해야합니다'
            }
        </Button>
    )
}

export default MetaMaskLogin;