/**
 * It is the root component of the MCUITest.
 */
import React from "react";
import ReactDOM from "react-dom";
import Doves from "./Doves.jsx";
import SearchFilter from "./SearchFilter.jsx";
import DoveDialog from "./DoveDialog.jsx";
 
class App extends React.Component {

    constructor(props) {
        super(props);
        this.defaultState = { filter: null, showDialog: false, dialogMode: "na" };
        this.state = this.defaultState;
        this.onSearchFilterChanged = this.onSearchFilterChanged.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onViewDetails = this.onViewDetails.bind(this);
    }

    /**
     * It is the callback function to the SearchFilter component.  Upon a search value is present,
     * the SearchFilter component would invoke this function passing along the search value.  It
     * will update the state, and then triggers a refresh of the page.
     */
    onSearchFilterChanged(filter) {
        if (filter && filter.length == 0) {
            filter = null;
        }
        this.setState({ filter: filter });
    }

    /**
     * It is the callback function to the dove details row click.  Upon receiving a row click, it
     * updates the state and then triggers the dialog box to appear for viewing the dove details, where
     * user can change the details or can delete a dove.
     */
    onViewDetails(details) {
        this.setState({ filter: this.state.filter, showDialog: true, dialogMode: "change", details: details });
    }

    /**
     * It is the handler listening to the Add click to add a new dove.  Upon receiving an Add click,
     * it updates the state and then triggers the dialog box to appear allowing the user to enter
     * the dove details.
     */
    onAddClick() {
        this.setState({ filter: null, showDialog: true, dialogMode: "add" });
    }

    /**
     * It is the callback function to the dialog box upon Add, Update, and Delete actions completed.
     * Upon receiving such events, it updates the state and hides the dialog box.
     */
    onSubmit() {
        this.setState({ filter: null, showDialog: false, dialogMode: "na", details: null });
    }

    /**
     * It renders the top-level components including the toolbar containing the Add control and
     * the SearchFilter, the doves details table, and the dialog box.  The dialog box is not rendered
     * initially.  It is rendered only on Add click or on a row click.
     */
    render() {
        let filter = this.state.filter;
        let isShow = this.state.showDialog;
        let dialogMode = this.state.dialogMode;
        let details = this.state.details ? this.state.details : null;
        return (<div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="toolbar">
                        <SearchFilter onSearchFilterChanged={this.onSearchFilterChanged}/>
                        <div className="add-control" onClick={this.onAddClick}>Add</div>
                    </div>
                </div>
            </div>
            <Doves filter={filter} onViewDetails={this.onViewDetails}/>
            <DoveDialog show={isShow} mode={dialogMode} details={details} onSubmit={this.onSubmit}/>
        </div>)
    }
}

ReactDOM.render(<App/>, document.getElementById("mcui"));
