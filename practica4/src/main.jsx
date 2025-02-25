import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import BudgetForm from './components/BudgetForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <BudgetForm></BudgetForm>
  </StrictMode>,
)
