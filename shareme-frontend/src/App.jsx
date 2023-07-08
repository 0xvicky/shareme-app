import './App.css';
import {Routes, Route, useNavigate} from "react-router-dom"
import { Home,SignIn } from './container';

function App() {
  return (
  <>
  <Routes>
  <Route path="signin" element={<SignIn/>} />
  <Route path="/*" element={<Home/>} />
  </Routes>
  </>
  );
}

export default App;
