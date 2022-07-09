import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from 'pages/HomePage';
import { ReviewPage } from 'pages/ReviewPage';
import { WordListPage } from "pages/WordListPage";
import { ToastContainer } from 'react-toastify';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route index={true} element={<Navigate to="/en" replace />} />
        <Route path=':langCode'>
          <Route index={true} element={<HomePage />} />
          <Route path='review' element={<ReviewPage />} />
          <Route path='word-list' element={<WordListPage />} />
        </Route>
        <Route path='*' element={<Navigate to="/en" replace />} />
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
        textAlign: 'right',
        top: 0,
        right: 0,
        fontSize: '11px',
        margin: '15px'
      }}>
        Last update: <Moment format="YYYY-MM-DD">{process.env.REACT_APP_LASTUPDATE}</Moment> (<Moment fromNow>{process.env.REACT_APP_LASTUPDATE}</Moment>)
        <br/>
        <a style={{textDecoration: 'underline'}} href="https://github.com/Paphos/LearnVocabularyApp">Source code</a>
      </div>
    </div>
  )
}
