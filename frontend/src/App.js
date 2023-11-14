import './css/App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Student from './pages/Student';
import AdminControl from './pages/AdminControl';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/> } />
        <Route path='/admin' element={<Admin />}  />
        <Route path='/student' element={<Student/>} />
        <Route path='/admin/panel' element={<AdminControl />} />
      </Routes>
    </Router>
    
  );
}

export default App;
