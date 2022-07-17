import { Button, ButtonBase, Card, CardMedia, IconButton, Paper, TextField } from "@mui/material";
import { useState, BaseSyntheticEvent } from "react";
import CloseIcon from '@mui/icons-material/Close'
import styles from './ImageLoader.module.css'


const ImageLoader = (props: any) => {
    const [fileArr, setFileArr] = useState<Array<File>>([]);
    const [imgUrlArr, setImgUrlArr] = useState<Array<string>>([]);
    const [inputValues, setInputValues] = useState<Array<string>>([]);
    const [isLock, setIsLock] = useState<boolean>(false);
    let blobUrlArr : Array<any> = [];

    const handleStringChange = (e: BaseSyntheticEvent, num : number) =>{
        // console.log(e.target.value, num);
        inputValues[num] = e.target.value;
        setInputValues([...inputValues]);
    }

    const handleInputChange = async (e: BaseSyntheticEvent) => {
        setInputValues([]);
        if(blobUrlArr.length > 0) {blobUrlArr.forEach(e=> URL.revokeObjectURL(e)); blobUrlArr=[]; };

        const tmpArr: Array<File> = [];
        Object.keys(e.target.files).forEach(key => { tmpArr.push(e.target.files[key]) });

        setFileArr(tmpArr);
        setImgUrlArr(tmpArr.map(e=>URL.createObjectURL(e)));
    }

    const handleLock = ()=>{
        if(props.handleSetDataObj && !isLock) {
            const myObj : {[key : string]: any} = {AttrName : inputValues[0], values : inputValues.slice(1), fileArr : fileArr};
            props.handleSetDataObj(props.myKey, myObj);
            setIsLock(true);
        }
    }



    return (
        // <div style={{ border: 'solid black 1px' }}>
        <Paper elevation={3} className={styles.imgLoaderContainer}>
            <div className={styles.flexContainer}>
                { props.handleDel ? 
                <>
                    <IconButton disabled={isLock} onClick={props.handleDel.bind(null, props.myKey)} className={styles.iconClose}>
                        <CloseIcon></CloseIcon>
                    </IconButton>
                    {/* <Button disabled={isLock} onClick={props.handleDel.bind(null, props.myKey)}>delete this tab</Button> */}
                </>
            : <></> } 
                { fileArr.length > 0 ? <TextField label="Attribute Name" disabled={isLock} onChange={ (e)=>{handleStringChange(e,0)}} value={inputValues[0] ?? ''} /> : <></> }
            </div>
            <div className={styles.cardContainer}>
                {
                    fileArr.map((e,idx) => {
                        return (
                            <Card key={e.name}>
                                <CardMedia>
                                <img src={imgUrlArr[idx]} style={{ height: '150px' }} ></img>
                                </CardMedia>
                                <TextField label="value" disabled={isLock} onChange={ (e)=>{handleStringChange(e,idx+1)} }></TextField>
                            </Card>
                        )
                    }
                    )
                }
            </div>
            <input
                disabled={isLock} 
                type="file" multiple
                onChange={handleInputChange}
            />
            <Button disabled={isLock} onClick={()=>{handleLock() }}>{isLock ? 'Locked' : 'Lock'}</Button>
            {/* <button onClick={()=>{console.log(props, fileArr, inputValues, isLock)}}>state status</button> */}
        {/* </div> */}
        </Paper>
    )
}

export default ImageLoader;