import { Routes, Route } from 'react-router-dom';
import Dreams from './components/ChooseDreamHome'; // Import your ChooseDreamHome component
import BoardMembers from './components/BoardMembers';

// Define all your app routes here
const AppRoutes = () => {
  return (
    <Routes>
      {/* Define your app routes below */}
      <Route path="/dreams" element={<Dreams />} />  {/* Dreams route */}
      <Route path="/boardmembers" element={<BoardMembers />} />  {/* Dreams route */}

      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
