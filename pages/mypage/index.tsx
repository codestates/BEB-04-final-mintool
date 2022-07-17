import { TextField } from "@mui/material";
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
        <div>
            <TextField
                onChange={(e) => { setProjectName(e.target.value) }}
                onKeyUp={(e) => { if (e.key === 'Enter') { handleEnter() } }}
                value={projectName}
                label="ProjectName" />

            {metaDataArr.map(metaData => {
                return (
                    <div>
                        <span>{metaData.index}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default MyPage