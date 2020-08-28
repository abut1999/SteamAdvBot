const checkingDiscussionsPostsModule = require('./checkingPostsInDiscussions.js')
const postingGroupCommentModule = require ('./checkingGroupsComments.js')

async function main() {
  //postingGroupCommentModule.groupCommentsChecker(); 
  checkingDiscussionsPostsModule.recentDiscussionsChecker();
}

main();