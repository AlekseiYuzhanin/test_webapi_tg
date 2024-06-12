import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import {useEffect} from "react";

function App() {
    const {tg,onToggleButton} = useTelegram();

    useEffect(() => {
        tg.ready();
    },[tg]);
  return (
    <div className="App">
        <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
