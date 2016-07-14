var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var listOfItems =
<ul className="list-of-itmes">
  <li className="item-1">Item 1</li>
  <li className="item-2">Item 2</li>
  <li className="item-3">Item 3</li>
</ul>;

ReactDOM.render(listOfItems, document.getElementById('react-application'));
