import { TextField } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

const MyPage : NextPage = ()=>{
    const [projectName, setProjectName] = useState<string>('');
    const [metaDataArr, setMetaDataArr] = useState<Array<any>>([]);
    

    const handleEnter = ()=>{
        fetch(`/api/fs/${projectName}`)
    }

    return (
        <TextField 
            onChange={(e)=>{setProjectName(e.target.value)}}
            onKeyUp={(e)=>{if(e.key === 'Enter'){handleEnter()}}}
            value={projectName}
            label="ProjectName" />
    )
}

export default MyPage