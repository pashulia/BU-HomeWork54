const ethers = require('ethers');
const readlineSync = require('readline-sync');

async function task_3() {
    const endPoint = readlineSync.question('Введите ендпоинт: ');
    // 'http://127.0.0.1:7545'
    let provider = new ethers.providers.JsonRpcProvider(endPoint);
    await provider.listAccounts().then(console.log);
}

task_3();