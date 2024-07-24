import './App.css';
import Crux from './Components/Crux';
import { AppContext } from './Components/Context';
import useAppData from './Components/Context/hooks'

function App() {

  const appData = useAppData()
  
  return (
    <AppContext.Provider value={appData}>
        <div className="App">
          <Crux/>
        </div>
    </AppContext.Provider>
  );
}

export default App;
