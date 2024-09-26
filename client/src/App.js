import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import Redirect from "./pages/Redirect";
import Error from "./pages/Error";
import store from './app/store'
import { Provider } from 'react-redux'
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./pages/Dashboard";
import UrlsDashboard from "./pages/UrlsDashboard";
import Url from "./pages/Url";
function App() {
  return (
    <Provider store={store}>
      <Router className="relative">
        <Navbar />
        <Routes>
          <Route path='/' element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          <Route path="/dashboard" element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          } />
          <Route path="/dashboard/urls" element={
            <RequireAuth>
              <UrlsDashboard />
            </RequireAuth>
          } />

          <Route path="/url/:urlId" element={
            <RequireAuth>
              <Url />
            </RequireAuth>
          } />
          <Route path='/:id' element={<Redirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path='*' element={<Error />} />

        </Routes>
        <Footer />

      </Router>
    </Provider>
  );
}

export default App;

