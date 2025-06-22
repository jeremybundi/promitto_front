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
import AddTerms from './components/LoanTermsForm';
import PublicView from './components/PublicMembers'
import HousesOngoingImages from './components/HousesOngoingImages'
import HousesDoneImages from './components/HousesDoneImages'
import HowToOwn from './components/HowToOwn';
import FileUpload from './components/FileUpload';
import FileDelete from './components/FileDelete';
import HouseDelete from './components/EditHouseDesigns';
import ManageLoans from './components/ManageLoanTerms';
import ManageBoardMembers from './components/ManageBoardMembers';
import AddBoard from './components/CreateBoardMember';
import ManageStaff from './components/ManageStaff';
import CreateStaff from './components/CreateStaff';
import CreateValue from './components/CoreValuesForm';
import ManageCoreValues from './components/ManageCoreValues';
import AddRegistrationRequirements from './components/AddRegistrationRequirements';
import ManageRegistrationDetails from './components/ManageRegistrationDetails';
import ManageTestimonials from './components/ManageTestimonials';
import AddTestimonials from './components/AddTestimonials';
import ManageWhyChooseUs from './components/ManageWhyChooseUs';
import AddChoose from './components/CreateWhyChooseUs';






// Define all your app routes here
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Dreams />} />  
      <Route path="/board-member/:memberId" element={<BoardMember />} /> 
      <Route path="/about-us" element={<AboutUs />} /> 
      <Route path="/how/to/own" element={<HowToOwn />} /> 
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
        path="/add-choose" 
        element={
          <PrivateRoute>
            <AddChoose/>
          </PrivateRoute>
        } 
      />
       <Route 
        path="/manage-choose" 
        element={
          <PrivateRoute>
            <ManageWhyChooseUs/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/add-testimonials" 
        element={
          <PrivateRoute>
            <AddTestimonials/>
          </PrivateRoute>
        } 
      />
        <Route 
        path="/manage-testimonials" 
        element={
          <PrivateRoute>
            <ManageTestimonials/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/manage/registration-requirements" 
        element={
          <PrivateRoute>
            <ManageRegistrationDetails/>
          </PrivateRoute>
        } 
      />
       <Route 
        path="/add/registration-details" 
        element={
          <PrivateRoute>
            <AddRegistrationRequirements/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/manage/core" 
        element={
          <PrivateRoute>
            <ManageCoreValues/>
          </PrivateRoute>
        } 
      />
      <Route 
        path="/create-value" 
        element={
          <PrivateRoute>
            <CreateValue/>
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/manage/staff" 
        element={
          <PrivateRoute>
            <ManageStaff/>
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/add/staff" 
        element={
          <PrivateRoute>
            <CreateStaff/>
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/manage/board-member" 
        element={
          <PrivateRoute>
            <ManageBoardMembers/>
          </PrivateRoute>
        } 
      /> 
       <Route 
        path="/add/board-member" 
        element={
          <PrivateRoute>
            <AddBoard/>
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/manage/loans" 
        element={
          <PrivateRoute>
            <ManageLoans/>
          </PrivateRoute>
        } 
      />  
      <Route 
        path="/delete/house" 
        element={
          <PrivateRoute>
            <HouseDelete/>
          </PrivateRoute>
        } 
      />    
          <Route 
        path="/upload/file" 
        element={
          <PrivateRoute>
            <FileUpload />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/delete/file" 
        element={
          <PrivateRoute>
            <FileDelete />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/add/design" 
        element={
          <PrivateRoute>
            <AddDesign />
          </PrivateRoute>
        } 
      /> 
      <Route 
        path="/Add/loans" 
        element={
          <PrivateRoute>
            <AddTerms />
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
