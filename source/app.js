var React = require('react')
var ReactDOM = require('react-dom')
var Application = require('./components/application.jsx')
var WebAPIUtils = require('./utils/web_api_utils.js')

WebAPIUtils.initializeStreamOfTweets()

ReactDOM.render(<Application />, document.getElementById('react-application'))
