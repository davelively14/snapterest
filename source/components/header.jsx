var React = require('react')

// Note CSS properties are conveted from hyphinated format (font-size) to
// camelCase (fontSize).
//
// BEWARE: Content security policies can block inline styling from having any
// effect. XSS attacks can inject bad code with inline comments. Many broswers
// will simply not run the inline script.
var headerStyle = {
  fontSize: '16px',
  fontWeight: '300',
  display: 'inline-block',
  margin: '20px 10px'
}

var Header = React.createClass({

  // Confusing title. This actually sets a default prop. In this case, it sets
  // text, a required paramter, to a default value. Any value passed by a parent
  // would overide this value.
  getDefaultProps: function () {
    return {
      text: 'Default header'
    }
  },

  render: function () {
    return (
      <h2 style={headerStyle}>{this.props.text}</h2>
    )
  }
})

module.exports = Header
