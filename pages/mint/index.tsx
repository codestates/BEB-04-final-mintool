import { useAppContext } from '../../context/state';

const mintpage = ()=>{
    const context = useAppContext();

    return (
        <div className="container">
            mint page
            <div>

            <button onClick={()=>{console.log(context)}}></button>
            </div>
        </div>
    )
}

export default mintpage;