# Snapterest

This is the tutorial from the book "React.js Essentials", by Artemij Fedosejev. Changes to the tutorial's source code are identified in this file. This code is designed to prevent the need for a connection during dev.  Check todo lists before deploying. Several pieces of code need to be removed before it is production ready.

The program works, but the image formatting is weird. Pictures are too big. Creates a bit of a mess, but it does work.

## Current location

Page 129 (150 pdf)

## Installed dependencies (*names in italic are deviations*)

- gulp
  - Automated build process
- browserify
  - Bundles dependency files together so that node modules can be used by the application
- babelify
  - Needed for JSX
  - Ensure you have the `.babelrc` file created and configured (see below under Deviations, .babelrc section)
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
- jest-cli
  - Unit testing for React.
  - Have to edit the `package.json` file as well. Change:
  ```
  "scripts": {
     "test": "echo \"Error: no test specified\" && exit 1"
  },
  ```
  - to:
  ```
  "scripts": {
    "test": "jest"
  },
  ```
- react-addons-test-utils
  - Needed to help test, but requires additional packages (see below)
- *babel-jest*
  - Required to get jest working with react-addons-test-utils. Requires additional steps.
  - After installing using `npm install --save-dev babel-jest`, open `package.json` and insert the following block:
  ```
  "jest": {
    "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
    "testFileExtensions": [
      "es6",
      "js"
    ],
    "unmockedModulePathPatterns": [
      "<rootDir>/node_modules/react",
      "<rootDir>/node_modules/react-dom",
      "<rootDir>/node_modules/react-addons-test-utils",
      "<rootDir>/node_modules/fbjs"
    ]
  }
  ```
  - Ensure you have the `.babelrc` file created and configured (see below under Deviations, .babelrc section)

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

#### .babelrc

- In order to use the babel presets for JSX, you must create a file in the root directory named `.babelrc`. Within the file, add this code:
```
{
  "presets": ["es2015", "react"]
}
```
- This is required for both `gulp` and `babel-jest`

#### Dependencies

- babel-preset-es2015
- babel-preset-react
- bootstrap-css-only
- babel-jest (with additional configuration, see above)

#### Potentials

- Why no "else"? I hate hanging returns after if clauses
- Check TODOs
