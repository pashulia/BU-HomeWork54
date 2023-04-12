const ethers = require('ethers');
const readlineSync = require('readline-sync');

async function task_4() {
    const privateKey = readlineSync.question('Введите закрытый ключь: ');
    const recipient = readlineSync.question('Введите адрес получателя: ');
    const value = readlineSync.question('Введите сумму: ');
    
    let provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');

    let signer = new ethers.Wallet(privateKey);
    signer = signer.connect(provider);

    let signer2 = new ethers.Wallet('0xbd7bbb45c7d9c369194c725e6a10b8c6f7cdc9ed8e576ec70f1ebe84d5407b96');
    signer2 = signer2.connect(provider);

    await signer.getBalance().then(bal => {
        console.log('signer balance 1: ',  bal.toBigInt());
    })
    let transactionToSigner = await signer2.populateTransaction({
        to: signer.address,
        value: ethers.BigNumber.from(1000000000000000)
    });
    let tx = await signer2.sendTransaction(transactionToSigner);
    let txReceipt = await tx.wait();
    console.log('Transaction from account to signer:\n', txReceipt);
    await signer.getBalance().then(bal => {
        console.log('signer balance 2: ',  bal.toBigInt());
    })

    let transactionToRecepient = await signer.populateTransaction({
        to: recipient,
        value: ethers.BigNumber.from(value),
    });
    tx = await signer.sendTransaction(transactionToRecepient);
    txReceipt = await tx.wait();

    const gasPrice = await provider.getGasPrice();
    const gasLimit = 21000;
    const txCost = gasPrice.mul(gasLimit);

    console.log(`Отправлено ${ethers.utils.formatEther(value)} ETH с адреса ${signer.address} на адрес ${recipient}`);
    console.log(`Операция выполнена с суммарной комиссией в размере ${ethers.utils.formatEther(txCost)} ETH`);
    await signer.getBalance().then(bal => {
        console.log('Новый баланс аккаунта: ',  bal.toBigInt());
    })
}

task_4();
// 0xce8ec9d0e43a1a0824a6086ea9d5a265bad75e9acb9c9914d2662fadc64c10d9
// 0x7570C4E9284464cF9F3fBB4f7cF15A2FF6147517