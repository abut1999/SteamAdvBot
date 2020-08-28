const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();

const checkingDiscussionsPostsModule = {};

//Global reusable header for each request
function requestHeader(requestUri) {
  const requestHeader = {
    method: 'GET',
    uri: requestUri,
    headers: {
      Cookie: process.env.CONN_STRING
    }
  }
  return requestHeader;
}

//Check if our discussion id can be grabbed in top discussions
function checkingMyDiscussionPosition(requestedHTML) {
  const $ = cheerio.load(requestedHTML);
  const attemptedSelectUri = $('#forum_General_32912287_3960307437826307489 > a').attr('href');
  //Returns either our id or undefined
  return attemptedSelectUri;
}

//Call global functions to initiate requests
async function requestRecentDiscussions(targetUri, bumpingUri) {
  //Request targeted group recent discussions
  const recentDiscussionsHTML = await request(requestHeader(targetUri));
  //Receive the return of checking outcome (id or undefined)
  const checkingOutcome = checkingMyDiscussionPosition(recentDiscussionsHTML)
  //Call the bumping module if returned undefined, else do nothing
  if (checkingOutcome === undefined) {
    console.log('export bumping module');
  } else {
    console.log('Already in top discussions')
  }
}

checkingDiscussionsPostsModule.recentDiscussionsChecker=async() => {
  await requestRecentDiscussions(process.env.GERY_URI_DISCUSSIONS);
}

module.exports = checkingDiscussionsPostsModule;