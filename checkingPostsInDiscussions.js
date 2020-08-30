const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();
const bumpingPostsModule = require('./bumpingDiscussionsPosts');

const checkingDiscussionsPostsModule = {};

function checkingMyDiscussionPosition(requestedHTML, myDiscussionID) {
  const $ = cheerio.load(requestedHTML);
  const attemptedSelectUri = $(`#${myDiscussionID} > a`).attr('href');
  return attemptedSelectUri;
}

async function requestRecentDiscussions(targetUri, bumpingUri, featureID, myDiscussionID) {
  const requestHeader = {
    method: 'GET',
    uri: targetUri,
    headers: {
      Cookie: process.env.CONN_STRING
    }
  }
  const recentDiscussionsHTML = await request(requestHeader);
  const checkingOutcome = checkingMyDiscussionPosition(recentDiscussionsHTML, myDiscussionID)
  if (checkingOutcome === undefined) {
    console.log(`Bumping post ${targetUri}`);
    bumpingPostsModule.initiateBumpingPosts(bumpingUri, featureID)
  }
  await new Promise(resolve => setTimeout(resolve, 14000));
}

checkingDiscussionsPostsModule.recentDiscussionsChecker=async() => {
  await requestRecentDiscussions(process.env.GERY_URI_DISCUSSIONS,  process.env.GERY_DISCUSSIONS_BUMP, process.env.GERY_FEAT, process.env.GERY_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.ITRADERS_URI_DISCUSSIONS,  process.env.ITRADERS_DISCUSSIONS_BUMP, process.env.ITRADERS_FEAT, process.env.ITRADERS_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.CSTRAD_URI_DISCUSSIONS, process.env.CSTRAD_DISCUSSIONS_BUMP, process.env.CSTRAD_FEAT, process.env.CSTRAD_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.CSLOUNGE_URI_DISCUSSIONS, process.env.CSLOUNGE_DISCUSSIONS_BUMP, process.env.CSLOUNGE_FEAT, process.env.CSLOUNGE_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.CSTRADERS_URI_DISCUSSIONS, process.env.CSTRADERS_DISCUSSIONS_BUMP, process.env.CSTRADERS_FEAT, process.env.CSTRADERS_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.FREETRADE_URI_DISCUSSIONS, process.env.FREETRADE_DISCUSSIONS_BUMP, process.env.FREETRADE_FEAT, process.env.FREETRADE_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.CSGO_URI_DISCUSSIONS, process.env.CSGO_DISCUSSIONS_BUMP, process.env.CSGO_FEAT, process.env.CSGO_MY_DISCUSSION_ID);
  await requestRecentDiscussions(process.env.TRADECENTER_URI_DISCUSSIONS, process.env.TRADECENTER_DISCUSSIONS_BUMP, process.env.TRADECENTER_FEAT, process.env.TRADECENTER_MY_DISCUSSION_ID);
}

module.exports = checkingDiscussionsPostsModule;