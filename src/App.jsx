import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from 'pages/HomePage';
import { ReviewPage } from 'pages/ReviewPage';
import { ToastContainer } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route index={true} element={<HomePage />} />
        <Route path='/review' element={<ReviewPage />} />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

function Header(){
  return(
    <div style={{ position: 'relative', height: '60px' }}>
      <Link to="/" style={{ 
        margin: '10px',
        padding: '5px 15px',
        border: '1px #222 solid',
        borderRadius: '5px',
        position: 'absolute',
        top: 0,
        left: 0}}
      >
        <HomeIcon style={{fontSize: '25px', transform: 'translateY(2px)'}}></HomeIcon>
      </Link>
      <div style={{ 
        position: 'absolute',
        top: 0,
        right: 0,
        fontSize: '11px',
        margin: '15px'
      }}>
        Last update: {process.env.REACT_APP_LASTUPDATE}
      </div>
    </div>
  )
}
