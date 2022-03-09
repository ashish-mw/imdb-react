import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// all component
import Loading from "./components/Loading";

// all pages
import HomePage from "./pages/HomePage";
const AddNewMoviePage = lazy(() => import("./pages/AddNewMoviePage"));
// import AddNewMoviePage from "./pages/AddNewMoviePage";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<AddNewMoviePage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
