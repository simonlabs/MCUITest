/**
 * DoveDetails module
 * It represents one dove taking up one row of space on the page.
 */
import React from "react";
 
class DoveDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = { details: this.props.details };
        this.onClick = this.onClick.bind(this);
    }

    /**
     * Upon receiving new props, which is a dove details, then update the state.
     */
    componentWillReceiveProps(newProps) {
        this.setState(Object.assign(this.state, newProps));
    }

    /**
     * The handler listening on the click to the row.  Upon receiving a click event, it notifies
     * the components upward on the hierarchy and passes along the dove details object.
     */
    onClick() {
        this.props.onViewDetails(Object.assign({}, this.state.details));
    }

    /**
     * It renders one row representing one dove details.  Each dove property is represented in
     * a grid laid out from left to right based on the bootstrap grids system.  Each property
     * is shown the name of the property and the value of that property delimited by a ":".
     * It complies to the responsive design pattern that on devices with narrow width, these
     * grids will flow top-down.  Having the property name in each grid, it is still usable
     * on such devices.
     */
    render() {
        let details = this.state.details;
        return (<div className="row dove-row" onClick={this.onClick}>
            <div className="col-sm-1">id: {details.id}</div>
            <div className="col-sm-1">active: {String(details.active)}</div>
            <div className="col-sm-1">color: {details.color}</div>
            <div className="col-sm-1">images: {details.images_collected}</div>
            <div className="col-sm-4">last command: {details.last_command}</div>
            <div className="col-sm-4">deorbit date-time: {(new Date(details.deorbit_dt)).toUTCString()}</div>
        </div>);
    }
}

export default DoveDetails;

