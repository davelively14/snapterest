# Snapterest

This is the tutorial from the book "React.js Essentials", by Artemij Fedosejev. Changes to the tutorial's source code are identified in this file. This code is designed to prevent the need for a connection during dev.  Check todo lists before deploying. Several pieces of code need to be removed before it is production read.

## Installed dependencies (bold are deviations)

- gulp
  - Automated build process
- browserify
  - Bundles dependency files together so that node modules can be used by the application
- babelify
  - Needed for JSX
- vinyl-source-stream
  - Needed to use browserify and gulp together? Not really clear yet how it does that.
- react
  - Contains base functionality for React
- react-dom
  - Contains functionality for rendering to the DOM
- *bootstrap-css-only*
  - Using this instead of the cdn minify in index.html from the book so that I can work offline
- *babel-preset-es2015*
  - Preset required to use JSX with babel 6.0.0 (which newer babelify versions use). See deviation notes for gulpfile.js below for implementation.
- *babel-preset-react*
  - Preset required to use JSX with babel 6.0.0 (which newer babelify versions use). See deviation notes for gulpfile.js below for implementation.
- snapkite-stream-client
  - Connects to the live stream from the snapkite engine

## Deviations

#### Conventions

- Did not use terminating semicolons
- File name conventions
  - Did not use `Component.react.js` naming for react component files. Instead, used `component.jsx`
  - Did not capitalize any file names
  - Used snake_case for filename spaces

#### index.html

- Used local references to bootstrap-css-only instead of cdn calls
- Added some formatting changes to improve readability

#### gulpfile.js

- In order to use the babel presets for JSX, changed the babelify to:
```
.transform(babelify.configure({ presets: ["es2015", "react"] }))
```

#### Dependencies

- babel-preset-es2015
- babel-preset-react
- bootstrap-css-only
