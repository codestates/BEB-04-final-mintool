import { Card, CardContent, CardMedia } from "@mui/material";
import { useState } from "react";

export default function ImageLoader(){
    const [imgFile, setImgFile] = useState(null);

    const handleImgChange = (e)=>{
        const curImgFile = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ()=>{
            setImgFile(reader.result);
        }
        reader.readAsDataURL(curImgFile);
    }

    return (
        <>
            <Card>
                <CardContent>
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