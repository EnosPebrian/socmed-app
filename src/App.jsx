import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
      <Routes>
        {routes.map((page, index) => (
          <Route {...page} key={index} />
        ))}
      </Routes>
    </>
  );
}

export default App;
