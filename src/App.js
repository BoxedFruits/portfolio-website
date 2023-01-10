//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import { useState } from 'react';
import './App.css';
import IntroScene from './scenes/IntroScene/IntroScene';
import MemoryCardSelectionScreen from './scenes/MemoryCardSelectionScene/MemoryCardSelectionScene';
import SelectionScene from './scenes/SelectionScene/SelectionScene';

const Scenes = {
  IntroScene: 0,
  SelectionScene: 1,
  MemoryCardSelectionScene: 2
}

const App = () => {
  const [currScene, setCurrScene] = useState(Scenes.IntroScene);

  return (
    <div className="App">
      {(() => {
        switch (currScene) {
          case Scenes.IntroScene:
            return <IntroScene nextScene={() => setCurrScene(Scenes.SelectionScene)}/>
          case Scenes.SelectionScene: 
            return <SelectionScene nextScene={() => setCurrScene(Scenes.MemoryCardSelectionScene)} />
          case Scenes.MemoryCardSelectionScene: 
            return <MemoryCardSelectionScreen />
          default: <h1>Uh oh someething broke</h1>
        }
      })()}
    </div>
  );
};

export default App;
