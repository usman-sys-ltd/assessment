import { Routes, Route, Navigate } from 'react-router-dom';
import Listings from './containers/universities/Listings/Listings';
import Details from './containers/universities/Details/Details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/universities" replace />} />
      <Route path="/universities">
        <Route index element={<Listings />} />
        <Route path=":id" element={<Details />} />
      </Route>
    </Routes>
  );
}

export default App;
