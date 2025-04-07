import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./utils/UserContext.jsx"
import { SpellsProvider } from './utils/SpellContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <SpellsProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </SpellsProvider>
  </BrowserRouter>,
)
