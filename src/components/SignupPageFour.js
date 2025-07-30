// src/components/SignupPageFour.js
import React from 'react';
import './SignupPageFour.css';
import FireGuardianLogo from '../assets/대비로고.png'; // 기존 로고 이미지 재사용
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

        {/* Breadcrumbs / Navigation Path */}
        <div className="breadcrumb-nav">
          <span>Home</span> / <span>회원가입</span> / <span className="active-breadcrumb">가입 완료</span>
          <div className="breadcrumb-divider"></div>
        </div>

        {/* 진행 단계 표시 */}
        <div className="progress-steps">
          <div className="progress-step">
            <div className="progress-step-circle">
              <span className="step-number">01</span>
              <span className="step-text">회원유형선택</span>
            </div>
          </div>
          <div className="progress-arrow"></div>
          <div className="progress-step">
            <div className="progress-step-circle">
              <span className="step-number">02</span>
              <span className="step-text">약관동의</span>
            </div>
          </div>
          <div className="progress-arrow"></div>
          <div className="progress-step ">
            <div className="progress-step-circle">
              <span className="step-number">03</span>
              <span className="step-text">정보 입력</span>
            </div>
          </div>
          <div className="progress-arrow"></div>
          <div className="progress-step active">
            <div className="progress-step-circle">
              <span className="step-number">04</span>
              <span className="step-text">가입 완료</span>
            </div>
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
