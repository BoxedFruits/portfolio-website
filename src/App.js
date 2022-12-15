//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import './App.css';
import SelectionScene from './scenes/SelectionScene/SelectionScene';

function App() {
  return (
    <div className="App">
      <SelectionScene />
    </div>
  );
};

export default App;
