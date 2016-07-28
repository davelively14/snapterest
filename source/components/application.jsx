// Importing CommonJS dependency modules.
var React = require('react')
var Stream = require('./stream.jsx')
var Collection = require('./collection.jsx')

// Define React components. React specific.
var Application = React.createClass({

  // React API
  getInitialState: function () {
    return {
      collectionTweets: {}
    }
  },

  // Notes on addTweetToCollection, removeTweetFromCollection,
  // removeAllTweetsFromCollection:
  // These callback functions will be passed to child componenets as a property.
  // When a child component wants to update the state, it calls the callback
  // function and passes necessary data. This parent component will update the
  // state and then trigger the render() function that re-renders all the child
  // components as necessary. This lets the child component focus on how to
  // render itself and allows the parent to control its own state.

  addTweetToCollection: function (tweet) {
    var collectionTweets = this.state.collectionTweets

    collectionTweets[tweet.id] = tweet

    this.setState({
      collectionTweets: collectionTweets
    })
  },

  removeTweetFromCollection: function (tweet) {
    var collectionTweets = this.state.collectionTweets

    delete collectionTweets[tweet.id]

    this.setState({
      collectionTweets: collectionTweets
    })
  },

  removeAllTweetsFromCollection: function () {
    this.setState({
      collectionTweets: {}
    })
  },

  // React API
  render: function () {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4 text-center">
            <Stream onAddTweetToCollection={this.addTweetToCollection} />
          </div>
          <div className="col-md-8">
            <Collection tweets={this.state.collectionTweets} onRemoveTweetFromCollection={this.removeTweetFromCollection} onRemoveAllTweetsFromCollection={this.removeAllTweetsFromCollection} />
          </div>
        </div>
      </div>
    )
  }
})

// Exporting the React component as a CommonJS module.
module.exports = Application
