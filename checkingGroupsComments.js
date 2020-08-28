const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();

const postingGroupCommentModule = {};

//Global reusable header for different request
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

//Global reusable function to check each group comments, targeted URL has to be passed
function checkingGroupComments(requestedHTML) {
  const $ = cheerio.load(requestedHTML);
  const recentCommentsAuthors = [];
  //Go through each comment and obtain each author ID, store it in array
  $('.commentthread_comment_container .commentthread_comments .commentthread_comment.responsive_body_text').each((_i, e) => {
    const eachComment = cheerio.load(e);
    const authorID = eachComment('div.commentthread_comment_content > div.commentthread_comment_author > a').attr('href')
    recentCommentsAuthors.push(authorID);
  });
  console.log(recentCommentsAuthors)
  //Returning array of stored authors ID
  return recentCommentsAuthors;
}

//Request function, to call global functions
async function requestRecentComments(targetUri) {
  //Request the html for targeted group comments
  const recentCommentsHTML = await request(requestHeader(targetUri));
  //Checking outcome gets the returned array of authors IDs
  const checkingOutcome = checkingGroupComments(recentCommentsHTML)
  //Check if any of ids in returned array matches our ID, if not call the bumping function
  const returner = ((checkingOutcome.includes(process.env.CREATOR)) === true) ? "Already in the top page" : "import bumping module function";
  console.log(returner);
}

postingGroupCommentModule.groupCommentsChecker=async() => {
  await requestRecentComments(process.env.GERY_URI);
  await requestRecentComments(process.env.ITRADERS_URI)
}

module.exports = postingGroupCommentModule;