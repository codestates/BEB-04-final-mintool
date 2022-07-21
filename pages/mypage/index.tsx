import { NextPage } from "next";
import { useAppContext } from "../../context/state";
import SearchProject from "../../components/SearchProject/SearchProject"
import MintInfo from "../../components/MintInfo/MintInfo";

const MyPage: NextPage = () => {
    const context = useAppContext();

    return (
        <>
            {context.accountAddress.length > 0 ?
                <>
                    <SearchProject></SearchProject>
                    <MintInfo></MintInfo>
                </>
                :
                <div>Login plz</div>
            }
        </>
    )
}

export default MyPage