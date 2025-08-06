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
import OverallAdminCCTVManagement from './components/OverallAdminCCTVManagement'; // CCTV 관리 컴포넌트 임포트
import BranchAdminDashboard from './components/BranchAdminDashboard';
import BranchAdminCCTV from './components/BranchAdminCCTV';
import './App.css'; // App.css 임포트 유지

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [signupType, setSignupType] = useState(null);
  const [loggedInUserType, setLoggedInUserType] = useState(null);

  // CCTV 데이터를 App.js에서 중앙 관리합니다.
  // 이 데이터는 OverallAdminCCTV와 OverallAdminCCTVManagement 간에 공유됩니다.
  const [cctvData, setCctvData] = useState([
    { id: 1, name: '01_F_실내1', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+1', status: 'saved' },
    { id: 2, name: '04_S_실내2', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+2', status: 'saved' },
    { id: 3, name: '08_E_복도', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+3', status: 'saved' },
    { id: 4, name: '09_E_실외', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+4', status: 'saved' },
    { id: 5, name: '10_S_창고', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+5', status: 'saved' },
    { id: 6, name: '11_S_입구', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+6', status: 'saved' },
    { id: 7, name: '12_S_주차장', link: 'https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+7', status: 'saved' },
  ]);

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
        // OverallAdminCCTV에 cctvData를 prop으로 전달합니다.
        <OverallAdminCCTV onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} cctvData={cctvData} />
      )}
      {currentPage === 'cctv_management' && loggedInUserType === 'head' && (
        // OverallAdminCCTVManagement에 cctvData와 setCctvData를 prop으로 전달합니다.
        <OverallAdminCCTVManagement onLoginClick={handleLoginClick} onNavigate={handleDashboardNavigate} cctvList={cctvData} setCctvList={setCctvData} />
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