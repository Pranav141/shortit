import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Count from "./pages/Count";
import Redirect from "./pages/Redirect";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/count' element={<Count/>}/>
        <Route path='/:id' element={<Redirect />}/>
        <Route path='*' element={<Error/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
