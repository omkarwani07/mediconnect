import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './components/Home';
import Header from './components/Header/Header';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Feed from './components/Feed';
import Create from './components/Create';
import AppContext from './Context';
import Profile from './components/Profile/Profile';
import EditProfile from './components/Profile/EditProfile';
import AddEducation from './components/Profile/AddEducation';
import AddCertificate from './components/Profile/AddCertificate';
import AddExperience from './components/Profile/AddExperience';
import Jobs from './components/Jobs/Jobs';
import Connection from './components/Connection/Connection';

function App() {
    return (
        <BrowserRouter>
            <AppContext>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                    <Route path='/post/create/:username' element={<Create/>}/>
                    <Route path='/profile/:username' element={<Profile/>}/>
                    <Route path='/edit/:username' element={<EditProfile/>}/>
                    <Route path='/education/:username' element={<AddEducation/>}/>
                    <Route path='/experience/:username' element={<AddExperience/>}/>
                    <Route path='/certificate/:username' element={<AddCertificate/>}/>
                    <Route path='/jobs' element={<Jobs/>}/>
                    <Route path='/connection/:username' element={<Connection/>}/>
                </Routes>
            </AppContext>
        </BrowserRouter>
    );
}

export default App;
