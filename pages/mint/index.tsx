import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import MintContainer from '../../components/MintContainer/MintContainer';
import { useAppContext } from '../../context/state';

const mintpage = () => {
    const context = useAppContext();
    const [nftNameArr, setNftNameArr] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('/api/mintpage')
            .then(r => r.json())
            .then(obj => obj.mint)
            .then(arr => { setNftNameArr(arr); setIsLoading(false) })
    }, [])


    return (
        <div className="container">
            {/* mint page */}
            <div className='HorizontalContainer'>

                {isLoading ?
                    <CircularProgress></CircularProgress>
                    :
                    nftNameArr.length === 0 ?
                        <div>There's no Project yet...</div>
                        :
                        nftNameArr.map(e => <MintContainer key={e} nftName={e} />)
                }

            </div>
        </div>
    )
}

export default mintpage;