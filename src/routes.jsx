import { Routes, Route } from 'react-router-dom';
import Dreams from './components/ChooseDreamHome'; // Import your ChooseDreamHome component
import BoardMembers from './components/BoardMembers';
import WelcomeMember from './components/WelcomeMember';
import Register from './components/Register';
import CardColor from './components/CardColor';
import Review from './components/Review';
import EmploymentDetails from './components/EmploymentDetails';
import BusinessDetails from './components/BusinessDetails';
import Login from './components/Login';
import ViewMembers from './components/ViewMembers';
import PrivateRoute from './components/PrivateRoute'; // Import your PrivateRoute component

// Define all your app routes here
const AppRoutes = () => {
  return (
    <Routes>
      {/* Define your app routes below */}
      <Route path="/" element={<Dreams />} />  
      <Route path="/boardmembers" element={<BoardMembers />} /> 
      <Route path="/welcome" element={<WelcomeMember />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/color" element={<CardColor />} />  
      <Route path="/review" element={<Review />} /> 
      <Route path="/employ" element={<EmploymentDetails />} />  
      <Route path="/business" element={<BusinessDetails />} /> 
      
      {/* Public login route accessible to everyone */}
      <Route path="/login" element={<Login />} />  
      
      {/* Protected view members route, accessible only when logged in */}
      <Route 
        path="/view/members" 
        element={
          <PrivateRoute>
            <ViewMembers />
          </PrivateRoute>
        } 
      /> 
      
      {/* Add more private routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
