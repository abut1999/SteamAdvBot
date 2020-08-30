const fetch = require('node-fetch');
const fs = require('fs');
require('dotenv').config();

const bumpingPostsModule = {};

async function removeComment(bumpingUri, featureID) {
  getDeletingCommentGID = fs.readFileSync(`${featureID}.text`, 'utf8'); 
  const deletingUri = bumpingUri.replace('post', 'delete');
  await fetch(deletingUri, {
    method: 'post',
    body: `gidcomment=${getDeletingCommentGID}&start=0&count=15&sessionid=${process.env.CONN_SESID}&extended_data=${process.env.EXTENDED_DATA}&feature2=${featureID}oldestfirst=true&include_raw=true`,
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
      Cookie: process.env.CONN_STRING
    }
  });
}

async function bumpDiscussionsPost(bumpingUri, featureID) {
  await removeComment(bumpingUri, featureID);
  const doBump = await fetch(bumpingUri, {
    method: 'post',
    body: `comment=${process.env.BUMP_COMMENT}&count=15&sessionid=${process.env.CONN_SESID}&extended_data=${process.env.EXTENDED_DATA}&feature2=${featureID}oldestfirst=true&include_raw=true`,
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
      Cookie: process.env.CONN_STRING
    }
  });
  const bumpResponse = await doBump.json();
  saveLastCommendGID = Object.keys(bumpResponse.comments_raw)[0];
  fs.writeFile(`${featureID}.text`, saveLastCommendGID, function(err, result) {
    if(err) console.log('error', err);
});
}

bumpingPostsModule.initiateBumpingPosts=async(bumpingUri, featureID) => {
  await bumpDiscussionsPost(bumpingUri, featureID)
}

module.exports = bumpingPostsModule;