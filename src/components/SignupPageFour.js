// src/components/SignupPageFour.js
import React from 'react';
import './SignupPageFour.css';
import FireGuardianLogo from '../assets/로고.png'; // 기존 로고 이미지 재사용
import { FaCheckCircle } from 'react-icons/fa'; // 체크 아이콘 사용

function SignupPageFour({ onLoginClick, onDashboardClick }) {
  return (
    <div className="signup-page-four">
      {/* 상단 헤더 바 */}
      <div className="signup-header-bar">
        <div className="header-logo">
          <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그인
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="signup-main-container">
        <h1 className="signup-title">회원가입</h1>

        {/* 브레드크럼 */}
        <div className="breadcrumb">
          <span>Home</span> / <span>회원가입</span> / <span className="current-step">가입 완료</span>
        </div>

        {/* 스텝 인디케이터 */}
        <div className="step-indicator">
          <div className="step">
            <div className="step-number">01</div>
            <div className="step-text">회원유형선택</div>
          </div>
          <div className="step-arrow"></div>
          <div className="step">
            <div className="step-number">02</div>
            <div className="step-text">약관동의</div>
          </div>
          <div className="step-arrow"></div>
          <div className="step">
            <div className="step-number">03</div>
            <div className="step-text">정보입력</div>
          </div>
          <div className="step-arrow"></div>
          <div className="step current"> {/* current 클래스 변경 */}
            <div className="step-number">04</div>
            <div className="step-text">가입완료</div>
          </div>
        </div>

        {/* 가입 완료 메시지 섹션 */}
        <div className="completion-message-section">
          <div className="completion-icon-container">
            <FaCheckCircle className="completion-check-icon" />
          </div>
          <p className="completion-text-main">
            가입이 완료되었습니다!
          </p>
          <p className="completion-text-sub">
            대시보드로 이동하여 <span className="highlight-text">FireGuardian</span>과 함께<br />
            사업장의 안전을 지켜보세요.
          </p>
        </div>

        {/* 하단 버튼 섹션 */}
        <div className="completion-buttons">
          <button className="login-now-button" onClick={onLoginClick}>
            로그인 하기
          </button>
          {/* 대시보드 이동 버튼 (필요시 활성화) */}
          {/* <button className="dashboard-button" onClick={onDashboardClick}>
            대시보드로 이동
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default SignupPageFour;
