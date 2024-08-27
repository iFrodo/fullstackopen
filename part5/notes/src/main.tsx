import ReactDOM from 'react-dom/client'
import App from './App'
import './css/style.css'



    const root = document.getElementById('root');
    if (root) {
      const appRoot = ReactDOM.createRoot(root);
      appRoot.render(<App  />);
    } else {
      console.error('Root element not found.');
    }
  
