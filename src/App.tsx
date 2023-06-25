import { Card } from "./components/card/index";
import logo from "./assets/logo.svg";

import "./app.css";

function App() {
  return (
    <>
      <div className="container">
        <a href="https://www.appmasters.io/pt">
          <img src={logo} alt="Logo app masters" />
        </a>

        <input type="text" placeholder="Pesquisar jogos..." />
      </div>
      <div className="container">
        <Card />
      </div>
    </>
  );
}

export default App;
