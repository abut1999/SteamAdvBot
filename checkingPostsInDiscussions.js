const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();

const checkingDiscussionsPostsModule = {};

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

function checkingMyDiscussionPosition(requestedHTML) {
  const $ = cheerio.load(requestedHTML);
  const attemptedSelectUri = $('#forum_General_32912287_3960307437826307489 > a').attr('href');
  return attemptedSelectUri;
}

async function requestRecentDiscussions(targetUri, bumpingUri) {
  const recentDiscussionsHTML = await request(requestHeader(targetUri));
  const checkingOutcome = checkingMyDiscussionPosition(recentDiscussionsHTML)
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