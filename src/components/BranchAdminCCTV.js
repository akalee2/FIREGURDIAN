// src/components/BranchAdminCCTV.js
import React, { useState } from 'react';
import FireGuardianLogo from '../assets/대비로고.png';
import '../App.css'; // App.css 임포트
import './BranchAdminCCTV.css'; // CCTV 전용 CSS

// 지점 관리자 CCTV 페이지
function BranchAdminCCTV({ onLoginClick, onNavigate }) {
  // CCTV 목록 (더미 데이터)
  const cctvList = [
    { id: 1, name: '지점 CCTV 1', link: 'https://placehold.co/400x250/000000/FFFFFF?text=Branch+CCTV+1' },
    { id: 2, name: '지점 CCTV 2', link: 'https://placehold.co/400x250/000000/FFFFFF?text=Branch+CCTV+2' },
    { id: 3, name: '지점 CCTV 3', link: 'https://placehold.co/400x250/000000/FFFFFF?text=Branch+CCTV+3' },
    { id: 4, name: '지점 CCTV 4', link: 'https://placehold.co/400x250/000000/FFFFFF?text=Branch+CCTV+4' },
  ];

  return (
    <div className="branch-admin-cctv">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo" onClick={() => onNavigate('branch_dashboard')} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('branch_dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li className="active" onClick={() => onNavigate('branch_cctv')}>CCTV</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="dashboard-main-container">
        <h1 className="dashboard-title">지점 CCTV 현황</h1>
        {/* 📌 추가: CCTV 관리 페이지로 이동하는 버튼 */}
        <div className="cctv-management-link-wrapper">
          <button className="cctv-management-button" onClick={() => onNavigate('branch_cctv_management')}>CCTV 관리</button>
        </div>
        <div className="cctv-grid">
          {cctvList.map(cctv => (
            <div key={cctv.id} className="cctv-card">
              <img src={cctv.link} alt={cctv.name} className="cctv-feed-img" />
              <div className="cctv-info">
                <h3>{cctv.name}</h3>
                <p>스트리밍: <a href={cctv.link} target="_blank" rel="noopener noreferrer">{cctv.link}</a></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BranchAdminCCTV;
