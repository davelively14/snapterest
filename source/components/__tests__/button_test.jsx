jest.dontMock('../button.jsx')

describe('Button component', function () {

  it('calls handler function on click', function () {

    var React = require('react')
    var TestUtils = require('react-addons-test-utils')
    var Button = require('../button.jsx')

    // Generates a mock function, which we name handleClick
    var handleClick = jest.genMockFunction()

    // Render the instance of our Button component to the DOM, passing our mock
    // function handleClick as a prop
    var button = TestUtils.renderIntoDocument(
      <Button handleClick={handleClick} />
    )

    // Find the button component with the tag 'button'...where did the tag come
    // from? I don't see where we added that tag?
    var buttonInstance = TestUtils.findRenderedDOMComponentWithTag(button, 'button')

    // What it says. Simulates the click on the passed component instance
    TestUtils.Simulate.click(buttonInstance)

    expect(handleClick).toBeCalled()

    // Every mock function has a mock object, which contains information on how
    // the function has been called.
    var numberOfCallsMadeIntoMockFunction = handleClick.mock.calls.length

    // Confirm the click is counted only once. Not really sure why this is
    // necessary...is a "click recorded twice" a common error in React?
    expect(numberOfCallsMadeIntoMockFunction).toBe(1)
  })
})
