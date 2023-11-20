import { Route, Routes } from "react-router-dom";
import LandingLayOut from "./layouts/LandingLayOut";
import QuizLayOut from "./layouts/QuizLayOut";
import LandingPage from "./pages/LandingPage";
import Team from "./pages/Team";
import Info from "./pages/Info";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route element={<LandingLayOut />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/team" element={<Team />} />
        <Route path="/result/:uuid" element={<Result />} />
      </Route>
      <Route element={<QuizLayOut />}>
        <Route path="/info" element={<Info />} />
        <Route path="/quiz" element={<Info />} />
      </Route>
    </Routes>
  );
}

export default App;
