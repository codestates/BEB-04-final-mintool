import ImageLoader from "../../components/ImageLoader/ImageLoader";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { TextField } from "@mui/material";
// import { useState } from "react";

const ImageLoaderLoader = () => {
    // const [imgLoaderNum, setImgLoaderNum] = useState([0]);

    // const handleOnClickX = (componentId) => {
    //     const myArr = imgLoaderNum.filter((el) => el !== componentId);
    //     setImgLoaderNum(myArr);
    // }


    return (
        <div className="container" style={{ border: '1px black solid', margin: '10px', padding: '20px', minHeight: '0vh' }}>
            <span>
                <TextField id="attributeInput" label="Attribute Name" variant="outlined" />
                
                {/* <IconButton onClick={() => { setImgLoaderNum([...imgLoaderNum, imgLoaderNum.slice(-1)[0] + 1]) }}>
                    <AddBoxOutlinedIcon></AddBoxOutlinedIcon>
                </IconButton> */}
                
            </span>
            <div className="containerH" style={{minHeight: '0vh'}}>
                {/* {imgLoaderNum.map((_, idx) => <ImageLoader key={imgLoaderNum[idx]} handleOnX={() => { handleOnClickX(imgLoaderNum[idx]) }}></ImageLoader>)} */}
                <ImageLoader/>
            </div>
        </div>
    )
}

export default ImageLoaderLoader;