var React = require('react')
var Header = require('./header.jsx')
var Button = require('./button.jsx')
var CollectionRenameForm = require('./collection_rename_form.jsx')
var CollectionExportForm = require('./collection_export_form.jsx')
var CollectionActionCreators = require('../actions/collection_action_creators.js')
var CollectionStore = require('../stores/collection_store.js')

// Renders a user interface to control a collection. Allows user to rename,
// empty, or export a collection.
var CollectionControls = React.createClass({

  // Since we display the name here, it makes sense to store the name as a state
  // for this component. Since this component can render either the control
  // elements or a form to change the name, we need to track either state. That
  // is done by the isEditingName boolean.
  // Refactored: removed the name. That is in the CollectionStore now.
  getInitialState: function () {
    return {
      isEditingName: false
    }
  },

  // Returns a string describing the number of tweets in the collection in
  // proper English.
  getHeaderText: function () {
    var numberOfTweetsInCollection = this.props.numberOfTweetsInCollection
    var text = numberOfTweetsInCollection
    var name = CollectionStore.getCollectionName()

    // Singular wording when only one tweet exists in collection.
    if (numberOfTweetsInCollection === 1) {
      text = text + ' tweet in your '
    } else {
      text = text + ' tweets in your '
    }

    return (
      <span>
        {text}<strong>{name}</strong> collection
      </span>
    )
  },

  // Flips the boolean for isEditingName. Since changing state causes a rerender
  // this will flip what is being rendered. This is called when the user clicks
  // the "Rename collection" button in this component, or the "Cancel" button
  // in the CollectionRenameForm component.
  toggleEditCollectionName: function () {
    this.setState({
      isEditingName: !this.state.isEditingName
    })
  },

  // Used when the user clicks the "Empty Collection" button
  removeAllTweetsFromCollection: function () {
    CollectionActionCreators.removeAllTweetsFromCollection()
  },

  // Refactored out
  // Passed as a callback function to the CollectionRenameForm via props. Upon
  // user changing the name, this function will alter the state within this
  // component. Sets isEditingName back to false
  // setCollectionName: function (name) {
  //   this.setState({
  //     name: name,
  //     isEditingName: false
  //   })
  // },

  render: function () {

    // If we're editing the name, as tracked by the boolean state, then we
    // render a form.
    if (this.state.isEditingName) {
      return (
        <CollectionRenameForm onCancelCollectionNameChange={this.toggleEditCollectionName} />
      )
    }

    // If we're not editing the name, then we render the collection controls.
    return (
      <div>
        <Header text={this.getHeaderText()} />

        <Button label="Rename collection" handleClick={this.toggleEditCollectionName} />

        <Button label="Empty collection" handleClick={this.removeAllTweetsFromCollection} />

        <CollectionExportForm htmlMarkup={this.props.htmlMarkup} />
      </div>
    )
  }
})

module.exports = CollectionControls
