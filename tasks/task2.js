const ethers = require('ethers');
const readlineSync = require('readline-sync');

async function task_2() {
    const privateKey = readlineSync.question('Введите закрытый ключ: ');
    const wallet = new ethers.Wallet(privateKey);

    console.log(`Адрес: ${wallet.address}`);
    console.log(`Публичный ключ: ${wallet.publicKey}`);
}

task_2();