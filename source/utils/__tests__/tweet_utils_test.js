// Tells Jest to not mock our TweetUtils module. Otherwise, Jest would return an
// imitation of our TweetUtils modeul instead of the real one (their wording).
jest.dontMock('../tweet_utils.js')

// This is a suit of tests. In this case, it's a collection of tests for the
// Tweet utilities module. If there were more functions to test, we'd have more
// 'it' functions - one for each.
describe('Tweet utilities module', function () {

  // Individual tests are called specs. This is a spec.
  it('returns an array of tweet ids', function () {
    var TweetUtils = require('../tweet_utils.js')
    var tweetsMock = {
      tweet1: {},
      tweet2: {},
      tweet3: {}
    }
    var expectedListOfTweetIds = ['tweet1', 'tweet2', 'tweet3']
    var actualListOfTweetIds = TweetUtils.getListOfTweetIds(tweetsMock)

    // Expectation chained to the matcher function 'toEqual'
    expect(actualListOfTweetIds).toEqual(expectedListOfTweetIds)
  })
})
