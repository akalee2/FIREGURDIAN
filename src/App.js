// src/App.js
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import SignupPageOne from './components/SignupPageOne';
import SignupPageTwo from './components/SignupPageTwo';
import SignupPageThreeBranch from './components/SignupPageThreeBranch';
import SignupPageThreeHead from './components/SignupPageThreeHead';
import SignupPageFour from './components/SignupPageFour';
import OverallAdminDashboard from './components/OverallAdminDashboard';
import OverallAdminUserManagement from './components/OverallAdminUserManagement';
import OverallAdminBusinessManagement from './components/OverallAdminBusinessManagement';
import OverallAdminCCTV from './components/OverallAdminCCTV';
import BranchAdminDashboard from './components/BranchAdminDashboard';
import BranchAdminCCTV from './components/BranchAdminCCTV';
import './App.css'; // App.css 임포트 유지

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [signupType, setSignupType] = useState(null);
  const [loggedInUserType, setLoggedInUserType] = useState(null);

  const handleLoginClick = () => {
    setCurrentPage('login');
    setLoggedInUserType(null);
  };

  const goToSignupOne = () => {
    setCurrentPage('signupOne');
    setSignupType(null);
  };

  const handleLoginSuccess = (userType) => {
    setLoggedInUserType(userType);
    if (userType === 'head') {
      setCurrentPage('dashboard');
    } else if (userType === 'branch') {
      setCurrentPage('branch_dashboard');
    }
  };

  const handlePrevClick = () => {
    if (currentPage === 'signupTwo') {
      setCurrentPage('signupOne');
    } else if (currentPage === 'signupThreeBranch' || currentPage === 'signupThreeHead') {
      setCurrentPage('signupTwo');
    }
  };

  const handleNextClick = (selectedType = null) => {
    if (currentPage === 'signupOne') {
      setSignupType(selectedType);
      setCurrentPage('signupTwo');
    } else if (currentPage === 'signupTwo') {
      if (signupType === 'branch') {
        setCurrentPage('signupThreeBranch');
      } else if (signupType === 'head') {
        setCurrentPage('signupThreeHead');
      } else {
        alert('회원 유형이 선택되지 않았습니다. 다시 선택해주세요.');
        setCurrentPage('signupOne');
      }
    } else if (currentPage === 'signupThreeBranch' || currentPage === 'signupThreeHead') {
      setCurrentPage('signupFour');
    }
  };

  const handleDashboardNavigate = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="App"> {/* 모든 페이지에 "App" 클래스만 적용 */}
      {currentPage === 'login' && (
        <LoginPage onSignupClick={goToSignupOne} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'signupOne' && (
        <SignupPageOne onLoginClick={handleLoginClick} onNextClick={handleNextClick} />
      )}
      {currentPage === 'signupTwo' && (
        <SignupPageTwo onLoginClick={handleLoginClick} onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
      )}
      {currentPage === 'signupThreeBranch' && (
        <SignupPageThreeBranch onLoginClick={handleLoginClick} onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
      )}
      {currentPage === 'signupThreeHead' && (
        <SignupPageThreeHead onLoginClick={handleLoginClick} onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
      )}
      {currentPage === 'signupFour' && (
        <SignupPageFour onLoginClick={handleLoginClick} onDashboardClick={() => handleLoginSuccess(loggedInUserType)} />
      )}
      {currentPage === 'dashboard' && loggedInUserType === 'head' && (
        <OverallAdminDashboard onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} loggedInUserType={loggedInUserType} />
      )}
      {currentPage === 'user_management' && loggedInUserType === 'head' && (
        <OverallAdminUserManagement onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} />
      )}
      {currentPage === 'business_management' && loggedInUserType === 'head' && (
        <OverallAdminBusinessManagement onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} />
      )}
      {currentPage === 'cctv' && loggedInUserType === 'head' && (
        <OverallAdminCCTV onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} />
      )}
      {currentPage === 'branch_dashboard' && loggedInUserType === 'branch' && (
        <BranchAdminDashboard onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} loggedInUserType={loggedInUserType} />
      )}
      {currentPage === 'branch_cctv' && loggedInUserType === 'branch' && (
        <BranchAdminCCTV onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} />
      )}
    </div>
  );
}

export default App;