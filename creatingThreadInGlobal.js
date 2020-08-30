const fetch = require('node-fetch');
require('dotenv').config();

const creatingThreadModule = {};

async function createThreadRequest(globalThread) {
  await fetch(globalThread, {
    method: 'post',
    body: `sessionid=${process.env.CONN_SESID}&appid=730&topic=${process.env.GLOBAL_THREAD_TITLE}&text=${process.env.GLOBAL_THREAD_TEXT}&subforum=Trading_18446744073709551615`,
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
      Cookie: process.env.CONN_STRING
    }
  });
}

creatingThreadModule.initiateThreadCreating=async() => {
  await createThreadRequest(process.env.GLOBAL_THREAD_URI);
}

module.exports = creatingThreadModule;