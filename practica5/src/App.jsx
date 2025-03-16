// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router';
import { IndexPage } from './pages/IndexPage';
import { FavoritePage } from './pages/FavoritePage';
import Layout from './layout/Layout';
import Notifications from './components/Notifications'; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<IndexPage />} />
          <Route path='/favoritos' element={<FavoritePage />} />
        </Route>
      </Routes>
      <Notifications /> {/* Usa el componente Notifications */}
    </BrowserRouter>
  );
};

export default App;