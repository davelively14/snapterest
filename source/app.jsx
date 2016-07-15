var React = require('react')
var ReactDOM = require('react-dom')

var ReactClass = React.createClass({
  getInitialState: function () {
    return {
      isHeaderHidden: false
    }
  },

  handleClick: function () {
    this.setState({
      isHeaderHidden: !this.state.isHeaderHidden
    })
  },

  render: function () {
    var title = 'Stateful React Component'
    var headerElement = React.createElement('h1', { className: 'header', key: 'header' }, title)
    var buttonElement = React.createElement('button', { className: 'btn btn-primary', onClick: this.handleClick, key: 'button' }, 'Toggle Header')

    if (this.state.isHeaderHidden) {
      return React.createElement('div', { className: 'container' }, [ buttonElement ])
    }

    return React.createElement('div', {className: 'container'}, [ buttonElement, headerElement ])
  }
})

var reactComponentElement = React.createElement(ReactClass)
var reactComponent = ReactDOM.render(reactComponentElement, document.getElementById('react-application'))
