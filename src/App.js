//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import { ScreenSpace } from '@react-three/drei';
import { useState } from 'react';
import './App.css';
import SelectionScene from './scenes/SelectionScene/SelectionScene';

const Scenes = {
  IntroScene: 0,
  SelectionScene: 1,
  MemoryCardSelectionScene: 2,
  ObjectSelectionScene: 3
}

const App = () => {
  const [currScene, setCurrScene] = useState(Scenes.SelectionScene);

  return (
    <div className="App">
      {(() => {
        switch (currScene) {
          case Scenes.IntroScene:
            break;
          case Scenes.SelectionScene: 
            return <SelectionScene nextScene={() => setCurrScene(Scenes.MemoryCardSelectionScene)}></SelectionScene>
            break;
          case Scenes.MemoryCardSelectionScene: return <h1>Memory Card selection</h1>
            break;
          case ScreenSpace.ObjectSelectionScene:
            break;
          default: <h1>Uh oh someething broke</h1>
        }
      })()}
    </div>
  );
};

export default App;
