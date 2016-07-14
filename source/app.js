var React = require('react');
var ReactDOM = require('react-dom');

var h1 = React.createElement('h1', { className: 'header', key: 'header' }, 'This is React');
var p = React.createElement('p', { className: 'content', key: 'content'}, "And this is how it works.");
var reactFragment = [ h1, p ];
var section = React.createElement('section', { className: 'container'}, reactFragment);

ReactDOM.render(section, document.getElementById('react-application'));
