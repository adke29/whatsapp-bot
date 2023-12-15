const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox'],
    }
});

client.initialize();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent,'% ', message);
});

client.on('authenticated', () => {
    console.log('AUTHENTICATED');
});

client.on('message', message => {
    console.log(message.body);
    message.sendMessage('apaan');
});

client.on('disconnected', (reason) => {
    console.log('Client was logged out', reason);
});
