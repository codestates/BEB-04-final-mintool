import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React, { BaseSyntheticEvent, useState } from 'react'
import styles from '../styles/Home.module.css'
import ImageLoader from '../../components/ImageLoader/ImageLoader'
import { Button, CircularProgress, TextField, Typography } from '@mui/material'
import AlertDialog from '../../components/Alert/Alert'
import { useAppContext } from '../../context/state'

type dataObject = {
  [num: number]: {
    AttrName: string,
    values: Array<string>,
    fileArr: Array<any>
  }
  description?: string,
  external_url?: string,
  projectName?: string,
  symbol?: Array<string>
}

declare let klaytn : any;

const MyImg: Function = (mySrc: Uint8Array) => {
  return URL.createObjectURL(
    new Blob([mySrc.buffer], { type: 'image/png' })
  )

}

const CreateNFT: NextPage = () => {
  const [attrTabArr, setAttrTabArr] = useState<Array<any>>([0, 1]);
  const [dataObj, setDataObj] = useState<dataObject>({});
  const [projectName, setProjectName] = useState<string>('');
  const [descriptionValue, setDescriptionValue] = useState<string>('');
  const [external_urlValue, setExternal_urlValue] = useState<string>('');
  const [isWaiting, setIsWainting] = useState<Boolean>(false);
  const [symbol, setSymbol] = useState<string>('');


  const context = useAppContext();


  const handleTextFieldChange = (e: BaseSyntheticEvent, handlesetFuncion: any) => {
    handlesetFuncion(e.target.value);
  }

  const handleSetDataObj = (key: number, obj: Object) => {
    const myObj: { [key: number]: any } = { ...dataObj };
    myObj[key] = obj;
    setDataObj(myObj);
  }

  const handleDel = (keyVal: number) => {
    const newAttrTabArr = attrTabArr.filter(e => e !== keyVal);
    setAttrTabArr(newAttrTabArr);
  }

  const handleSend = async () => {

    setIsWainting(true);
    dataObj.description = descriptionValue ?? '';
    dataObj.external_url = external_urlValue ?? '';
    if (projectName.length < 1) { setIsWainting(false); alert('projectName should have values'); return; }
    if (symbol.length < 1) { setIsWainting(false); alert('projectName should have values'); return; }
    dataObj.projectName = projectName;
    dataObj.symbol = [symbol, await klaytn.enable().then((r:any)=>r[0])]


    let isRight = true;
    Object.keys(dataObj).slice(0, -4).forEach(k => {
      const kNumber = parseInt(k);
      if (dataObj[kNumber].fileArr.length < 1) isRight = false;
      if (dataObj[kNumber].fileArr.length !== dataObj[kNumber].values.length) isRight = false;
      if (dataObj[kNumber].AttrName === undefined) isRight = false;
    })
    if (!isRight) { alert("Image input is not right"); setIsWainting(false); return; }


    const myForm = new FormData();
    const k = Object.keys(dataObj);
    console.log(k);
    k
    .slice(0,-4)
    .forEach((key: string, i)=>{
      const k = parseInt(key);
      dataObj[k].fileArr.forEach((fileObj : any)=>
        myForm.append(key, fileObj, fileObj.name)
      )
    })
    myForm.append("myObj", JSON.stringify(dataObj));

    fetch('/api/createnftbusboy',{method:"POST", body:myForm})
    .then(r=>r.json())
    .then(messageObj=>{
      setIsWainting(false);
      if(messageObj.message === "ok") { alert("nft creation done!")}
      else { alert("error")}
    });


  }




  return (
    <>
    {
      context?.accountAddress?.length > 0 ?
    <div className='container'>
      <div className='containerCenter'>
        <Typography variant="h2" component="h2">Create NFT</Typography>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
          <TextField label="ProjectName" onChange={(e) => { handleTextFieldChange(e, setProjectName) }} value={projectName} ></TextField>
          <TextField label="Symbol" onChange={(e) => { handleTextFieldChange(e, setSymbol) }} value={symbol} ></TextField>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
          <TextField label="description" multiline onChange={(e) => { handleTextFieldChange(e, setDescriptionValue) }} value={descriptionValue}></TextField>
          <TextField label="external_url" multiline onChange={(e) => { handleTextFieldChange(e, setExternal_urlValue) }} value={external_urlValue}></TextField>
        </div>

        <Typography variant="h4" component="div">Bottom layer</Typography>
        <ImageLoader myKey={0} handleSetDataObj={handleSetDataObj}></ImageLoader>
      </div>
      <br />

      <Button variant="contained" onClick={() => { setAttrTabArr([...attrTabArr, attrTabArr.slice(-1)[0] + 1]) }}>addTabs</Button>
      <br />
      {
        attrTabArr.slice(1).map(e => {
          return (
            <div key={e} className="containerCenter">
              <Typography variant="h6" component="div">Bottom layer</Typography>
              <ImageLoader handleDel={handleDel} myKey={e} handleSetDataObj={handleSetDataObj}></ImageLoader>
            </div>
          )
        })
      }

      <br />
      <Button variant="contained" onClick={handleSend}>send</Button>
      {isWaiting ? <CircularProgress></CircularProgress> : <></>}
      <button onClick={() => { console.log(dataObj) }}>log dataObj</button>
      {/* <button onClick={() => { console.log(attrTabArr)}}>tabs</button> */}
    </div>
      : 
      <div>login Plz</div>
    }
    </>
  )
}

export default CreateNFT
