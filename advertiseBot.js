const checkingDiscussionsPostsModule = require('./checkingPostsInDiscussions')
const checkingGroupCommentsModule = require ('./checkingGroupsComments');
const creatingThreadModule = require('./creatingThreadInGlobal');

function main() {
  function initiateFunctions() {
    checkingGroupCommentsModule.groupCommentsChecker();
    checkingDiscussionsPostsModule.recentDiscussionsChecker();
  }
  initiateFunctions();
  setInterval(initiateFunctions, 1800*1000);
  setInterval(creatingThreadModule.initiateThreadCreating, 3610*1000);
}

main();