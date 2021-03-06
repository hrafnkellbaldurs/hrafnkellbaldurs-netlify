import { configure, addDecorator } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { withBackgrounds } from '@storybook/addon-backgrounds'
import { configureViewport, INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withTests } from '@storybook/addon-jest'
import { withOptions } from '@storybook/addon-options';
import testResults from '../jest-test-results.json'
import themeColors from '../src/styles/utils/colors/_theme-colors.scss'
import * as R from 'ramda'
require('../src/styles/storybook/main.scss')

/*** GATSBY OVERRIDES ***/

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""

// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

/*** STORYBOOK OPTIONS OVERRIDE ***/

addDecorator(
  withOptions({
    name: 'HrafnkellBaldurs Storybook',
    hierarchyRootSeparator: /\|/,
    sortStoriesByKind: true
  })
)

/*** GLOBAL DECORATORS ***/

// Global decorators
  // Knobs
addDecorator(withKnobs)

  // Backgrounds
const websiteColors = R.pipe(
  R.toPairs,
  R.map(([name, value]) => ({ name, value }))
)(themeColors)

addDecorator(withBackgrounds(
  [
    { name: 'default', value: '#fff', default: true },
    { name: 'twitter', value: '#00aced' },
    { name: 'facebook', value: '#3b5998'},
  ]
  .concat(websiteColors)
))

 // Viewport
const newViewports = {}
configureViewport({
  viewports: {
    ...INITIAL_VIEWPORTS,
    ...newViewports
  }
})

  // Tests
addDecorator(withTests({ results: testResults }))

/*** STORY IMPORTS ***/

// Automatically import all files ending in *.stories.js
const req = require.context('../src', true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)

