function getNumberOfTweetsInCollection(collection) {
  var TweetUtils = require('./tweet_utils.js')
  var listOfCollectionTweetIds = TweetUtils.getListOfTweetIds(collection)

  return listOfCollectionTweetIds.length
}

function isEmptyCollection(collection) {
  return (getNumberOfTweetsInCollection(collection) == 0)
}

module.exports = {
  getNumberOfTweetsInCollection: getNumberOfTweetsInCollection,
  isEmptyCollection: isEmptyCollection
}
