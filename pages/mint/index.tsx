import { useEffect, useState } from 'react';
import MintContainer from '../../components/MintContainer/MintContainer';
import { useAppContext } from '../../context/state';

const mintpage = ()=>{
    const context = useAppContext();
    const [nftNameArr, setNftNameArr] = useState<Array<string>>([]);

    useEffect(()=>{
        fetch('/api/mintpage')
        .then(r=>r.json())
        .then(obj=>obj.mint)
        .then(arr=>{console.log(arr); setNftNameArr(arr) })
    },[])


    return (
        <div className="container">
            mint page
            <div>
               
                {
                nftNameArr.map(e=> <MintContainer key={e} nftName={e} />)
                }
               
            </div>
        </div>
    )
}

export default mintpage;