import Caver from "caver-js";


async function connect() {
    const caver = new Caver(window.klaytn)
    const accounts = await window.klaytn.enable();
    if (window.klaytn.networkVersion === 8217) {
        console.log("메인넷");
    } else if (window.klaytn.networkVersion === 1001) {
        console.log("테스트넷");
    } else {
        alert("ERROR: 클레이튼 네트워크로 연결되지 않았습니다!");
        return;
    }
    let account = accounts[0];
    caver.klay.getBalance(account)
        .then(function (balance) {
            console.log("계정주소: ", account);
            console.log("잔액: ", caver.utils.fromPeb(balance, "KLAY"))
        });

    console.log(await caver.klay.getBlockNumber());
}

export default connect;