import { useState } from 'react';
import AboutMeScene from './scenes/AboutMeScene/AboutMeScene';
import ExplainerScene from './scenes/ExplainerScene/ExplainerScene';
import IntroScene from './scenes/IntroScene/IntroScene';
import MemoryCardSelectionScreen from './scenes/MemoryCardSelectionScene/MemoryCardSelectionScene';
import SelectionScene from './scenes/SelectionScene/SelectionScene';
import './App.css';

export const Scenes = {
  ExplainerScene: 0,
  IntroScene: 1,
  SelectionScene: 2,
  MemoryCardSelectionScene: 3,
  AboutMeScene: 4
}

const App = () => {
  const [currScene, setCurrScene] = useState(Scenes.AboutMeScene);

  return (
    <div className="App">
      {(() => {
        switch (currScene) {
          case Scenes.ExplainerScene:
            return <ExplainerScene nextScene={() => setCurrScene(Scenes.IntroScene)} />
          case Scenes.IntroScene:
            return <IntroScene nextScene={() => setCurrScene(Scenes.SelectionScene)} />
          case Scenes.SelectionScene:
            return <SelectionScene nextScene={(scene) => setCurrScene(scene)} />
            case Scenes.AboutMeScene:
              return <AboutMeScene prevScene={() => setCurrScene(Scenes.SelectionScene)} />
          case Scenes.MemoryCardSelectionScene:
            return <MemoryCardSelectionScreen prevScene={() => setCurrScene(Scenes.SelectionScene)}/>
          default: <h1>Uh oh someething broke</h1>
        }
      })()}
    </div>
  );
};

export default App;
