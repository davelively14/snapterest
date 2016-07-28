var React = require('react')
var Tweet = require('./tweet.jsx')

var listStyle = {
  padding: '0'
}

var listItemStyle = {
  display: 'inline-block',
  listStyle: 'none'
}

var TweetList = React.createClass({

  // Returns list of tweet ids
  getListOfTweetIds: function () {
    return Object.keys(this.props.tweets)
  },

  // Returns a HTML markup for a  Tweet component inside a stylized list for a
  // given tweetId.
  getTweetElement: function (tweetId) {
    var tweet = this.props.tweets[tweetId]
    var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection
    var tweetElement

    // The TweetList will be used in two different scenarios:
    // Inside a Collection component when allowing the user to remove tweets
    // from the collection. In this case, the onRemoveTweetFromCollection
    // property is provided.
    // When rendering a string of HTML markup that represents a collection of
    // tweets. In this case, the onRemoveTweetFromCollection is not provided.
    if (handleRemoveTweetFromCollection) {
      tweetElement = {
        <Tweet tweet={tweet} onImageClick={handleRemoveTweetFromCollection} />
      }
    } else {
      tweetElement = <Tweet tweet={tweet} />
    }

    // Key properties are used by React to identify each child element that is
    // created dynamically.
    // https://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    return <li style={listItemStyle} key={tweet.id}>{tweetElement}</li>
  },

  render: function () {

    // TODO implement this theory
    // Not sure why we can't just do this.props.tweets.map(this.getTweetElement)
    // but have getTweetElement receive a tweet object? Feel like we're
    // transversing the list twice instead of just once. Would have to rework
    // getTweetElement as well.
    var tweetElements = this.getListOfTweetIds().map(this.getTweetElement)

    return (
      <ul style={listStyle}>
        {tweetElements}
      </ul>
    )
  }
})

module.exports = TweetList
