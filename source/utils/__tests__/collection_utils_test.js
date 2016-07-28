jest.autoMockOff()

describe('Collection utilities module', function () {

  var CollectionUtils = require('../collection_utils.js')

  var collectionTweetsMock = {
    collectionTweet7: {},
    collectionTweet8: {},
    collectionTweet9: {}
  }

  it('returns a number of tweets in collection', function getNumberOfTweetsInCollection() {

    var actualNumberOfTweetsInCollection = CollectionUtils.getNumberOfTweetsInCollection(collectionTweetsMock)
    var expectedNumberOfTweetsInCollection = 3

    expect(actualNumberOfTweetsInCollection).toBe(expectedNumberOfTweetsInCollection)
  })

  it('checks if collection is not empty', function isNotEmptyCollection() {

    var actualIsEmptyCollectionValue = CollectionUtils.isEmptyCollection(collectionTweetsMock)

    // toBeDefined menas it has to return something other than undefined
    expect(actualIsEmptyCollectionValue).toBeDefined()
    // toBe works fine for primative values. toEqual does a deep comparison,
    // which is necessary for arrays, but not primative values.
    expect(actualIsEmptyCollectionValue).toBe(false)
    expect(actualIsEmptyCollectionValue).not.toBe(true)
  })
})
