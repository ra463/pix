import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
