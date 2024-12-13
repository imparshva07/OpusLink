import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/UserContext.jsx'; // Import UserProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> 
      <App />
    </UserProvider> 
  </StrictMode>
);
