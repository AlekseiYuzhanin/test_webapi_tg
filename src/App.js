import './App.css';
import {useTelegram} from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";

function App() {
    const {onToggleButton} = useTelegram();


  return (
    <div className="App">
        <Header></Header>
        <Button onClick={onToggleButton}>toggle</Button>
    </div>
  );
}

export default App;
