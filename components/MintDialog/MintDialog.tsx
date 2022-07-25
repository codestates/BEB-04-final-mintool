import { Dialog, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { useState } from "react";
import BlockNum from "../BlockNum/BlockNum";

interface SimpleDialogProps {
    open: boolean;
    selectedValue: {pn:string, address:string};
    onClose: (value: any) => void;
}


const SimpleDialog = (props: SimpleDialogProps) => {
    const { onClose, selectedValue, open } = props;
    const [blockNum, setBlockNum ] = useState<string>('');
    const [mintPrice, setMintPrice ] = useState<string>('');


    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value: string) => {
        onClose(value);
    };

    const handleSubmit = ()=>{
        fetch('/api/mint',  {method:"POST", body: JSON.stringify({address : selectedValue.address, pn : selectedValue.pn ,bn : blockNum, mp: mintPrice}) } ) 
        .then(r=>r.text())
        .then(console.log)
        onClose(selectedValue);
    }


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Mint Options</DialogTitle>
            <DialogContent>
                <div className="containerCenter marginChild" >
                    <BlockNum />
                    <TextField label="BlockNum" onChange={(e)=>{setBlockNum(e.target.value)}} value={blockNum}></TextField>
                    <TextField label="MintPrice" onChange={(e)=>{setMintPrice(e.target.value)}} value={mintPrice}></TextField>
                    <Button variant="contained" onClick={handleSubmit}>submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SimpleDialog