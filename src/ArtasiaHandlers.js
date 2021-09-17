import React, {Component} from 'react';
import { RevSlider } from 'react-rev-slider';
import SearchField from 'react-search-field'
import axios from 'axios';

export default class ArtasiaHandler extends Component {


    
render() {
    const element = (<div>Text from Element</div>)
    return (<div className="comptext">
    <h3>Artasia</h3>

        {this.props.displaytext}
        {element}
    </div>)
   
}

}

