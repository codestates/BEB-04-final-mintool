import { ExpandMore } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CardMedia, Chip, Divider, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const MyPage: NextPage = () => {
    const [projectName, setProjectName] = useState<string>('');
    const [metaDataArr, setMetaDataArr] = useState<Array<any>>([]);



    const handleEnter = () => {
        const ret =
            fetch(`/api/fs/${projectName}`, { method: "POST", })
                .then(r => r.json())
                .then(x => { console.log(x, Object.keys(x.meta), Object.values(x.meta)); setMetaDataArr(Object.values(x.meta)); return x; })
        // .then(rj => setMetaDataArr(Object.values(rj.meta)))

    }

    return (
        <div className="container">
            <TextField
                onChange={(e) => { setProjectName(e.target.value) }}
                onKeyUp={(e) => { if (e.key === 'Enter') { handleEnter() } }}
                value={projectName}
                label="ProjectName" />
            <div className="HorizontalContainer">
                {metaDataArr.map((metaData, idx) => {
                    const metaDataObj: any = metaData.object ?? null;
                    const imgSrc = `http://${metaDataObj.image}`;
                    return (
                        <div style={{margin:'5px'}}>
                            <Card>
                                <CardContent>
                                    <span>{metaDataObj.name}</span>
                                </CardContent>
                                <Divider></Divider>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={imgSrc}
                                    alt="NFT Image"
                                />
                                <Divider>
                                    <Chip label="Attributes"></Chip>
                                </Divider>
                                <CardContent>
                                    {/* <Typography variant="h6" component="div">Attributes</Typography> */}
                                    
                                    {
                                        metaDataObj.attributes.map(attrObj=>{
                                            return(
                                                <div>
                                                    <span>{attrObj?.trait_type} : {attrObj?.value}</span>
                                                    
                                                </div>
                                            )
                                        })
                                    }
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyPage