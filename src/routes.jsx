import { Routes, Route } from 'react-router-dom';
import Dreams from './components/ChooseDreamHome'; // Import your ChooseDreamHome component
import BoardMembers from './components/BoardMembers';
import WelcomeMember from './components/WelcomeMember';
import Register from './components/Register';
import CardColor from './components/CardColor';
import Review from './components/Review';

// Define all your app routes here
const AppRoutes = () => {
  return (
    <Routes>
      {/* Define your app routes below */}
      <Route path="/" element={<Dreams />} />  {/* Dreams route */}
      <Route path="/boardmembers" element={<BoardMembers />} />  {/* Dreams route */}
      <Route path="/welcome" element={<WelcomeMember />} />  {/* Dreams route */}
      <Route path="/register" element={<Register />} />  {/* Dreams route */}
      <Route path="/color" element={<CardColor />} />  {/* Dreams route */}
      <Route path="/review" element={<Review />} />  {/* Dreams route */}





      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
