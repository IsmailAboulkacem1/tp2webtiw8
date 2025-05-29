// src/main.tsx

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'           // ← IMPORT
import App from './App'
import { store } from './store'                 // ← IMPORT

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <BrowserRouter>  {/* ← active le routage côté client pour manipuler les URLs. */} 
    <Provider store={store}>        {/* ← met le store Redux à disposition de toute l’arborescence React via Context */}
      <App />
    </Provider>
  </BrowserRouter>
)
