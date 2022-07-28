import { Button, Card, CardContent, CardMedia, Chip, CircularProgress, Divider, Input, TextField, Typography } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const SearchProject = (props: any) => {
    const [metaDataArr, setMetaDataArr] = useState<Array<any>>([]);
    const [isWaiting, setIsWainting] = useState<Boolean>(false);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalNum, setTotalNum] = useState<number>(0);

    useEffect(() => {
        if (props.projectName) {
            setIsWainting(true);
            fetch(`/api/fs/${props.projectName}`, { method: "POST", body: JSON.stringify({ pageNum: pageNum, numShow: 14, total: metaDataArr.length > 0 ? false : true }) })
                .then(r => {  return r.json()})
                .then(x => { setIsWainting(false); setMetaDataArr(Object.values(x.meta)); setTotalNum(x.total > totalNum ? x.total : totalNum);   return x; })
                .then(n => { if (props.cb) { props.cb(Object.keys(n.meta).length) } })
        }
    }, [pageNum])


    const handleNextPage = (n: number) => {
        let pn = pageNum+n;
        if(0<pn && pn < totalNum/14) setPageNum(pageNum + n);
    }

    return (
        <div className="container">
            <div>
                <Button onClick={() => { handleNextPage(-1) }} ><ArrowLeftIcon></ArrowLeftIcon></Button>
                <Input size="small" style={{ width: '35px' }} inputProps={{ style: { textAlign: 'center' } }} value={pageNum} disabled={true}></Input>
                <Button onClick={() => { handleNextPage(1) }}><ArrowRightIcon></ArrowRightIcon></Button>
            </div>
            {isWaiting ? <CircularProgress /> : <></>}
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