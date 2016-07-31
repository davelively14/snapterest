var SnapkiteStreamClient = require('snapkite-stream-client')
var TweetActionCreators = require('../actions/tweet_action_creators.js')

// Same thing we did in stream.jsx. We pass the receiveTweet callback function
// from the TweetActionCreators module to SnapkiteStreamClient, which will call
// that function every time a tweet meeting our established criteria happens.
// When receiveTweet is called, it will dispatch the tweet as a property of a
// new action object.
function initializeStreamOfTweets() {
  SnapkiteStreamClient.initializeStream(TweetActionCreators.receiveTweet)
}

module.exports = {
  initializeStreamOfTweets: initializeStreamOfTweets
}
