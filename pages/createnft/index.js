import ImageLoader from "../../components/ImageLoader/ImageLoader";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Button, Card, CardContent, CardMedia, Divider, IconButton, Input, Typography } from "@mui/material";
import { useRef, useState } from "react";


const createnftpage = () => {
    const [attributeTabs, setAttributesTabs] = useState([1]);
    const [selectedImgs, setSelectedImgs] = useState([]);

    const handleImgClick = (imgUrl,isBackGround=false) => {
        const A = selectedImgs.filter(e => e === imgUrl);
        // console.log(A);
        A.length > 0 ? setSelectedImgs([...selectedImgs.filter(e => e !== imgUrl)]) :
        isBackGround ? setSelectedImgs([imgUrl, ...selectedImgs]) : setSelectedImgs([...selectedImgs, imgUrl]) 
    }

    const resetDisplay = () => {
        setSelectedImgs([]);
    }

    const removeOneTap = (tabId)=>{
        const tmpArr = attributeTabs.filter(e=>tabId!==e);
        setAttributesTabs(tmpArr);
    }

    const handleClickSubmint = ()=>{

    }
    const handleClicktest = ()=>{

    }



    return (
        <div className="container" style={{ padding: '15px', justifyContent: 'flex-start' }}>
            <div>
                <Button onClick={resetDisplay}>reset</Button>


                <Card style={{marginBottom:'15px'}}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Displayed Sample Image
                        </Typography>
                    </CardContent>
                    <Divider style={{ width: '100%',}} ></Divider>
                    <div className="displaySelectedContainer">
                        {selectedImgs.map(imgurl => {
                            return <img src={imgurl} key={imgurl} style={{ height: '300px', width: '300px', position: "absolute", objectFit:"contain" }}  ></img>
                        })}
                    </div>
                </Card>

            </div>
            <Divider style={{ width: '100%' }}></Divider>
            <div style={{marginTop:'15px'}}>
                <Button onClick={() => { setAttributesTabs([...attributeTabs, attributeTabs.slice(-1)[0] + 1]) }}>Add attribute</Button>
                {attributeTabs.map((el, idx) => <ImageLoader key={attributeTabs[idx]} handleImgClick={handleImgClick} resetDisplay={resetDisplay} isBackGround={el} handleClickX={removeOneTap} handleClicktest={handleClicktest} />)}
            </div>
            <Button onClick={handleClickSubmint}>Create NFT Contract!!</Button>
            <Button onClick={handleClicktest}>SendToServerTest</Button>
        </div>
    )
}

export default createnftpage;