
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

// Désactivation temporaire du service worker
// Si vous avez besoin de réactiver le service worker plus tard,
// vous pouvez décommenter le code ci-dessous

/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/serviceWorker.js')
      .then(registration => {
        console.log('ServiceWorker registered successfully');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}
*/
