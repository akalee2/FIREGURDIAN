import React, { useState } from 'react';
import './OverallAdminDashboard.css';
import logo from '../assets/로고.png';

// onNavigate prop을 받아옴
const OverallAdminDashboard = ({ onLoginClick, onNavigate, loggedInUserType }) => {
  const [activeMenu, setActiveMenu] = useState('대시보드');

  // 메뉴 클릭 시 부모 컴포넌트의 onNavigate 함수를 호출하여 페이지 변경
  const handleMenuClick = (menu, pageName) => {
    setActiveMenu(menu);
    onNavigate(pageName);
  };

  return (
    <div className="overall-admin-dashboard">
      <header className="dashboard-header-bar">
        <div className="header-left">
          <img src={logo} alt="로고" className="header-logo-img" />
          <nav className="main-nav">
            <ul>
              <li
                className={activeMenu === '대시보드' ? 'active' : ''}
                onClick={() => handleMenuClick('대시보드', 'dashboard')}
              >
                대시보드
              </li>
              <li
                className={activeMenu === '사업장관리' ? 'active' : ''}
                onClick={() => handleMenuClick('사업장관리', 'business_management')}
              >
                사업장관리
              </li>
              <li
                className={activeMenu === 'CCTV' ? 'active' : ''}
                onClick={() => handleMenuClick('CCTV', 'cctv')}
              >
                CCTV
              </li>
              <li
                className={activeMenu === '사용자관리' ? 'active' : ''}
                onClick={() => handleMenuClick('사용자관리', 'user_management')}
              >
                사용자관리
              </li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>로그아웃</button>
      </header>

      <main className="dashboard-main-container">
        <h1 className="dashboard-title">대시보드</h1>
        
        <div className="main-content-grid">
          <section className="metrics-section">
            <div className="metric-card">
              <div className="metric-value">4</div>
              <div className="metric-label">전체 사업장 수</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">1</div>
              <div className="metric-label">고위험 사업장 수</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">3</div>
              <div className="metric-label">최근 경보<br/>(금일/전일 대비)</div>
            </div>
          </section>

          <div className="main-grid-content">
            <div className="left-column-container">
              <section className="grid-item map-section">
                <h2 className="item-title">사업장 지도</h2>
                <div className="map-placeholder">
                  Map Placeholder
                </div>
              </section>
              <div className="left-column-bottom-container">
                <section className="grid-item recent-alerts-section">
                  <h2 className="item-title">최근 경보 일지</h2>
                  <div className="list-placeholder">
                    <ul>
                      <li>2025-07-28 사업장 A 경보 발생</li>
                      <li>2025-07-27 사업장 B 경보 발생</li>
                      <li>2025-07-26 사업장 C 경보 발생</li>
                    </ul>
                  </div>
                </section>
                <section className="grid-item business-list-section">
                  <h2 className="item-title">사업장 리스트</h2>
                  <div className="list-placeholder">
                    <ul>
                      <li>사업장 목록 플레이스홀더</li>
                      <li>사업장 A</li>
                      <li>사업장 B</li>
                      <li>사업장 C</li>
                    </ul>
                  </div>
                </section>
              </div>
            </div>

            <div className="right-column-container">
              <section className="grid-item score-distribution-section">
                <h2 className="item-title">안전 점수 분포</h2>
                <div className="score-chart-container">
                  <div className="score-circle">
                    <span className="score-value">85</span>
                  </div>
                  <div className="score-label-avg">안전 점수 평균</div>
                  <div className="score-legend">
                    <span className="legend-item high-risk">고위험</span>
                    <span className="legend-item mid-risk">중위험</span>
                    <span className="legend-item low-risk">저위험</span>
                    <span className="legend-item safe">안전</span>
                  </div>
                </div>
              </section>
              <section className="grid-item score-trend-section">
                <h2 className="item-title">안전 점수 변동 그래프</h2>
                <div className="chart-placeholder">
                  Graph Placeholder
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OverallAdminDashboard;