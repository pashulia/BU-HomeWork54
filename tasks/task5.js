const ethers = require('ethers');
const readlineSync = require('readline-sync');

async function task_5() {
    const privateKey = readlineSync.question('Введите закрытый ключь: ');
    const recipient = readlineSync.question('Введите адрес получателя: ');
    const value = readlineSync.question('Введите сумму: ');
    let signer = new ethers.Wallet(privateKey);
    let provider = new ethers.providers.JsonRpcProvider('https://eth-goerli.g.alchemy.com/v2/XdE1v9zVDSoRe6S5013cteykw1ZDC0u9');
    signer = signer.connect(provider);

    let txRequest = await signer.populateTransaction({
        to: recipient,
        value: ethers.BigNumber.from(value)
    });
    let txsigned = await signer.signTransaction(txRequest);
    let txResponse = await signer.sendTransaction(txsigned);
    await txResponse.wait().then(console.log);

}

task_5();