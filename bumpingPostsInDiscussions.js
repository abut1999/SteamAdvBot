const request = require('request-promise');
const cheerio = require('cheerio');
const config = require('dotenv').config();

const bumpingDiscussionsPostsModule = {};

bumpingDiscussionsPostsModule.getGlobalForumDiscussion=async() => {
  const requestHeader = {
    method: 'GET',
    uri: 'https://steamcommunity.com/app/730/tradingforum/',
    headers: {
      Cookie: '_ga=GA1.2.1232912335.1579369597; browserid=1181566537022824798; steamMachineAuth76561198250304932=18060335A86E686B669AB852CDBB0A5404B6AF6F; timezoneOffset=7200,0; steamMachineAuth76561198063930423=472E7D15F363DD4B11C0227DCFF71770CAA0335E; mediumappid=440; mediumname=Ghostly Gibus; steamMachineAuth76561197962934644=D805CC6A607E7834CA797032E721B07B72403DE5; _gid=GA1.2.717953130.1596453440; recentlyVisitedAppHubs=570%2C700030%2C218620%2C207230%2C578080%2C1068820%2C908520%2C264710%2C440%2C730; strResponsiveViewPrefs=desktop; steamRememberLogin=76561198250304932%7C%7C96b1ce7d4453cb483b57fff54abf6cef; steamLoginSecure=76561198250304932%7C%7CA8D9F4FA0D16BD5BB0368B2126092A8BE30356E2; sessionid=fb7ffad8e99985ca0b624d83; webTradeEligibility=%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A7%2C%22time_checked%22%3A1598543445%7D; steamCountry=DK%7C9004f9d825a6c115be27cc285ce3a70b; strInventoryLastContext=730_2; app_impressions=730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_; tsTradeOffersLastRead=1598546790'
    }
  }

  const discussionForumHtml = await request(requestHeader);
  const $ = cheerio.load(discussionForumHtml);
}



const body = {
  comment: 'Bump',
  count: '15',
  sessionid: 'fb7ffad8e99985ca0b624d83',
}
bumpingDiscussionsPostsModule.bumpInGerysDiscussion=async() => {
  const postHeader = {
    method: 'POST',
    uri: 'https://steamcommunity.com/comment/ForumTopic/post/103582791462433695/1698300679771066355/',
    headers: {
      'Content-Type': 'application/json',
      Cookie: '_ga=GA1.2.1232912335.1579369597; browserid=1181566537022824798; steamMachineAuth76561198250304932=18060335A86E686B669AB852CDBB0A5404B6AF6F; timezoneOffset=7200,0; steamMachineAuth76561198063930423=472E7D15F363DD4B11C0227DCFF71770CAA0335E; mediumappid=440; mediumname=Ghostly Gibus; steamMachineAuth76561197962934644=D805CC6A607E7834CA797032E721B07B72403DE5; _gid=GA1.2.717953130.1596453440; recentlyVisitedAppHubs=570%2C700030%2C218620%2C207230%2C578080%2C1068820%2C908520%2C264710%2C440%2C730; strResponsiveViewPrefs=desktop; steamRememberLogin=76561198250304932%7C%7C96b1ce7d4453cb483b57fff54abf6cef; steamLoginSecure=76561198250304932%7C%7CA8D9F4FA0D16BD5BB0368B2126092A8BE30356E2; sessionid=fb7ffad8e99985ca0b624d83; webTradeEligibility=%7B%22allowed%22%3A1%2C%22allowed_at_time%22%3A0%2C%22steamguard_required_days%22%3A15%2C%22new_device_cooldown_days%22%3A7%2C%22time_checked%22%3A1598543445%7D; steamCountry=DK%7C9004f9d825a6c115be27cc285ce3a70b; strInventoryLastContext=730_2; rgTopicView_Trading_3381077_18446744073709551615=%7B%223932159940150031933%22%3A%221598549659%22%7D; rgTopicView_Trading_3381077=%7B%223932159940150031933%22%3A1598549633%2C%222917724477528755916%22%3A1598549704%2C%22810939350834432856%22%3A1598549715%7D; rgTopicView_General_4009259_1=%7B%221744478429692182937%22%3A1598549786%7D; app_impressions=730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_100202|730@2_9_100006_|730@2_9_100006_|730@2_9_100008_|730@2_9_100006_|730@2_9_100006_100202|730@2_9_100006_|730@2_9_100006_100202|730@2_9_100006_|730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100006_|730@2_9_100006_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_100202|730@2_9_100008_|730@2_9_100008_|730@2_9_100001_|730@2_9_100008_; rgTopicView_General_32912287=%7B%223960307437826307489%22%3A1598550077%7D; tsTradeOffersLastRead=1598549790'
    },
    body: JSON.stringify(body)
  }
  const response = await request(postHeader);
  console.log(response);
}

module.exports = bumpingDiscussionsPostsModule;
