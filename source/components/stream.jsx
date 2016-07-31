var React = require('react')
var StreamTweet = require('./stream_tweet.jsx')
var Header = require('./header.jsx')
var TweetStore = require('../stores/tweet_store.js')

var Stream = React.createClass({

  // Initializes the state to the current tweet in the TweetStore by calling the
  // getter function, getTweet.
  getInitialState: function () {
    return {
      tweet: TweetStore.getTweet()
    }
  },

  // Refactored out
  // componentDidMount is one of the React API's component lifecycle methods. It
  // is always called immediately after React has finished the initial render of
  // the component (Stream in this case).
  //
  // Upon initial rendering, we pass our handleNewTweet function to the
  // initializeStream function of SnapkiteStreamClient, which will call our new
  // function and pass it a tweet every time it captures one that meets our
  // specifications.
  //
  // componentDidMount: function () {
  //   SnapkiteStreamClient.in itializeStream(this.handleNewTweet)
  // },
  //
  // Also a React API component lifecycle methods. Called just before React
  // unmountes the component (Stream in this case). This essentially allows you
  // to cleaup any JS libraries started when the component initially mounted.
  //
  // destroyStream cleans up our connection to SnapkiteStreamClient.
  //
  // componentWillUnmount: function () {
  //   SnapkiteStreamClient.destroyStream()
  // },
  //
  // Sets the state of the component to each new tweet object received
  // handleNewTweet: function (tweet) {
  //   this.setState({
  //     tweet: tweet
  //   })
  // },

  // Adds listener and passes onTweetChange as the callback function
  componentDidMount: function () {
    TweetStore.addChangeListener(this.onTweetChange)
  },

  // Removes the listener that was added initially. Have to pass the callback
  // function.
  componentWillUnmount: function () {
    TweetStore.removeChangeListener(this.onTweetChange)
  },

  // This is passed to TweetStore as the callback function. Will automatically
  // re-render when the state is changed.
  onTweetChange: function () {
    this.setState({
      tweet: TweetStore.getTweet()
    })
  },

  render: function () {
    var tweet = this.state.tweet

    if (tweet) {
      return (
        <StreamTweet tweet={tweet} />
      )
    }

    // Upon initial rendering, this will always be true until a tweet is
    // is sent by TweetStore.
    return (
      <Header text="Waiting for public photos from Twitter..." />
    )
  }
})

module.exports = Stream
