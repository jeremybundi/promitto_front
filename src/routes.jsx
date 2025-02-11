import { Routes, Route } from 'react-router-dom';
import Dreams from './components/ChooseDreamHome'; 
import BoardMember from './components/BoardMember';
import AboutUs from './components/AboutUs';
import WelcomeMember from './components/WelcomeMember';
import Register from './components/Register';
import CardColor from './components/CardColor';
import Review from './components/Review';
import EmploymentDetails from './components/EmploymentDetails';
import BusinessDetails from './components/BusinessDetails';
import Login from './components/Login';
import ViewMembers from './components/ViewMembers';
import PrivateRoute from './components/PrivateRoute'; 
import AdminDashboard from './components/AdminDashboard';
import AddHouseDone from './components/AddHouseDone';
import AddOngoingHouse from './components/AddOngoingHouse';
import DeleteHousesDone from './components/DeleteHousesDone';
import DeleteHousesOngoing from './components/DeleteOngoing';
import AddUser from './components/AddUser';
import AddDesign from './components/HouseDesignCreate';
import AddDesigned from './components/HouseDesignForm';
import UserTable from './components/UserTable';
import PublicView from './components/PublicMembers'
import HousesOngoingImages from './components/HousesOngoingImages'
import HousesDoneImages from './components/HousesDoneImages'


// Define all your app routes here
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Dreams />} />  
      <Route path="/board-member/:memberId" element={<BoardMember />} /> 
      <Route path="/aboutus" element={<AboutUs />} /> 
      <Route path="/welcome" element={<WelcomeMember />} /> 
      <Route path="/register" element={<Register />} /> 
      <Route path="/color" element={<CardColor />} />  
      <Route path="/review" element={<Review />} /> 
      <Route path="/employ" element={<EmploymentDetails />} />  
      <Route path="/business" element={<BusinessDetails />} /> 
      <Route path="/login" element={<Login />} />  
      <Route path="/view/ongoing/:id" element={<HousesOngoingImages/>} />
      <Route path="/view/done/:id" element={<HousesDoneImages/>} />




      {/* Protected routes */}
      <Route 
        path="/add/design" 
        element={
          <PrivateRoute>
            <AddDesign />
          </PrivateRoute>
        } 
      /> 
       <Route 
        path="/add/designed" 
        element={
          <PrivateRoute>
            <AddDesigned />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/house/done" 
        element={
          <PrivateRoute>
            <AddHouseDone />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/house/ongoing" 
        element={
          <PrivateRoute>
            <AddOngoingHouse />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/delete/done" 
        element={
          <PrivateRoute>
            <DeleteHousesDone />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/delete/ongoing" 
        element={
          <PrivateRoute>
            <DeleteHousesOngoing />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/add/user" 
        element={
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/user/data" 
        element={
          <PrivateRoute>
            <UserTable />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/admin" 
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/public/view" 
        element={
          <PrivateRoute>
            <PublicView />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/view/members" 
        element={
          <PrivateRoute>
            <ViewMembers />
          </PrivateRoute>
        } 
      /> 
    </Routes>
  );
};

export default AppRoutes;
