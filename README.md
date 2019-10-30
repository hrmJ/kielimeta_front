KIELIMETA front - digilang metadata portal's frontend
=====================================================

A react frontend for a metadata portal of linguistic datasets.
(currently running at digilang.utu.fi)

## Quick facts:

- Built with react + redux
- using yarn for package management
- styles with sass (component-specific classess - check. webpack's conf)
- ESLINT + prettier with airnbnb styleguide

Quick setup: run `yarn install` in the projects root. 

**Note:** Before building (`yarn run build`), set the correct values for, e.g., the address,
protocol and port of the API in `.env`  (cf. `.env.example`)


## Overview of the project's structure:

- Action creators, reducers and other Redux-related stuff at src/redux
- Components at src/components
  - datasetform: the form for inputting / modifying data
  - datasetlist: the default view for browsing the data
  - ui: buttons, dropdowns, input fields, icons and other ui components



For more info, feel free to contact me via gmail (juho.harme) or twitter @jharme.
