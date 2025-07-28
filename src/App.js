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
import OverallAdminCCTV from './components/OverallAdminCCTV'; // 새로 추가
import BranchAdminDashboard from './components/BranchAdminDashboard';
import BranchAdminCCTV from './components/BranchAdminCCTV';
import './App.css';

function App() {
  // 'login', 'signupOne', 'signupTwo', 'signupThreeBranch', 'signupThreeHead', 'signupFour', 'dashboard', 'user_management', 'business_management', 'cctv', 'branch_dashboard', 'branch_cctv' 등으로 페이지를 관리합니다.
  const [currentPage, setCurrentPage] = useState('login'); 
  const [signupType, setSignupType] = useState(null); // 'branch' 또는 'head' 저장 (회원가입 시 선택된 유형)
  const [loggedInUserType, setLoggedInUserType] = useState(null); // 'head' 또는 'branch' (로그인된 사용자 유형)

  const handleLoginClick = () => {
    setCurrentPage('login');
    setLoggedInUserType(null); // 로그아웃 시 사용자 유형 초기화
  };

  const goToSignupOne = () => {
    setCurrentPage('signupOne');
    setSignupType(null);
  };

  // 로그인 성공 시 호출되는 함수: userType을 인자로 받습니다.
  const handleLoginSuccess = (userType) => {
    setLoggedInUserType(userType); // 로그인된 사용자 유형 저장
    if (userType === 'head') {
      setCurrentPage('dashboard'); // 총괄관리자는 OverallAdminDashboard로
    } else if (userType === 'branch') {
      setCurrentPage('branch_dashboard'); // 지점관리자는 BranchAdminDashboard로
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

  // 대시보드 헤더의 메뉴 클릭 시 페이지 이동을 처리하는 함수
  const handleDashboardNavigate = (pageName) => {
    setCurrentPage(pageName);
  };

  return (
    <div className="App">
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
      {currentPage === 'cctv' && loggedInUserType === 'head' && ( // 새로 추가
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
