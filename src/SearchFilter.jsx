/**
 * SearchFilter module
 */
import React from "react";
 
class SearchFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: this.props.query };
        this.onChangePending = null;
        this.onChange = this.onChange.bind(this);
        this.onKeyup = this.onKeyup.bind(this);
        this.doveKeys = [ "id", "active", "color", "images_collected", "last_command", "deorbit_dt" ];
    }

    /**
     * It is the handler listening on the value changes from the search input field.  Upon receiving
     * the value change events, it update the state so that the entered value appear in the input field.
     * An update intent throttling is included to update the React element on chunks of keystrokes.
     * Upon keystroke events idle, the update intent throttling would ends, and then it notify the
     * readiness of a search filter value.
     */
    onChange(ev) {
        if (this.onChangePending) {
            clearTimeout(this.onChangePending);
        }
        this.onChangePending = setTimeout(() => {
            this.onChangePending = null;
            this.notifyFilterChange(this.state.query);
        }, 500);
        this.setState({ query: ev.target.value });
    }

    /**
     * It is the handler listening on the keystrokes from the search input field.  Upon receiving
     * the keystroke events, and if it is an ENTER key, it immediately cancels the throttling and
     * triggers a notify about the readiness of a search filter value.
     */
    onKeyup(ev) {
        if (ev.keyCode !== 13) {
            return;
        }
        if (this.onChangePending) {
            clearTimeout(this.onChangePending);
            this.onChangePending = null;
        }
        this.notifyFilterChange(this.state.query);
    }

    /**
     * It is the notifier of the search filter readiness. It invokes the callback given by the
     * components from the upward hierarchy passing it along the search filter value.
     */
    notifyFilterChange(filter) {
        filter = filter.trim();
        if (filter.length == 0) {    // search all
            this.clearInputInvalid();
            this.props.onSearchFilterChanged();
            return;
        }

        let tokens = filter.split('=');
        if (tokens.length == 2) {    // search by property
            this.clearInputInvalid();
            let key = tokens[0].trim();
            let value = tokens[1].trim();
            if (key.length > 0 && value.length > 0 && this.isKeyValid(key)) {
                this.props.onSearchFilterChanged(key+"="+value);
            } else {
                this.inputInvalid();
            }
        } else {
            this.inputInvalid();
        }
    }

    /**
     * It validates whether or the the property name in the search filter is valid or not.
     * The valid property key are "id", "active", "color", "images_collected", "last_command", and
     * "deorbit_dt".
     */
    isKeyValid(target) {
        return this.doveKeys.some((key) => key == target);
    }

    /**
     * It is the error painter to the search field.  If the search filter is invalid, it triggers
     * the visual treatment to the search box indicating that the value entered is invalid.
     */
    inputInvalid() {
        $(".search-box .filter-input").addClass("error");
    }

    /**
     * It clears the visual treatment from the search box restoring it to its normal visual state.
     */
    clearInputInvalid() {
        $(".search-box .filter-input").removeClass("error");
    }

    /**
     * It renders the search filter component
     */
    render() {
        let query = this.state.query || "";
        return (<div className="search-box">
            <label>Search:</label>
            <input className="filter-input" type="text" placeholder="property=value" value={query}
                   onChange={this.onChange} onKeyUp={this.onKeyup}/>
        </div>);
    }
}

export default SearchFilter;
