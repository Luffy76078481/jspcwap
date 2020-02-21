import React, {Component} from 'react';
import {FuckTime} from '../DateTime/fuckTime'

class MyDatePicker extends Component {
    getValue() {
      return this.refs.date.getValue();
    }
    render() {
        return <FuckTime ref="date" minDay={15} maxDay={15}/>
    }

}
export default MyDatePicker;
