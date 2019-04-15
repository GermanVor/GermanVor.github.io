import _ from 'lodash';
import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class ListView extends Component {
    constructor(props){
        super(props);
        autoBind(this);
    }

    renderRowById(rowId) {
        return (
            <div key={rowId} className="cart">
                {this.renderRowThroughProps(rowId)}
            </div>
        );
    }

    renderRowThroughProps(rowId) {
        if (typeof this.props.renderRow === 'function') {
            return this.props.renderRow(rowId, _.get(this.props.rowsById, rowId));
        }
    }

    render() {
        return (<div>{_.map(this.props.rowsIdArray, this.renderRowById)}</div>)
    }

}