import ManagementPage from './pages/ManagementPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ManagementPage />
      <ToastContainer />
    </>
  );
}

export default App;
