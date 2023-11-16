import { Error, Register, Landing, ProtectedRoute } from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Stats,
  AddJob,
  SharedLayout,
  Profile,
  AllJobs,
} from "./pages/Dashboard/index.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* nested pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index path="stats" element={<Stats />} /> 
          <Route path="all-jobs" element={<AllJobs />} />
          <Route path="add-job" element={<AddJob />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes> 
    </BrowserRouter>
  );
}

export default App;
