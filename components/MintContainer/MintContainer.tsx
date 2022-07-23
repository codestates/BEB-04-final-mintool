import { useEffect, useState } from "react";




const MintContainer = (props : {nftName : string})=>{
    const [contract, setContract] = useState<string>('');

    useEffect(()=>{
        fetch('/api/contractfromname', {method:"POST", body:props.nftName})
        .then(r=>r.json())
        .then(obj=>setContract(obj.contract))
    })
    
    return (
        <>
        {contract.length > 0 ? <div>{contract}</div> : <div>null</div>}
        </>
    )
}

export default MintContainer;