import './App.css';
import {useEffect} from "react";
import {useTelegram} from "../hooks/useTelegram";
import Button from "../components/Button/Button";

function App() {
    const {tg,onToggleButton} = useTelegram();
    useEffect(() => {
        tg.close();
    },[])

  return (
    <div className="App">
        <Button onClick={onToggleButton()}>toggle</Button>
    </div>
  );
}

export default App;
