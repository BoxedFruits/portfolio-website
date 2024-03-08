import { createContext, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import AboutMeScene from './scenes/AboutMeScene/AboutMeScene';
import ExplainerScene from './scenes/ExplainerScene/ExplainerScene';
import IntroScene from './scenes/IntroScene/IntroScene';
import MemoryCardSelectionScreen from './scenes/MemoryCardSelectionScene/MemoryCardSelectionScene';
import SelectionScene from './scenes/SelectionScene/SelectionScene';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

export const Scenes = {
  ExplainerScene: 0,
  IntroScene: 1,
  SelectionScene: 2,
  MemoryCardSelectionScene: 3,
  AboutMeScene: 4
};

export const EnableSoundContext = createContext();

const App = () => {
  const [currScene, setCurrScene] = useState(Scenes.ExplainerScene);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <>
      <Analytics />
      <BrowserView>
        <div className="App">
          <EnableSoundContext.Provider value={{ isMuted: isMuted, setIsMuted: setIsMuted }}>
            {(() => {
              switch (currScene) {
                case Scenes.ExplainerScene:
                  return <ExplainerScene nextScene={() => setCurrScene(Scenes.IntroScene)} />;
                case Scenes.IntroScene:
                  return <IntroScene nextScene={() => setCurrScene(Scenes.SelectionScene)} />;
                case Scenes.SelectionScene:
                  return <SelectionScene nextScene={(scene) => setCurrScene(scene)} />;
                case Scenes.AboutMeScene:
                  return <AboutMeScene prevScene={() => setCurrScene(Scenes.SelectionScene)} />;
                case Scenes.MemoryCardSelectionScene:
                  return <MemoryCardSelectionScreen prevScene={() => setCurrScene(Scenes.SelectionScene)} />;
                default: <h1>Uh oh someething broke</h1>;
              }
            })()}
          </EnableSoundContext.Provider>
        </div>
      </BrowserView>
      <MobileView>
        <div>
          <center>
            <div>
              <h1 style={{ color: "white" }}>Please use a PC to view this website.</h1>
            </div>
          </center>
        </div>
      </MobileView>
    </>
  );
};

export default App;
