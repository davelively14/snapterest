var React = require('react')
var ReactDOM = require('react-dom')
var Header = require('./header.jsx')
var Button = require('./button.jsx')

var inputStyle = {
  marginRight: '5px'
}

var CollectionRenameForm = React.createClass({

  // Sets default inputValue to the name passed from parent component.
  getInitialState: function () {
    return {
      inputValue: this.props.name
    }
  },

  // Given the new value, updates the inputValue state. Re-renders.
  setInputValue: function (inputValue) {
    this.setState({
      inputValue: inputValue
    })
  },

  // When a user changes a value in the rendered input field, this is called via
  // the onChange property. React passes an instance of SyntheticEvent to event
  // handlers. This function receives that object (onChange passes the object),
  // which has a target property that has a value property. This value property
  // is the string that a user has typed in the input field. We make it the new
  // state. Convoluted? Yes.
  handleInputValueChange: function (event) {
    var inputValue = event.target.value
    this.setInputValue(inputValue)
  },

  // Using preventDefault, we cancel the submit action, then pull the state from
  // the component, and pass it to the onChangeCollectionName callback function,
  // which allows the parent component to update the collectionName state at its
  // level.
  handleFormSubmit: function (event) {
    event.preventDefault()

    var collectionName = this.state.inputValue
    this.props.onChangeCollectionName(collectionName)
  },

  // Resets the inputValue and executes the onCancelCollectionNameChange
  // callback function, which will hide this component.
  handleFormCancel: function (event) {
    event.preventDefault()

    var collectionName = this.props.name
    this.setInputValue(collectionName)
    this.props.onCancelCollectionNameChange()
  },

  // Establishes focus on the rendered inputValue. Since we established the ref
  // for the input field as "collectionName", we can reference it here via the
  // refs React object.
  componentDidMount: function () {
    this.refs.collectionName.focus()
  },

  render: function () {
    
    // The ref property is a React property that can be attached to any
    // component that is returned by render() method, allowing us to refer
    // to this component outside of the render() method.
    // Note that the user is not in control of the value of the input field,
    // as it will also reflect the value of the state. The onChange prop is
    // used to monitor when a user types, which will call handleInputValueChange,
    // update the state, and rerender.
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <Header text="Collection name:" />
        <div className="form-group">
          <input
            className="form-control"
            style={inputStyle}
            onChange={this.handleInputValueChange}
            value={this.state.inputValue}
            ref="collectionName" />
        </div>

        <Button label="Change" handleClick={this.handleFormSubmit} />
        <Button label="Cancel" handleClick={this.handleFormCancel} />
      </form>
    )
  }
})

module.exports = CollectionRenameForm
