import "./App.scss";
import { Routes, Route, HashRouter } from "react-router-dom";
import NavBar from "./components/navbar";
import ChooseSalad from "./pages/choose-salad";
import CreateSalad from "./pages/create-salad";
import WelcomePage from "./pages/welcome-page";
import Basket from "./pages/basket";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="choose-salad" element={<ChooseSalad />} />
          <Route path="create-salad" element={<CreateSalad />} />
          <Route path="basket" element={<Basket />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
