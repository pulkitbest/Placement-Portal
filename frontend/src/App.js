import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import UserDashboardScreen from './screens/UserDashboardScreen'
import RecruiterDashboardScreen from './screens/RecruiterDashboardScreen'
import LoginScreen from './screens/LoginScreen'
import LoginUserScreen from './screens/LoginUserScreen'
import LoginRecruiterScreen from './screens/LoginRecruiterScreen'
import UserRegisterScreen from './screens/UserRegisterScreen'
import UserVerificationScreen from './screens/UserVerificationScreen'
import RecruiterRegisterScreen from './screens/RecruiterRegisterScreen'
import RecruiterVerificationScreen from './screens/RecruiterVerificationScreen'
import UserProfileScreen from './screens/UserProfileScreen'
import UserUpdateScreen from './screens/UserUpdateScreen'
import RecruiterProfileScreen from './screens/RecruiterProfileScreen'
import RecruiterUpdateScreen from './screens/RecruiterUpdateScreen'
import UserListScreen from './screens/UserListScreen'
import RecruiterListScreen from './screens/RecruiterListScreen'
import UserEditScreen from './screens/UserEditScreen'
import RecruiterEditScreen from './screens/RecruiterEditScreen'
import CvScreen from './screens/CvScreen'
import JobOpeningScreen from './screens/JobOpeningScreen'
import JobOpeningCreateScreen from './screens/JobOpeningCreateScreen'
import JobOpeningUpdateScreen from './screens/JobOpeningUpdateScreen'
import UserApplicationListScreen from './screens/UserApplicationListScreen'
import ApplicationScreen from './screens/ApplicationScreen'
import ApplicantScreen from './screens/ApplicantScreen'

const App = () => {
  return (
    <Router>
      <Header/>
      <main className='py-3'>
        <Container>
          {/*Job Opening Routes */}
          <Route path='/createJobOpening' component={JobOpeningCreateScreen}/>
          <Route path='/updateJobOpening/:id' component={JobOpeningUpdateScreen} exact/>
          <Route path='/jobOpening/:id' component={JobOpeningScreen} exact/>

          {/*Login Routes */}
          <Route path='/login' component={LoginScreen} exact/>
          <Route path='/student/login' component={LoginUserScreen}/>
          <Route path='/recruiter/login' component={LoginRecruiterScreen}/>

          {/*Register Routes */}
          <Route path='/student/register' component={UserRegisterScreen}/>
          <Route path='/student/verification/:id' component={UserVerificationScreen}/>
          <Route path='/application/:id' component={ApplicationScreen}/>
          <Route path='/applicants/:id' component={ApplicantScreen}/>
          <Route path='/student/applications' component={UserApplicationListScreen} exact/>
          <Route path='/recruiter/register' component={RecruiterRegisterScreen}/>
          <Route path='/recruiter/verification/:id' component={RecruiterVerificationScreen}/>

          {/*Profile Routes */}
          <Route path='/student/profile' component={UserProfileScreen} exact/>
          <Route path='/student/profile/update' component={UserUpdateScreen}/>
          <Route path='/recruiter/profile' component={RecruiterProfileScreen} exact/>
          <Route path='/recruiter/profile/update' component={RecruiterUpdateScreen}/> 

          {/*Admin Routes*/}
          <Route path='/admin/userlist' component={UserListScreen}/>
          <Route path='/admin/user/:id/edit' component={UserEditScreen}/>
          <Route path='/admin/recruiterlist' component={RecruiterListScreen}/>
          <Route path='/admin/recruiter/:id/edit' component={RecruiterEditScreen}/>
          
          <Route path='/cv/:id' component={CvScreen}/>

          {/* DashBoards */}
          <Route path='/recruiter' component={RecruiterDashboardScreen} exact/>
          <Route path='/student/search/:keyword' component={UserDashboardScreen} exact/>
          <Route path='/student/page/:pageNumber' component={UserDashboardScreen} exact/>
          <Route path='/student/search/:keyword/page/:pageNumber' component={UserDashboardScreen} exact/>
          <Route path='/student' component={UserDashboardScreen} exact/>
          <Route path='/' component={LoginScreen} exact/>
        </Container> 
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
