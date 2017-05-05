/**
 * DoveDialog module
 */

import React from "react";
import dovesService from "./DovesService";
 
class DoveDialog extends React.Component {

    constructor(props) {
        super(props);
        this.defaultDetails = {
            active: "",
            color: "",
            images_collected: "0",
            last_command: "",
            deorbit_dt: ""
        };
        this.state = {
            show: this.props.show === true ? true : false,
            mode: this.props.mode ? this.props.mode : "add",   // "add", "change", or "na"
            details: this.props.detail ? this.props.detail : Object.assign({}, this.defaultDetails)
        };
        this.onChange = this.onChange.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    /**
     * Upon receiving props change, set the state according to the mode.
     */
    componentWillReceiveProps(newProps) {
        switch (newProps.mode) {
            case "add":
                this.setState({ show: true, mode: "add", details: Object.assign({}, this.defaultDetails) });
                break;
            case "change":
                this.setState({ show: true, mode: "change", details: Object.assign({}, newProps.details) });
                break;
            default:
                this.setState({ show: false, mode: "na", details: Object.assign({}, this.defaultDetails) });
                break;
        }
    }

    /**
     * The handler listening on changes from all input fields.  Each input fields has an attribute
     * name assigned matching to the property name of the dove details.  It extract the input value
     * and update the state.
     */
    onChange(ev) {
        let details = this.state.details;
        details[ev.target.name] = ev.target.value;
        this.setState({ show: this.state.show, mode: this.state.mode, details: details });
    }

    /**
     * The handler to the Add button from the dialog box.  It collects the input values about a new
     * dove, checks if all are valid, then passes it on to the doves service to save in the database.
     */
    onAdd() {
        if (this.isValid()) {
            let details = Object.assign({}, this.state.details);
            details.active = details.active === "true" ? true : false;
            details.images_collected = Number(details.images_collected);
            dovesService.postDove({ details: details, callback: (resp) => {
                this.setState({ show: false, mode: "na", details: Object.assign({}, this.defaultDetails) });
                this.props.onSubmit(resp);
            }});
        }
        // TODO should show the error
    }

    /**
     * The handler to the Update button from the dialog box.  It collects the input values about a modified
     * dove, checks if all are valid, then passes it on to the doves service to save in the database.
     */
    onUpdate() {
        if (this.isValid()) {
            let details = Object.assign({}, this.state.details);
            details.active = details.active === "true" ? true : false;
            details.images_collected = Number(details.images_collected);
            dovesService.putDove({ details: details, callback: (resp) => {
                this.setState({ show: false, mode: "na", details: Object.assign({}, this.defaultDetails) });
                this.props.onSubmit(resp);
            }});
        }
        // TODO should show the error
    }

    /**
     * The handler to the Delete button from the dialog box.  It passes on the dove id to the doves service
     * to be deleted from the database.
     */
    onDelete() {
        // TODO should prompt for a conformation before deleting it
        dovesService.deleteDove({ id: this.state.details.id, callback: (resp) => {
            this.setState({ show: false, mode: "na", details: Object.assign({}, this.defaultDetails) });
            this.props.onSubmit(resp);
        }});
    }

    /**
     * The handler to the Cancel button from the dialog box.  It cancels the dialog box session.
     */
    onCancel() {
        this.setState({ show: false, mode: "na", details: Object.assign({}, this.defaultDetails) });
    }

    /**
     * It validates the input fields from the dialog box returning a boolean whether all values are
     * valid.  It does a shellow validation.  A deeper validation is not performed, e.g. the month
     * value should be bweteen 1 and 12, and the hour value should be between 0 and 59.
     */
    isValid() {
        let details = this.state.details;
        if ((details.active === "true" || details.active === "false" ||
             details.active === true || details.active === false) &&
            details.color.length == 7 && /^#[0-9a-f]{6}$/i.test(details.color) &&
            ((Number.isInteger(details.images_collected) && details.images_collected >= 0) ||
             details.images_collected == "0" || /^[1-9][0-9]*$/g.test(details.images_collected)) &&
            /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(details.deorbit_dt)) {
            return true;
        }
        return false;
    }

    /**
     * It renders a modal dialog box.  A dark backdrop in the background overlaying the entire view
     * port.  The dialog box itself has a dark champagne background color.  The dialog box is laid
     * out in rows and columns.  Each row represents one input field having the label to the left
     * the the input field to the right.
     *
     * The action buttons are at the bottom.  For adding a new dove, the Cancel and Add buttons
     * would appear.  Otherwise, the Cancel, Delete, Update buttons are exposed for either changing
     * dove detail or for deleting.
     */
    render() {

        // if not show, then do not render the dialog box
        if (!this.state.show) {
            return null;
        }

        let details = this.state.details;
        return (
            <div className="p-modal">
                <div className="p-dialog">
                    { this.state.mode == "change" &&
                        <div className="dia-row">
                            <div className="dia-col-1">
                                <label>id:</label>
                            </div>
                            <div className="dia-col-2">
                                <input type="text" readOnly="readOnly" value={details.id ? details.id : ""}/>
                            </div>
                        </div>
                    }
                    <div className="dia-row">
                        <div className="dia-col-1">
                            <label>active:</label>
                        </div>
                        <div className="dia-col-2">
                            <input type="text" tabIndex="1" name="active"
                                   value={details.active}
                                   placeholder="true or false"
                                   onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="dia-row">
                        <div className="dia-col-1">
                            <label>color:</label>
                        </div>
                        <div className="dia-col-2">
                            <input type="text" tabIndex="2" name="color"
                                   value={details.color}
                                   placeholder="#xxxxxx"
                                   onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="dia-row">
                        <div className="dia-col-1">
                            <label>images_collected:</label>
                        </div>
                        <div className="dia-col-2">
                            <input type="text" tabIndex="3" name="images_collected"
                                   value={details.images_collected}
                                   onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="dia-row">
                        <div className="dia-col-1">
                            <label>last_command:</label>
                        </div>
                        <div className="dia-col-2">
                            <input type="text" tabIndex="4" name="last_command"
                                   value={details.last_command}
                                   onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="dia-row">
                        <div className="dia-col-1">
                            <label>deorbit_dt:</label>
                        </div>
                        <div className="dia-col-2">
                            <input type="text" tabIndex="5" name="deorbit_dt"
                                   value={details.deorbit_dt}
                                   placeholder="yyyy-mm-ddThh:mm:ssZ"
                                   onChange={this.onChange}/>
                        </div>
                    </div>
                    <div className="dia-row">
                        <div className="dia-footer">
                            { this.state.mode == "change" &&
                                <button onClick={this.onUpdate}>Update</button>
                            }
                            { this.state.mode == "change" ? (
                                <button onClick={this.onDelete}>Delete</button>
                            ) : (
                                <button onClick={this.onAdd}>Add</button>
                            )}
                            <button onClick={this.onCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>);
    }
}

export default DoveDialog;

