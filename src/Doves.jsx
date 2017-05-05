/**
 * Doves module
 * It represents a collection of dove details.
 */
import React from "react";
import dovesService from "./DovesService";
import DoveDetails from "./DoveDetails.jsx";
 
class Doves extends React.Component {

    constructor(props) {
        super(props);
        this.state = { doves: [], filter: this.props.filter };
        this.queryState = "Loading";
    }

    /**
     * Upon mounting to the DOM tree, it fetches doves details from the backend via the doves service.
     */
    componentDidMount() {
        this.getDoves();
    }

    /**
     * Upon receiving new props, update the state, and re-fetches the doves details from the backend
     * via the doves service.
     */
    componentWillReceiveProps(newProps) {
        this.setState(Object.assign(this.state, newProps));
        this.getDoves();
    }

    /**
     * It invokes a GET request using the doves service to fetch the doves details from the backend.
     */
    getDoves() {
        dovesService.getDoves({
            callback: (doves) => {
                if (doves.length == 0) {
                    this.queryState = "Not Found";
                } else {
                    this.queryState = "Loading";
                }
                this.setState({ doves: doves });
            },
            filter: this.state.filter
        });
    }

    /**
     * It renders rows of doves details representing what is returned from the backend. If no doves
     * were returned, no row is rendered.
     */
    render() {
        let doves;
        if (this.state.doves.length > 0) {
            doves = this.state.doves.map((item, i, arr) => {
                return <DoveDetails key={item.id} details={item} onViewDetails={this.props.onViewDetails}/>;
            });

            return (<div>
                <div className="doves-list">{ doves }</div>
            </div>);
        }
        return <div>{this.queryState}</div>;
    }
}

export default Doves;

