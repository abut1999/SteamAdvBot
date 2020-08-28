const bumpingDiscussionsPostsModule = require('./bumpingPostsInDiscussions.js')
const postingGroupCommentModule = require ('./checkingGroupsComments.js')

async function main() {
  //bumpingDiscussionsPostsModule.getGlobalForumDiscussion();
  //bumpingDiscussionsPostsModule.bumpInGerysDiscussion();
  postingGroupCommentModule.groupCommentsChecker(); 
}

main();