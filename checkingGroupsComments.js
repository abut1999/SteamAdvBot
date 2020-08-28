const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();

const postingGroupCommentModule = {};

function checkingGroupComments(requestedHTML) {
  const $ = cheerio.load(requestedHTML);
  const recentCommentsAuthors = [];
  $('.commentthread_comment_container .commentthread_comments .commentthread_comment.responsive_body_text').each((_i, e) => {
    const eachComment = cheerio.load(e);
    const authorID = eachComment('div.commentthread_comment_content > div.commentthread_comment_author > a').attr('href')
    recentCommentsAuthors.push(authorID);
  });
  console.log(recentCommentsAuthors)
  return recentCommentsAuthors;
}

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

async function requestRecentComments(targetUri) {
  const recentCommentsHTML = await request(requestHeader(targetUri));
  const checkingOutcome = checkingGroupComments(recentCommentsHTML)
  const returner = ((checkingOutcome.includes(process.env.CREATOR)) === true) ? "Already in the top page" : "import bumping module function";
  console.log(returner);
}

postingGroupCommentModule.groupCommentsChecker=async() => {
  await requestRecentComments(process.env.GERY_URI);
  await requestRecentComments(process.env.ITRADERS_URI)
}

module.exports = postingGroupCommentModule;