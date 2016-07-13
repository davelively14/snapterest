# Snapterest

This is the tutorial from the book "React.js Essentials", by Artemij Fedosejev.

## Installed dependencies

- gulp
  - Automated build process
- browserify
  - Bundles dependency files together so that node modules can be used by the application
- babelify
  - Needed for JSX
- vinyl-source-stream
  - Needed to use browserify and gulp together? Not really clear yet
- react
  - Contains base functionality for React
- react-dom
  - Contains functionality for rendering to the DOM
- bootstrap-css-only
  - Using this instead of the cdn minify in index.html from the book so that I can work offline

## Deviations

#### index.html

- Used local references to bootstrap-css-only instead of cdn calls
