import { NextPage } from "next";
import { useAppContext } from "../../context/state";
import SearchProject  from "../../components/SearchProject/SearchProject"

const MyPage: NextPage = () => {
    const context = useAppContext();

    return (
        <> 
        {context.accountAddress.length > 0 ?  
        <SearchProject></SearchProject>
        :
        <div>Login plz</div>
    }
    </>
    )
}

export default MyPage