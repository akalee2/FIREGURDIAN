// src/components/OverallAdminCCTV.js
import React, { useState } from 'react';
import './OverallAdminCCTV.css';
import FireGuardianLogo from '../assets/로고.png'; // 기존 로고 이미지 재사용
import { FaChevronDown, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'; // 아이콘 사용

function OverallAdminCCTV({ onLoginClick, onNavigate }) {
  // 사업장 선택 드롭다운 상태
  const [selectedBranch, setSelectedBranch] = useState('branch1');
  const branches = [
    { value: 'branch1', label: '사업장 1' },
    { value: 'branch2', label: '사업장 2' },
    { value: 'branch3', label: '사업장 3' },
  ];

  // 장소 선택 드롭다운 상태
  const [selectedPlace, setSelectedPlace] = useState('place1'); 
  const places = [
    { value: 'place1', label: '장소 1' },
    { value: 'place2', label: '장소 2' },
    { value: 'place3', label: '장소 3' },
  ];

  // 화재 감지 일지 데이터 (예시)
  const [fireLogs, setFireLogs] = useState([
    { id: 1, date: '07.08', time: '14:21', type: '감지', location: '사업장 1', status: 'detected' },
    { id: 2, date: '07.08', time: '14:24', type: '문제 해결', location: '사업장 1', status: 'resolved' },
    { id: 3, date: '07.07', time: '09:30', type: '감지', location: '사업장 2', status: 'detected' },
    { id: 4, date: '07.07', time: '09:35', type: '문제 해결', location: '사업장 2', status: 'resolved' },
    { id: 5, date: '07.06', time: '11:00', type: '감지', location: '사업장 1', status: 'detected' },
  ]);

  // 기간 필터 상태
  const [filterPeriod, setFilterPeriod] = useState('7days'); // 7일, 1달, 3달, 6달, 1년

  return (
    <div className="overall-admin-cctv">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          {/* 로고 클릭 시 대시보드로 이동 */}
          <div className="header-logo" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li className="active" onClick={() => onNavigate('cctv')}>CCTV</li> {/* 현재 페이지 활성화 */}
              <li onClick={() => onNavigate('user_management')}>사용자 관리</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="dashboard-main-container">
        <h1 className="dashboard-title">CCTV 모니터링</h1>

        <div className="cctv-content-grid">
          {/* 왼쪽 메인 영역 (사업장/장소 선택 및 CCTV 영상) */}
          <div className="cctv-main-area">
            <div className="select-groups-container">
              {/* 사업장 선택 드롭다운 */}
              <div className="select-group">
                <select className="cctv-dropdown" value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
                  {branches.map(branch => (
                    <option key={branch.value} value={branch.value}>{branch.label}</option>
                  ))}
                </select>
                <FaChevronDown className="dropdown-arrow-icon" />
              </div>
              {/* 장소 선택 드롭다운 */}
              <div className="select-group">
                <select className="cctv-dropdown" value={selectedPlace} onChange={(e) => setSelectedPlace(e.target.value)}>
                  {places.map(place => (
                    <option key={place.value} value={place.value}>{place.label}</option>
                  ))}
                </select>
                <FaChevronDown className="dropdown-arrow-icon" />
              </div>
            </div>

            <div className="cctv-video-grid">
              {/* CCTV 영상 플레이스홀더 (4개) */}
              <div className="video-placeholder">
                <img src="https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+1" alt="CCTV Feed 1" className="cctv-image" />
                <div className="video-label">01_F_실내1</div>
                {/* 이미지에 노란색 박스 있는 영상 예시 */}
                <div className="highlight-box"></div> 
              </div>
              <div className="video-placeholder">
                <img src="https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+2" alt="CCTV Feed 2" className="cctv-image" />
                <div className="video-label">04_S_실내2</div>
              </div>
              <div className="video-placeholder">
                <img src="https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+3" alt="CCTV Feed 3" className="cctv-image" />
                <div className="video-label">08_E_복도</div>
              </div>
              <div className="video-placeholder">
                <img src="https://placehold.co/400x250/000000/FFFFFF?text=CCTV+Feed+4" alt="CCTV Feed 4" className="cctv-image" />
                <div className="video-label">09_E_실외</div>
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 영역 (화재 감지 일지) */}
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
