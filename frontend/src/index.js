import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import "./index.css"
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext';
import Curso from './pages/Curso';
import Estadisticas from './pages/Estadisticas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/curso/:id' element={<Curso/>}/>
        <Route path='/estadistica/' element={<Estadisticas/>}/>
      </Routes>
    </BrowserRouter>
  </UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
