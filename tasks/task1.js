const ethers = require('ethers');
const readlineSync = require('readline-sync');

async function task_1() {
    const entropyString = readlineSync.question('Введите энтропию: ');
    const wallet = ethers.Wallet.createRandom({ entropy: ethers.utils.toUtf8Bytes(entropyString) });

    console.log(`Адрес: ${wallet.address}`);
    console.log(`Приватный ключ: ${wallet.privateKey}`);
}

task_1();