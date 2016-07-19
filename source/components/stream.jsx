var React = require('react')
var SnapkiteStreamClient = require('snapkite-stream-client')
var StreamTweet = require('./stream_tweet.jsx')
var Header = require('./header.jsx')

var Stream = React.createClass({

  // The tweet state will be used to store teh endless stream of new tweets.
  getInitialState: function () {
    return {
      tweet: null
    }
  },

  // componentDidMount is one of the React API's component lifecycle methods. It
  // is always called immediately after React has finished the initial render of
  // the component (Stream in this case).
  //
  // Upon initial rendering, we pass our handleNewTweet function to the
  // initializeStream function of SnapkiteStreamClient, which will call our new
  // function and pass it a tweet every time it captures one that meets our
  // specifications.
  componentDidMount: function () {
    SnapkiteStreamClient.initializeStream(this.handleNewTweet)
  },

  // Also a React API component lifecycle methods. Called just before React
  // unmountes the component (Stream in this case). This essentially allows you
  // to cleaup any JS libraries started when the component initially mounted.
  //
  // destroyStream cleans up our connection to SnapkiteStreamClient.
  componentWillUnmount: function () {
    SnapkiteStreamClient.destroyStream()
  },

  // Sets the state of the component to each new tweet object received
  handleNewTweet: function (tweet) {
    this.setState({
      tweet: tweet
    })
  },

  // Stream never actually renders anything on it's own. It only encapsulates
  // our application's logic delegates rendering to other components. In other
  // words, Stream acts as a controller.
  render: function () {
    var tweet = this.state.tweet

    if (tweet) {
      return (
        <StreamTweet tweet={tweet} onAddTweetToCollection={this.props.onAddTweetToCollection} />
      )
    }

    // Upon initial rendering, this will always be true until a tweet is
    // received by the Snapkite engine.
    return (
      <Header text="Waiting for public photos from Twitter..." />
    )
  }
})

module.exports = Stream
