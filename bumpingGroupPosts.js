const fetch = require('node-fetch');
require('dotenv').config();

const bumpingGroupPostsModule = {};

async function commentOnTargetGroup(targetedGroup) {
  await fetch(targetedGroup, {
    method: 'post',
    body: `comment=${process.env.GROUP_COMMENT}&count=6&sessionid=${process.env.CONN_SESID}&feature2=-1`,
    headers: {
    	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': 'text/javascript, text/html, application/xml, text/xml, */*',
      Cookie: process.env.CONN_STRING
    }
  });
}

bumpingGroupPostsModule.initiateBumpingGroupPosts=async(targetedGroup) => {
  await commentOnTargetGroup(targetedGroup);
}

module.exports = bumpingGroupPostsModule;