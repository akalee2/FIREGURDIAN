// src/components/OverallAdminCCTV.js
import React, { useState } from 'react';
import './OverallAdminCCTV.css';
import FireGuardianLogo from '../assets/로고.png';
import { FaCheckCircle, FaExclamationCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function OverallAdminCCTV({ onLoginClick, onNavigate }) {
  const cctvData = [
    { id: 1, name: '01_F_실내1', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+1', isDetected: true },
    { id: 2, name: '04_S_실내2', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+2', isDetected: false },
    { id: 3, name: '08_E_복도', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+3', isDetected: false },
    { id: 4, name: '09_E_실외', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+4', isDetected: false },
    { id: 5, name: '10_S_창고', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+5', isDetected: false },
    { id: 6, name: '11_S_입구', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+6', isDetected: false },
    { id: 7, name: '12_S_주차장', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+7', isDetected: false },
    { id: 8, name: '13_E_정문', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+8', isDetected: false },
    { id: 9, name: '14_F_후문', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+9', isDetected: false },
    { id: 10, name: '15_F_옥상', link: 'https://placehold.co/640x640/000000/FFFFFF?text=CCTV+Feed+10', isDetected: false },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const cctvsPerPage = 2; // 한 페이지에 2개의 CCTV
  const indexOfLastCCTV = currentPage * cctvsPerPage;
  const indexOfFirstCCTV = indexOfLastCCTV - cctvsPerPage;
  const currentCCTVs = cctvData.slice(indexOfFirstCCTV, indexOfLastCCTV);
  const totalPages = Math.ceil(cctvData.length / cctvsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [fireLogs] = useState([
    { id: 1, date: '07.08', time: '14:21', type: '감지', location: '사업장 1', status: 'detected' },
    { id: 2, date: '07.08', time: '14:24', type: '문제 해결', location: '사업장 1', status: 'resolved' },
    { id: 3, date: '07.07', time: '09:30', type: '감지', location: '사업장 2', status: 'detected' },
    { id: 4, date: '07.07', time: '09:35', type: '문제 해결', location: '사업장 2', status: 'resolved' },
    { id: 5, date: '07.06', time: '11:00', type: '감지', location: '사업장 1', status: 'detected' },
  ]);

  const [filterPeriod, setFilterPeriod] = useState('7days');

  return (
    <div className="overall-admin-cctv">
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li className="active" onClick={() => onNavigate('cctv')}>CCTV</li>
              <li onClick={() => onNavigate('user_management')}>사용자 관리</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      <div className="dashboard-main-container">
        <h1 className="dashboard-title">CCTV 모니터링</h1>
        
        {/* CCTV 관리 페이지 이동 버튼이 삭제되었습니다. */}

        <div className="cctv-content-grid">
          <div className="cctv-main-area">
            <div className="cctv-video-grid">
              {currentCCTVs.map(cctv => (
                <div key={cctv.id} className="video-placeholder">
                  <img src={cctv.link} alt={cctv.name} className="cctv-image" />
                  <div className="video-label">{cctv.name}</div>
                  {cctv.isDetected && <div className="highlight-box"></div>}
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="cctv-pagination">
                <button 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                  className="pagination-btn prev-btn"
                >
                  <FaArrowLeft />
                </button>
                <div className="page-info">
                  {currentPage} / {totalPages}
                </div>
                <button 
                  onClick={handleNextPage} 
                  disabled={currentPage === totalPages}
                  className="pagination-btn next-btn"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </div>

          <div className="fire-log-sidebar">
            <h2 className="sidebar-title">화재 감지 일지</h2>
            <div className="log-list-container">
              <ul>
                {fireLogs.map(log => (
                  <li key={log.id} className={`log-item ${log.status}`}>
                    {log.status === 'detected' ? (
                      <FaExclamationCircle className="log-icon detected-icon" />
                    ) : (
                      <FaCheckCircle className="log-icon resolved-icon" />
                    )}
                    <span className="log-date-time">{log.date} {log.time}</span>
                    <span className="log-type">{log.type}</span>
                    <span className="log-location">{log.location}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="period-filter-buttons">
              <button className={filterPeriod === '7days' ? 'active' : ''} onClick={() => setFilterPeriod('7days')}>7일</button>
              <button className={filterPeriod === '1month' ? 'active' : ''} onClick={() => setFilterPeriod('1month')}>1달</button>
              <button className={filterPeriod === '3months' ? 'active' : ''} onClick={() => setFilterPeriod('3months')}>3달</button>
              <button className={filterPeriod === '6months' ? 'active' : ''} onClick={() => setFilterPeriod('6months')}>6달</button>
              <button className={filterPeriod === '1year' ? 'active' : ''} onClick={() => setFilterPeriod('1year')}>1년</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallAdminCCTV;