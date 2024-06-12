import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import ProductsList from "./components/ProductsList/ProductsList";
import Form from "./components/Form/Form";


function App() {

  return (
    <div className="App">
        <Header></Header>
        <Routes>
            <Route index element={<ProductsList/>}></Route>
            <Route path={'form'} element={<Form/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
