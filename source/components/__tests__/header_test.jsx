jest.dontMock('../header.jsx')

describe('Header component', function() {

  it('renders provided header text', function () {
    var React = require('react')
    var ReactDOM = require('react-dom')

    // Necessary to use the renderIntoDocument function. Note, you need
    // babel-jest installed and configured for this to work.
    var TestUtils = require('react-addons-test-utils')
    var Header = require('../header.jsx')

    var header = TestUtils.renderIntoDocument(
      <Header text="Testing..." />
    )

    var actualHeaderText = ReactDOM.findDOMNode(header).textContent

    expect(actualHeaderText).toBe('Testing...')

    var defaultHeader = TestUtils.renderIntoDocument(
      <Header />
    )

    var actualDefaultHeaderText = ReactDOM.findDOMNode(defaultHeader).textContent

    expect(actualDefaultHeaderText).toBe('Default header')
  })
})
