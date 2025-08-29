import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { TeamProvider } from './contexts/TeamContext';
import './index.css';


createRoot(document.getElementById('root')).render(
<React.StrictMode>
<TeamProvider>
<App />
</TeamProvider>
</React.StrictMode>
);