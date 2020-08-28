const request = require('request-promise');
const cheerio = require('cheerio');
require('dotenv').config();

const postingGroupCommentModule = {};

getGeryRecentComments=async() => {
  const requestHedaer = {
    method: 'GET',
    uri: process.env.GERY_URI,
    headers: {
      Cookie: process.env.CONN_STRING
    }
  }

  const recentCommentsHTML = await request(requestHedaer);
  const $ = cheerio.load(recentCommentsHTML);

  const recentCommentsAuthors = [];
  $('#commentthread_Clan_103582791462433695_posts > div').each((_i, e) => {
    const eachComment = cheerio.load(e);
    const authorID = eachComment('div.commentthread_comment_content > div.commentthread_comment_author > a').attr('href')
    recentCommentsAuthors.push(authorID);
  });
  
  checkingOutcome = ((recentCommentsAuthors.includes(process.env.CREATOR)) === true) ? "Already in the top page" : "import bumping module function";
}

postingGroupCommentModule.groupCommentsChecker=async() => {
  await getGeryRecentComments();
}

module.exports = postingGroupCommentModule;