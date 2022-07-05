import ImageLoader from "../../components/ImageLoader/ImageLoader";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { IconButton } from "@mui/material";
import { useState } from "react";

const createnftpage = () => {
    const [imgLoaderNum, setImgLoaderNum] = useState([0]);

    const handleOnClickX = (componentId)=>{
        const myArr = imgLoaderNum.filter((el)=>el !== componentId);
        setImgLoaderNum(myArr);
    }

    return (
        <div className="container">
            createnft page
            <div className="containerH">
                { imgLoaderNum.map((_,idx)=><ImageLoader key={imgLoaderNum[idx]} handleOnX={()=>{handleOnClickX(imgLoaderNum[idx])}}></ImageLoader>) }
                <IconButton onClick={ ()=>{setImgLoaderNum([...imgLoaderNum, imgLoaderNum.slice(-1)[0]+1 ])} }>
                    <AddBoxOutlinedIcon></AddBoxOutlinedIcon>
                </IconButton>
            </div>
        </div>
    )
}

export default createnftpage;