const checkingDiscussionsPostsModule = require('./checkingPostsInDiscussions')
const checkingGroupCommentsModule = require ('./checkingGroupsComments')

async function main() {
  checkingGroupCommentsModule.groupCommentsChecker();
  checkingDiscussionsPostsModule.recentDiscussionsChecker();
  setInterval(function(){
  main();
}, 720000)
}

main();