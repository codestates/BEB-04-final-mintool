import { Dialog, DialogContent, DialogTitle, TextField, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import BlockNum from "../BlockNum/BlockNum";
import { useAppContext } from '../../context/state';

interface SimpleDialogProps {
    open: boolean;
    selectedValue: {pn:string, address:string, tn:number, ca:string};
    onClose: (value: any) => void;
}


const SimpleDialog = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open } = props;
    const [blockNum, setBlockNum ] = useState<string>('');
    const [mintPrice, setMintPrice ] = useState<string>('');
    const [isWait, setIsWait] = useState<boolean>(false);


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    const handleSubmit = ()=>{
        setIsWait(true);
        fetch('/api/mint',  {method:"POST", body: JSON.stringify({address : selectedValue.address, pn : selectedValue.pn ,bn : blockNum, mp: mintPrice, tn : selectedValue.tn, ca: selectedValue.ca}) } ) 
        .then(r=>r.text())
        .then(console.log)
        .then(c=>setIsWait(false))
        .then(z=>onClose(selectedValue))
        
    }


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Mint Options</DialogTitle>
            <DialogContent>
                <div className="containerCenter marginChild" >
                    <BlockNum />
                    <TextField label="BlockNum" onChange={(e)=>{setBlockNum(e.target.value)}} value={blockNum}></TextField>
                    <TextField label="MintPrice" onChange={(e)=>{setMintPrice(e.target.value)}} value={mintPrice}></TextField>
                    <Button variant="contained" onClick={handleSubmit} disabled={isWait}>submit</Button>
                    {isWait ? <CircularProgress/> : <></>}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SimpleDialog


