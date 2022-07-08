import { Button, Card, CardContent, CardMedia, } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import Switch from '@mui/material/Switch';

export default function ImageLoader(props) {
    const [imgURLArr, setImgURLArr] = useState([]);
    const [attrValueArr, setAttrValueArr] = useState([]);
    const [attrName, setAttrName] = useState('');
    const [imgArr, setImgArr]= useState([]);


    const handleImgChange = (e) => {
        if (props.resetDisplay) props.resetDisplay();
        imgURLArr.length > 0 ? imgURLArr.forEach(e => URL.revokeObjectURL(e)) : null;
        setAttrValueArr([]);
        const tmpArr = [];
        // console.log(e.target.files);
        const filesLen = e.target.files.length;
        for (let i = 0; i < filesLen; i++) {
            tmpArr.push(e.target.files[i]);
        }
        setImgArr(tmpArr);
        // console.log(tmpArr);
        const urlArr = tmpArr.map(myFile => URL.createObjectURL(myFile));
        setImgURLArr(urlArr);
        // setImgFile([...e.target.files])
    }

    const handleImgClick = (imgUrl) => {
        // console.log(imgUrl)
        if (props.handleImgClick) {
            props.isBackGround === 1 ? props.handleImgClick(imgUrl, true) : props.handleImgClick(imgUrl);

        }
    }

    const handleCilckX = () => {
        if (props.resetDisplay === undefined || props.handleClickX === undefined || props.isBackGround === undefined) console.log('handleClickX : props error!');
        // console.log(props.resetDisplay ===undefined, props.handleClickX === undefined, props.isBackGround === undefined)
        props.resetDisplay();
        props.handleClickX(props.isBackGround);


    }

    const handleValueChange = (idx, e) => {
        console.log(e.target.value, idx);
        attrValueArr[idx] = e.target.value;
        setAttrValueArr([...attrValueArr]);
        console.log(attrValueArr);

    }

    const handleNameChange = (e) => {
        // console.log(e.target.value)
        setAttrName(e.target.value);
    }

    const consoleLogStates = () => {
        const myFromData = new FormData();
        imgArr.forEach((e,idx)=>myFromData.append(`${idx}`,e))
        console.log(imgArr, imgURLArr, attrValueArr, attrName);
        fetch('/api/asd', {
            // headers : {
            // "Content-Type": "multipart/form-data",
            // },
            method: 'POST',
            body: myFromData
        })
        
    }

    


    return (
        <>

            <div style={{ display: 'flex' }}>
                <Card className="containerH" sx={{ borderRadius: '50px', margin: "5px" }} style={{ minHeight: "0vh" }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                        {props.isBackGround === 1 ?
                            <>
                                <div>Background Attribute</div>
                                <input 
                                    style={{ textAlign: "center" }} 
                                    placeholder="Name" 
                                    onChange={handleNameChange}
                                    value={attrName}
                                    />
                            </>
                            :
                            <>
                                <div>Attribute</div>
                                <input
                                    style={{ textAlign: "center" }}
                                    placeholder="Name"
                                    onChange={handleNameChange}
                                    value={attrName}
                                />
                                <div>
                                    <Button onClick={handleCilckX}>Remove</Button>
                                </div>
                            </>
                        }

                    </CardContent>
                </Card>
                <Card style={{ margin: "5px" }}>

                    <CardContent>
                        <input
                            type="file" multiple
                            onChange={handleImgChange}
                            style={{ fontSize: '5px' }}
                        />
                        {/* { handleX ? <IconButton onClick={handleX} ><CloseIcon></CloseIcon></IconButton>  : null } */}
                        <CardMedia style={{ minHeight: '150px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {imgURLArr.map((imgUrl, idx) => {
                                    // const imgUrl = URL.createObjectURL(imgFile);
                                    // return <img src={imgUrl} key={imgUrl} style={{ height: '150px', width: '150px', objectFit: 'contain', position: 'absolute'}}/>;
                                    return (

                                        <div className="container" style={{ minHeight: '0vh' }} key={imgUrl}>
                                            <img src={imgUrl} style={{ Height: '150px', width: '150px', objectFit: 'contain' }} onClick={handleImgClick.bind(null, imgUrl)} />
                                            <input placeholder="value" onChange={handleValueChange.bind(null, idx)} value={attrValueArr[idx] || ''}></input>
                                        </div>

                                    )
                                })}
                            </div>
                        </CardMedia>
                    </CardContent>
                </Card>
                <Button onClick={consoleLogStates}>consolelogStates</Button>
            </div>
        </>
    )
}