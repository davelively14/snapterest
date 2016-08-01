var React = require('react')
var ReactDOMServer = require('react-dom/server')
var CollectionControls = require('./collection_controls.jsx')
var TweetList = require('./tweet_list.jsx')
var Header = require('./header.jsx')
var CollectionUtils = require('../utils/collection_utils.js')
var CollectionStore = require('../stores/collection_store.js')

var Collection = React.createClass({

  getInitialState: function () {
    return {
      collectionTweets: CollectionStore.getCollectionTweets()
    }
  },

  // Adds an event listerner and passes the onCollectionChange callback function
  componentDidMount: function () {
    CollectionStore.addChangeListener(this.onCollectionChange)
  },

  // Removes the event listener upon unmounting
  componentWillUnmount: function () {
    CollectionStore.removeChangeListener(this.onCollectionChange)
  },

  // This is the callback function passed to CollectionStore's event listener
  onCollectionChange: function () {
    this.setState({
      collectionTweets: CollectionStore.getCollectionTweets()
    })
  },

  // Creates a JSON formatted string that represents the HTML markup created by
  // rendering the TweetList component. This is passed to CollectionControls,
  // which will have the option to export this. Essentially, this produces a
  // JSON object that can be bassed to a third-party API.
  createHtmlMarkupStringOfTweetList: function () {

    var htmlString = ReactDOMServer.renderToStaticMarkup(
      <TweetList tweets={this.state.collectionTweets} />
    )

    // Puts the htmlString produced above as the value of the html key in an
    // object.
    var htmlMarkup = {
      html: htmlString
    }

    // JSON format of the HTML markup.
    return JSON.stringify(htmlMarkup)
  },

  render: function () {
    var collectionTweets = this.state.collectionTweets
    var numberOfTweetsInCollection = CollectionUtils.getNumberOfTweetsInCollection(collectionTweets)
    var htmlMarkup

    if (numberOfTweetsInCollection > 0) {

      htmlMarkup = this.createHtmlMarkupStringOfTweetList()

      // Note that we always wrap in one element, in this case a div, because
      // React only allows one root element.
      // CollectionControls will render a header with a collection name
      // and a set of buttons that will allow user to modify a collection
      return (
        <div>
          <CollectionControls numberOfTweetsInCollection={numberOfTweetsInCollection} htmlMarkup={htmlMarkup} />
          <TweetList tweets={collectionTweets} />

        </div>
      )
    }

    // Returns only if the there are no tweets in the collection
    return <Header text="Your collection is empty" />
  }
})

module.exports = Collection
