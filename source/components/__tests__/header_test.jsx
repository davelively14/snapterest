jest.dontMock('../header.jsx')

describe('Header component', function() {

  it('renders provided header text', function () {
    var React = require('react')
    var ReactDOM = require('react-dom')

    // Necessary to use the renderIntoDocument function. Note, you need
    // babel-jest installed and configured for this to work.
    var TestUtils = require('react-addons-test-utils')
    var Header = require('../header.jsx')

    // Pass the React Header component to the renderIntoDocument, which renders
    // to the DOM and returns the reference, which is stored in the 'header'
    // variable (yes, confusing, but not the same as 'Header').
    var header = TestUtils.renderIntoDocument(
      <Header text="Testing..." />
    )

    // ReactDOM.findDOMNode is passed the reference that was stored in the
    // variable 'header', and returns that DOM node element, which is chained to
    // textContent, thus returning the text of the element.
    var actualHeaderText = ReactDOM.findDOMNode(header).textContent

    expect(actualHeaderText).toBe('Testing...')

    var defaultHeader = TestUtils.renderIntoDocument(
      <Header />
    )

    var actualDefaultHeaderText = ReactDOM.findDOMNode(defaultHeader).textContent

    expect(actualDefaultHeaderText).toBe('Default header')
  })
})
