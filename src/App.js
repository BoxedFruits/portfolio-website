//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import { ScreenSpace } from '@react-three/drei';
import { useState } from 'react';
import './App.css';
import SelectionScene from './scenes/SelectionScene/SelectionScene';

const Scenes = {
  IntroScene: 'IntroScene',
  SelectionScene: 1,
  MemoryCardSelectionScene: 2,
  ObjectSelectionScene: 3
}

function App() {
  const [currScene, setCurrScene] = useState(Scenes.IntroScene);

  return (
    <div className="App">
      <SelectionScene />
      {(() => {
        switch (currScene) {
          case Scenes.IntroScene:
          case Scenes.SelectionScene: <SelectionScene />
          case Scenes.MemoryCardSelectionScene:
          case ScreenSpace.ObjectSelectionScene:
        }
      })()}
    </div>
  );
};

export default App;
