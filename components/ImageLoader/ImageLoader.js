import { Card, CardContent, CardMedia, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function ImageLoader({handleOnX}){
    const [imgFile, setImgFile] = useState(null);

    const handleImgChange = (e)=>{
        const curImgFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ()=>{
            setImgFile(reader.result);
        }
        reader.readAsDataURL(curImgFile);
    }
    const handleX = handleOnX ?? null;

    return (
        <>
            <Card>
                <CardContent>
                    { handleX ? <IconButton onClick={handleX} ><CloseIcon></CloseIcon></IconButton>  : null }
                    <CardMedia
                        component="img"
                        image={imgFile}
                        height="335"
                        />
                    <input
                        type="file"
                        onChange={handleImgChange}
                        />
                </CardContent>
            </Card>
        </>
    )
}