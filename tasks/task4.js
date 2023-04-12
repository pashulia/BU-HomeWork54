const ethers = require('ethers');
const readlineSync = require('readline-sync');

async function task_4() {
    const privateKey = readlineSync.question('Введите закрытый ключь: ');
    const recipient = readlineSync.question('Введите адрес получателя: ');
    const value = readlineSync.question('Введите сумму: ');
    let provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
    let signer = new ethers.Wallet(privateKey, provider);
    let signer2 = new ethers.Wallet('0xbd7bbb45c7d9c369194c725e6a10b8c6f7cdc9ed8e576ec70f1ebe84d5407b96', provider);

    let transactionToSigner = {
        to: signer.address,
        value: 1000000000000
    }
    await signer2.sendTransaction(transactionToSigner);
    await signer.getBalance().then(console.log)

    const gasPrice = await provider.getGasPrice();
    const gasLimit = 21000;
    const txCost = gasPrice.mul(gasLimit);
    const balanceBefore = await signer.getBalance();

    let transactionRequest = {
        to: recipient.address,
        value: Number(value)
    }

    await signer.sendTransaction(transactionRequest);
    const balanceAfter = await signer.getBalance();
    const balanceDiff = balanceBefore.sub(balanceAfter).sub(txCost);

    console.log(`Отправлено ${ethers.utils.formatEther(value)} ETH с адреса ${signer.address} на адрес ${recipient}`);
    console.log(`Операция выполнена с суммарной комиссией в размере ${ethers.utils.formatEther(txCost)} ETH`);
    console.log(`Новый баланс аккаунта: ${ethers.utils.formatEther(balanceDiff)} ETH`);
}

task_4();
// 0xce8ec9d0e43a1a0824a6086ea9d5a265bad75e9acb9c9914d2662fadc64c10d9
// 0x7570C4E9284464cF9F3fBB4f7cF15A2FF6147517