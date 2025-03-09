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
import ClassSpells from './pages/ClassSpells.jsx';
import InsertSpellCopyPaste from "./pages/InsertSpellCopyPaste.jsx"
import Navbar from './components/Navbar.jsx';

export default function App() {


  return (
    <>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spell/:id" element={<SpellDetails />} />
          <Route path="/class/:className" element={<ClassSpells />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboardSpells" element={<DashboardSpells />} />
          <Route path="/testInsert" element={<InsertSpellCopyPaste />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

