//AppJS will hold state and determine what gets rendered
//Make sure to have ability to go back and forth scenes

import { useState } from 'react';
import './App.css';
import ExplainerScene from './scenes/ExplainerScene/ExplainerScene';
import IntroScene from './scenes/IntroScene/IntroScene';
import MemoryCardSelectionScreen from './scenes/MemoryCardSelectionScene/MemoryCardSelectionScene';
import SelectionScene from './scenes/SelectionScene/SelectionScene';

const Scenes = {
  ExplainerScene: 0,
  IntroScene: 1,
  SelectionScene: 2,
  MemoryCardSelectionScene: 3
}

const App = () => {
  const [currScene, setCurrScene] = useState(Scenes.ExplainerScene);

  return (
    <div className="App">
      {(() => {
        switch (currScene) {
          case Scenes.ExplainerScene:
            return <ExplainerScene nextScene={() => setCurrScene(Scenes.IntroScene)} />
          case Scenes.IntroScene:
            return <IntroScene nextScene={() => setCurrScene(Scenes.SelectionScene)} />
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
