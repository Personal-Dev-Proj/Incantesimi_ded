import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from './pages/Register.jsx';
import DashboardSpells from "./pages/DashboardSpells.jsx";
import SpellDetails from './pages/SpellDetail.jsx';
import Footer from './components/Footer.jsx';

function App() {


  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<SpellDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboardSpells" element={<DashboardSpells />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
