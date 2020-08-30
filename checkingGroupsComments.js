const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();
const bumpingGroupPostsModule = require('./bumpingGroupPosts');

const postingGroupCommentModule = {};

function checkingGroupComments(requestedHTML) {
  const $ = cheerio.load(requestedHTML);
  const recentCommentsAuthors = [];
  $('.commentthread_comment_container .commentthread_comments .commentthread_comment.responsive_body_text').each((_i, e) => {
    const eachComment = cheerio.load(e);
    const authorID = eachComment('div.commentthread_comment_content > div.commentthread_comment_author > a').attr('href')
    recentCommentsAuthors.push(authorID);
  });
  return recentCommentsAuthors;
}

async function requestRecentComments(targetUri, targetedGroupBumpUri) {
  const requestHeader = {
    method: 'GET',
    uri: targetUri,
    headers: {
      Cookie: process.env.CONN_STRING
    }
  }
  const recentCommentsHTML = await request(requestHeader);
  const checkingOutcome = checkingGroupComments(recentCommentsHTML)
  const returner = ((checkingOutcome.includes(process.env.CREATOR)) === true) ? "Already in the top" : bumpingGroupPostsModule.initiateBumpingGroupPosts(targetedGroupBumpUri);
  console.log(returner);
  await new Promise(resolve => setTimeout(resolve, 12000));
}

postingGroupCommentModule.groupCommentsChecker=async() => {
  await requestRecentComments(process.env.GERY_URI, process.env.GERY_URI_BUMP_GROUP);
  await requestRecentComments(process.env.ITRADERS_URI, process.env.ITRADERS_URI_BUMP_GROUP);
  await requestRecentComments(process.env.CSTRAD_URI, process.env.CSTRAD_URI_BUMP_GROUP);
  await requestRecentComments(process.env.CSLOUNGE_URI, process.env.CSLOUNGE_URI_BUMP_GROUP);
  await requestRecentComments(process.env.FREETRADE_URI, process.env.FREETRADE_URI_BUMP_GROUP);
  await requestRecentComments(process.env.CSGO_URI, process.env.CSGO_URI_BUMP_GROUP);
  await requestRecentComments(process.env.TRADECENTER_URI, process.env.TRADECENTER_URI_BUMP_GROUP);
}

module.exports = postingGroupCommentModule;