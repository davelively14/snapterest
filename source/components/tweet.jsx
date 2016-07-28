var React = require('react')

// Note that this may not render inline
var tweetStyle = {
  position: 'relative',
  display: 'inline-block',
  width: '300px',
  height: '400px',
  margin: '10px'
}

// Note that this may not render inline
var imageStyle = {
  maxHeight: '400px',
  boxShadow: '0px 1px 1px 0px #aaa',
  border: '1px solid #fff'
}

var Tweet = React.createClass({

  // Validates various component properties. This is only checked in the dev
  // environment.
  propTypes: {

    // Custom validator. React will pass the parameters properties (all
    // component props), propertyName (name of property validating), and
    // componentName(name of the component). This is really weird, because tweet
    // is the key here, but it's also the propertyName.
    tweet: function (properties, propertyName, componentName) {

      // properties is an object of all props for the component.
      // propertyName should correspond to the property we're validation
      // (tweet), but would be null if it is that property is not present.
      // This seems unnecessarily convulated.
      var tweet = properties[propertyName]

      if (! tweet) {
        return new Error('Tweet must be set.')
      }

      if (! tweet.media) {
        return new Error('Tweet must have an image.')
      }
    },

    // Validates that the onImageClick property is a function. Could also add
    // a "isRequired" at the end, which would display a warning message in the
    // console if it was not present.
    onImageClick: React.PropTypes.func
  },

  // If user clicks rendered image, it will call this function. onImageClick is
  // set to the onImageClick prop, which is actually the callback function
  // addTweetToCollection in Application, and passes the tweet object. Because
  // onImageClick is an optional Tweet component property, we check whether it
  // was passed before executing.
  handleImageClick: function () {
    var tweet = this.props.tweet
    var onImageClick = this.props.onImageClick

    if (onImageClick) {
      onImageClick(tweet)
    }
  },

  render: function () {
    var tweet = this.props.tweet
    var tweetMediaUrl = tweet.media[0].url

    return (
      <div style={tweetStyle}>
        <img src={tweetMediaUrl} onClick={this.handleImageClick} style={imageStyle} />
      </div>
    )
  }
})

module.exports = Tweet
