const fetch = require('node-fetch');
require('dotenv').config();

const bumpingGroupPostsModule = {};

async function commentOnTargetGroup(targetedGroup) {
  await fetch(targetedGroup, {
    method: 'post',
    body: `comment=%5BH%5D%20%0A%E2%98%85%20Sport%20Gloves%20%7C%20Superconductor%200.2989%0AGlock%20Bullet%20%7C%20Queen%200.002%0AOther%20play%20skins%0A%5BW%5D%20Looking%20for%20offers%0A%0ATrade%20link%3A%20https%3A%2F%2Fsteamcommunity.com%2Ftradeoffer%2Fnew%2F%3Fpartner%3D290039204%26token%3DmvhCyUD4&count=6&sessionid=${process.env.CONN_SESID}&feature2=-1`,
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