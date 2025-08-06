// src/components/OverallAdminDashboard.js
import React from 'react'; // 이 import 문은 파일의 맨 위에 있어야 합니다.
import './OverallAdminDashboard.css';
import FireGuardianLogo from '../assets/대비로고.png'; // 기존 로고 이미지 재사용

function OverallAdminDashboard({ onLoginClick, onNavigate }) {
  // onNavigate는 대시보드 내 다른 메뉴 (사업장관리, 사용자관리 등) 클릭 시 호출될 함수입니다.
  // 현재는 플레이스홀더로만 사용합니다.

  return (
    <div className="overall-admin-dashboard">
      {/* 상단 헤더 바 (기존 페이지와 동일한 스타일) */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo">
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              {/* 각 메뉴 클릭 시 onNavigate 함수 호출, 해당 페이지 이름 전달 */}
              <li className="active" onClick={() => onNavigate('dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li onClick={() => onNavigate('cctv')}>CCTV</li>
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
        <h1 className="dashboard-title">대시보드</h1>

        {/* 상단 지표 카드 섹션 */}
        <div className="metrics-section">
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
            <div className="metric-label">최근 경보</div>
            <div className="metric-sub-label">(일주일 내역)</div>
          </div>
        </div>

        {/* 메인 콘텐츠 그리드 레이아웃 */}
        <div className="main-content-grid">
          {/* 사업장 지도 */}
          <div className="grid-item map-section">
            <div className="item-title">사업장 지도</div>
            <div className="map-placeholder">
              {/* 실제 지도 API (예: Google Maps)가 여기에 들어갈 수 있습니다. */}
              <p>사업장 지도 플레이스홀더</p>
              <img src="https://placehold.co/800x400/e0e0e0/333333?text=Map+Placeholder" alt="Map Placeholder" className="placeholder-image" />
            </div>
          </div>

          {/* 안전 점수 분포 */}
          <div className="grid-item score-distribution-section">
            <div className="item-title">안전 점수 분포</div>
            <div className="score-chart-container">
              <div className="score-circle">
                <div className="score-value">85</div>
              </div>
              <div className="score-label-avg">안전 점수 평균</div>
              <div className="score-legend">
                <span className="legend-item high-risk">고위험</span>
                <span className="legend-item mid-risk">중위험</span>
                <span className="legend-item low-risk">저위험</span>
                <span className="legend-item safe">안전</span>
              </div>
            </div>
          </div>

          {/* 안전 점수 변동 그래프 */}
          <div className="grid-item score-trend-section">
            <div className="item-title">안전 점수 변동 그래프</div>
            <div className="chart-placeholder">
              {/* 실제 차트 라이브러리 (예: Chart.js, D3.js)가 여기에 들어갈 수 있습니다. */}
              <p>안전 점수 변동 그래프 플레이스홀더</p>
              <img src="https://placehold.co/600x300/e0e0e0/333333?text=Graph+Placeholder" alt="Graph Placeholder" className="placeholder-image" />
            </div>
          </div>

          {/* 최근 경보 일지 */}
          <div className="grid-item recent-alerts-section">
            <div className="item-title">최근 경보 일지</div>
            <div className="list-placeholder">
              <p>최근 경보 목록 플레이스홀더</p>
              <ul>
                <li>2025-07-28 사업장 A 경보 발생</li>
                <li>2025-07-27 사업장 B 경보 발생</li>
                <li>2025-07-26 사업장 C 경보 발생</li>
              </ul>
            </div>
          </div>

          {/* 사업장 리스트 */}
          <div className="grid-item business-list-section">
            <div className="item-title">사업장 리스트</div>
            <div className="list-placeholder">
              <p>사업장 목록 플레이스홀더</p>
              <ul>
                <li>사업장 A</li>
                <li>사업장 B</li>
                <li>사업장 C</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallAdminDashboard; // 이 export 문은 파일의 맨 마지막에 한 번만 있어야 합니다.
