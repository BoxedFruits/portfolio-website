//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import { useState } from 'react';
import './App.css';
import MemoryCardSelectionScreen from './scenes/MemoryCardSelectionScene/MemoryCardSelectionScene';
import SelectionScene from './scenes/SelectionScene/SelectionScene';

const Scenes = {
  IntroScene: 0,
  SelectionScene: 1,
  MemoryCardSelectionScene: 2
}

const App = () => {
  const [currScene, setCurrScene] = useState(Scenes.MemoryCardSelectionScene);

  return (
    <div className="App">
      {(() => {
        switch (currScene) {
          case Scenes.IntroScene:
            break;
          case Scenes.SelectionScene: 
            return <SelectionScene nextScene={() => setCurrScene(Scenes.MemoryCardSelectionScene)} />
          case Scenes.MemoryCardSelectionScene: 
            // Needs to also load data when chosing a memory card but doesn't need another component/scene
            return <MemoryCardSelectionScreen />
          default: <h1>Uh oh someething broke</h1>
        }
      })()}
    </div>
  );
};

export default App;
