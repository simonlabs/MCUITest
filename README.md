### Congratulations!

You’ve been commissioned to build DoveBox: a user interface for our latest flock of doves. Our Space Captains will use DoveBox to control the doves (which are actually Earth-imaging satellites, not birds) in orbit. We’ve provided our advanced API and database to help you get started.

### Implement a React application that does the following:

* Displays a table of Doves on pageload, populated by the API
* Has a Search component to query the API for Doves based on their properties, and displays results in the above-mentioned table.
* Has a form to add new Doves to the database
* Add another feature that incorporates the API in some way.

### Guidelines

* You should use a flux-like architecture for managing state.
* You may import whatever React elements you wish.
* Have fun!

### Set-up instructions

Clone this repo and run `npm install` in the root directory to install our [JSON-server](https://github.com/typicode/json-server) npm package. (Note: you do not need to install JSON-server separately!) Run `npm start` to initialize the dummy API server. While it's running, you can access the API via `localhost:3000`. Navigating to that page in a browser will show the API spec.

To submit your app email us at: darcy@planet.com with a link to your repo. If you have questions or issues with the test, please let us know.

### Deliverables Summary

The deliverable features include the following:

* It presents a table of Doves upon pageload showing all Doves via a GET call.
* It has a search component to filter the table based on the Dove's property name.  The table refreshes upon entering the search value.
* It has a form to add new Doves to the database.
* In addition, it also supports Dove modification and deletion.

### Running The Deliverable

* `git clone https://github.com/simonlabs/MCUITest.git` - Clone the deliverable from the repo. 
* `cd MCUITest` - Change to the project root directory. 
* `npm init` - Initialize the project. 
* `npm install` - Install the dependencies. 
* `.\node_modules\.bin\webpack` - Build. On Mac, use `./node_modules/.bin/webpack`
* `npm start` - Start the server. 
* URL: `localhost:3000` from a brwoser to connect.

### Features

* Doves are listed in the table upon page load. Each row represents a Dove.  Even and odd rows are color offsetted.
* Search filter on the upper right corner of the page accepts `name=value` search filter to narrow down the list.  The `name` must match to the property name of the Dove.  As long as a `name=value` expression is formed or an `ENTER` key is pressed, it triggers a new fetch from the backend to refresh the table.
* An `Add` control next to the search filter allows user to add new Dove.  Clicking on the `Add` control brings up a modal dialog box to enter the properties' value for adding a new Dove.  Click the `Add` button from the dialog box to submit it to the database.  The table will refresh itself upon submit.  The new Dove should appear in the list.
* Click on any row would also bring up the dialog box with the same Dove details presented. Form the dialog box, `Update` and `Delete` are permitted.  A `Cancel` button is also present allowing user to back out of the action.  Upon `Update` and `Delete`, the table would also refresh by itself upon submit.

### Directory Structure

* From the project root, `src` and `public` are present.
* The `public` directory holds all the static contents including the javascript files bundled by the `webpack` and the `jquery` third-party library.  The `css` directory has the stylesheet for the MCUITest and the `bootstrap` css.  The `img` directory has the favicon.  The `index.html` is the landing page, which is also in the `public` directory.
* The `src` directory has all the React components.

### MCUITest React Components

* `index.jsx` - It is the root component of MCUITest.
* `SearchFilter.jsx` - It is the search filter component.
* `Doves.jsx` - It is an aggregate component representing the table.  It contains rows of Doves.
* `DoveDetails.jsx` - It represents a Dove presented as a row in the table.  It responds to a click to present the same Dove details in a dialog box.
* `DoveDialog.jsx` - It is a modal dialog box.  It supports Dove creation, modification, and deletion.  It is context sensitive, i.e. the Dove creation is present only by the `Add` action from the top toolbar.  The modification and deletion contexts are presented by clicking on a row.
* `DovesService.jsx` - It is a service for the MCUITest encapsulates the AJAX interface to the backend.

### Technical Heightlights

* The layout of MCUITest is based on the `bootstrap` responsive grids so that MCUITest responds well on all devices.
* Inter components communication is demonstrated, both in upward and in downward directions. Clicking on a Dove detail row, an upward communication takes place allowing the upper components to bring up the modal dialog box showing the clicked Dove.  Specifying a search filter would initiate a downward communication to refresh the entire table.
* All state changes are compliant to the Flux pattern.
* CURD operations are fully demonstrated via AJAX GET, POST, PUT, and DELETE.
