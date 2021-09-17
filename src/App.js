import logo from './logo.svg';
import './App.css';
import SearchField from "react-search-field";
import axios from 'axios';
import Search from './search';
import Slide1 from './Slide1.js';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <div>
			</div>
      </header>
      <div className='contentcard'>
				<Search/>
      </div>
    </div>
  
  );
}

export default App;
