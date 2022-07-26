import {  Card,  CardContent, CardMedia, Chip, CircularProgress, Divider, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SearchProject = (props : any) => {
    // console.group(props.cb);
    const [projectName, setProjectName] = useState<string>('');
    const [metaDataArr, setMetaDataArr] = useState<Array<any>>([]);
    const [isWaiting, setIsWainting] = useState<Boolean>(false);


    console.log(props);
    
    // if(props.projectName) setProjectName(props.projectName);
    // projectName.length > 0 ? handleEnter() : null  ;

    useEffect(()=>{
        if(props.projectName){
        setIsWainting(true);
        fetch(`/api/fs/${props.projectName}`, { method: "POST", })
            .then(r => r.json())
            .then(x => { setIsWainting(false); setMetaDataArr(Object.values(x.meta)); return x; })
            .then(n=>{if(props.cb) {props.cb(Object.keys(n.meta).length)}})
        }
    },[])

    // const handleEnter = () => {
        
    //     setIsWainting(true);
    //     fetch(`/api/fs/${projectName}`, { method: "POST", })
    //         .then(r => r.json())
    //         .then(x => { setIsWainting(false); console.log(x, Object.keys(x.meta), Object.values(x.meta)); setMetaDataArr(Object.values(x.meta)); return x; })
    //     // .then(rj => setMetaDataArr(Object.values(rj.meta)))

    // }

    return (
        <div className="container">
            {/* <TextField
                onChange={(e) => { setProjectName(e.target.value) }}
                onKeyUp={(e) => { if (e.key === 'Enter') { handleEnter() } }}
                value={projectName}
                label="ProjectName" /> */}
            {isWaiting ? <CircularProgress/> : <></>}
            <div className="HorizontalContainer">
                {metaDataArr.map((metaData, idx) => {
                    const metaDataObj: any = metaData.object ?? null;
                    const imgSrc = `${metaDataObj.image}`;
                    return (
                        <div style={{ margin: '5px' }} key={metaDataObj.name}>
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

                                    {
                                        metaDataObj.attributes.map((attrObj: any) => {
                                            return (
                                                <div key={attrObj?.trait_type}>
                                                    <span>{attrObj?.trait_type} : {attrObj?.value}</span>

                                                </div>
                                            )
                                        })
                                    }
                                </CardContent>
                                <Divider>
                                    <Chip label="metaData"></Chip>
                                </Divider>
                                <CardContent>
                                    <TextField multiline value={JSON.stringify(metaDataArr[idx].object)} inputProps={{ readOnly: true }}></TextField>
                                </CardContent>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )


}


export default SearchProject