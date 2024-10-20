import Navbar from './components/NavBar';
import Footer from './components/Footer'
import AppRoutes from './routes'; // Import your routes

function App() {
  return (
    <>
    <div className='bg-white min-h-screen w-full overflow-x-hidden relative font-lufga"]'>
      <Navbar/>
      <AppRoutes /> {/* Render the routes below the Navbar */}
      <Footer/>
      </div>
    </>
  );
}

export default App;
