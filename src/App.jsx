import "./App.css";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  return (
    <>
      <Routes>
        {routes.map((page) => (
          <Route {...page} />
        ))}
      </Routes>
    </>
  );
}

export default App;
