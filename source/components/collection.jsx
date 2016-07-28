var React = require('react')
var ReactDOMServer = require('react-dom/server')
var CollectionControls = require('./collection_controls.jsx')
var TweetList = require('./tweet_list.jsx')
var Header = require('./header.jsx')

var Collection = React.createClass({

  // Creates a JSON formatted string that represents the HTML markup created by
  // rendering the TweetList component. This is passed to CollectionControls,
  // which will have the option to export this. Essentially, this produces a
  // JSON object that can be bassed to a third-party API.
  createHtmlMarkupStringOfTweetList: function () {

    var htmlString = ReactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.props.tweets} />
    )

    // Puts the htmlString produced above as the value of the html key in an
    // object.
    var htmlMarkup = {
      html: htmlString
    }

    // JSON format of the HTML markup.
    return JSON.stringify(htmlMarkup)
  },

  // Returns a list of keys from the tweets object
  getListOfTweetIds: function () {
    return Object.keys(this.props.tweets)
  },

  // Returns length of the list of Tweet ids
  getNumberOfTweetsInCollection: function () {
    return this.getListOfTweetIds().length
  },

  render: function () {
    var numberOfTweetsInCollection = this.getNumberOfTweetsInCollection()

    if (numberOfTweetsInCollection > 0) {

      var tweets = this.props.tweets
      var htmlMarkup = this.createHtmlMarkupStringOfTweetList()
      var removeAllTweetsFromCollection = this.props.onRemoveAllTweetsFromCollection
      var handleRemoveTweetFromCollection = this.props.onRemoveTweetFromCollection

      // Note that we always wrap in one element, in this case a div, because
      // React only allows one root element.

      // CollectionControls will render a header with a collection name
      // and a set of buttons that will allow user to modify a collection
      return (
        <div>
          <CollectionControls numberOfTweetsInCollection={numberOfTweetsInCollection} htmlMarkup={htmlMarkup} onRemoveAllTweetsFromCollection={removeAllTweetsFromCollection} />
          <TweetList tweets={tweets} onRemoveTweetFromCollection={handleRemoveTweetFromCollection} />

        </div>
      )
    }

    // Returns only if the there are no tweets in the collection
    return <Header text="Your collection is empty" />
  }
})

module.exports = Collection
