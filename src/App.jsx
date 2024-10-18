import Navbar from './components/NavBar';
import Footer from './components/Footer'
import AppRoutes from './routes'; // Import your routes

function App() {
  return (
    <>
    <div className='bg-white w-full'>
      <Navbar/>
      <AppRoutes /> {/* Render the routes below the Navbar */}
      <Footer/>
      </div>
    </>
  );
}

export default App;
