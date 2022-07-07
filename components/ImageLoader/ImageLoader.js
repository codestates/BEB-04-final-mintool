import { Button, Card, CardContent, CardMedia, } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { Box } from "@mui/system";
import Switch from '@mui/material/Switch';

export default function ImageLoader(props) {
    const [imgFile, setImgFile] = useState([]);

    // const handleImgChange = (e)=>{
    //     const curImgFile = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = ()=>{
    //         setImgFile(reader.result);
    //     }
    //     reader.readAsDataURL(curImgFile);
    // }
    const handleImgChange = (e) => {
        if (props.resetDisplay) props.resetDisplay();
        const tmpArr = [];
        // console.log(e.target.files);
        const filesLen = e.target.files.length;
        for (let i = 0; i < filesLen; i++) {
            tmpArr.push(e.target.files[i]);
        }

        // console.log(tmpArr);
        const urlArr = tmpArr.map(myFile => URL.createObjectURL(myFile));
        setImgFile(urlArr);
        // setImgFile([...e.target.files])
    }

    const handleImgClick = (imgUrl) => {
        // console.log(imgUrl)
        if (props.handleImgClick) {
            props.isBackGround === 1 ? props.handleImgClick(imgUrl, true) : props.handleImgClick(imgUrl);

        }
    }

    const handleCilckX = () => {
        if (props.resetDisplay ===undefined || props.handleClickX === undefined || props.isBackGround === undefined) console.log('handleClickX : props error!');
        // console.log(props.resetDisplay ===undefined, props.handleClickX === undefined, props.isBackGround === undefined)
            props.resetDisplay();
            props.handleClickX(props.isBackGround);
        

    }

    // const handleX = props.handleOnX ?? null;

    return (
        <>

            {/* <Card style={{height: '200px'}}> */}
            <div style={{ display: 'flex' }}>
                <Card className="containerH" sx={{ borderRadius: '50px', margin: "5px" }} style={{ minHeight: "0vh" }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: "center" }}>
                        {props.isBackGround === 1 ? <><div>Background Attribute</div><input style={{ textAlign: "center" }} placeholder="Name"></input></> :
                            <>
                                <div>Attribute</div>
                                <input style={{ textAlign: "center" }} placeholder="Name"></input>
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
                            {imgFile.map((imgUrl) => {
                                // const imgUrl = URL.createObjectURL(imgFile);
                                // return <img src={imgUrl} key={imgUrl} style={{ height: '150px', width: '150px', objectFit: 'contain', position: 'absolute'}}/>;
                                return <img src={imgUrl} key={imgUrl} style={{ Height: '150px', width: '150px', objectFit: 'contain' }} onClick={handleImgClick.bind(null, imgUrl)} />;

                            }
                            )}
                        </CardMedia>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}