var React = require('react')
var ReactDOM = require('react-dom')
var Header = require('./header.jsx')
var Tweet = require('./tweet.jsx')

var StreamTweet = React.createClass({

  // numberOfCharactersIsIncreasing: keeps track whether a tweet that will be
  // displayed next has more characters in its text than a currently displayed
  // tweet.
  // headerText: stores the text for the Header component to be rendered.
  getInitialState: function () {
    console.log('[Snapterest] StreamTweet: 1. Running getInitialState()')

    return {
      numberOfCharactersIsIncreasing: null,
      headerText: null
    }
  },

  componentWillMount: function () {
    console.log('[Snapterest] StreamTweet: 2. Running componentWillMount()')

    // Since we know this is called only once, and right after initialialization,
    // we know that numberOfCharactersIsIncreasing has to be true. Note that
    // this will not cause render to run twice, as React is aware nothing has
    // been rendered yet.
    this.setState({
      numberOfCharactersIsIncreasing: true,
      headerText: 'Latest public photo from Twitter'
    })

    // This global object is not part of React or our app. It is a conveninence
    // tool used to keep track of how many tweets have been processed at anything
    // given time. Do not use IRL - it's icky mutable stuff.
    // In console, you can type snapterest.numberOfReceivedTweets and it will
    // display the stored values.
    // TODO [deploy] remove
    window.snapterest = {
      numberOfReceivedTweets: 1,
      numberOfDisplayedTweets: 1
    }
  },

  // componentDidMount should be the prefered component lifecycle method for
  // integrating with external libraries and API's, such as AJAX, JQuery, etc.
  // TODO [deploy] remove
  componentDidMount: function () {
    console.log('[Snapterest] StreamTweet: 3. Running componentDidMount()')

    // This references the DOM node of our current component
    var componentDOMRepresentation = ReactDOM.findDOMNode(this)

    window.snapterest.headerHtml = componentDOMRepresentation.children[0].outerHTML
    window.snapterest.tweetHtml = componentDOMRepresentation.children[1].outerHTML
  },

  // componentWillReceiveProps is the first component lifecycle method to be
  // invoked during the Updating Phase if a component receives new props from
  // its parent component. Will not execute otherwise. React passes the
  // nextProps object to the function. Note that setState does not trigger any
  // additional renders when called within this hook function.
  componentWillReceiveProps: function (nextProps) {
    console.log('[Snapterest] StreamTweet: 4. Running componentWillReceiveProps()')

    var currentTweetLength = this.props.tweet.text.length
    var nextTweetLength = nextProps.tweet.text.length
    var isNumberOfCharactersIncreasing = (nextTweetLength > currentTweetLength)
    var headerText

    this.setState({
      numberOfCharactersIsIncreasing: isNumberOfCharactersIncreasing
    })

    if (isNumberOfCharactersIncreasing) {
      headerText = 'Number of characters is increasing'
    } else {
      headerText = 'Latest public photo from Twitter'
    }

    // It doesn't matter how often we call setState, React does an internal
    // optimization where it batches all the state updates together.
    this.setState({
      headerText: headerText
    })

    // TODO [deploy] remove
    window.snapterest.numberOfReceivedTweets++
  },

  // Determines if the component shouldl update or not. Must return either true
  // or false. If forceUpdate() is called, this function will not be called.
  shouldComponentUpdate: function (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 5. Running shouldComponentUpdate()')

    return (nextProps.tweet.text.length > 1)
  },

  // componentWillUpdate is called immediately before React updates the DOM and
  // always receives two arguments: nextProps and nextState. However, setState
  // cannot be called inside this function.
  componentWillUpdate: function (nextProps, nextState) {
    console.log('[Snapterest] StreamTweet: 6. Running componentWillUpdate()')
  },

  // componentDidUpdate called immediately after React updates the DOM.
  componentDidUpdate: function (prevProps, prevState) {
    console.log('[Snapterest] StreamTweet: 7. Running componentDidUpdate()')

    // TODO [deploy] remove
    window.snapterest.numberOfDisplayedTweets++
  },

  // componentWillUnmount used to cleanup. It is called immediately before React
  // unmmounts the component. Ensure to terminate any other JS API's integrated
  // during componentDidMount().
  // TODO [deploy] remove
  componentWillUnmount: function () {
    console.log('[Snapterest] StreamTweet: 8. Running componentWillUnmount()')

    delete window.snapterest
  },

  render: function () {
    console.log('[Snapterest] StreamTweet: Running render()')

    return (
      <section>
        <Header text={this.state.headerText} />
        <Tweet tweet={this.props.tweet} onImageClick={this.props.onAddTweetToCollection} />
      </section>
    )
  }
})

module.export = StreamTweet
