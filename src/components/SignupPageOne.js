// src/components/SignupPageOne.js
import React from 'react';
import './SignupPageOne.css';
import FireGuardianLogo from '../assets/대비로고.png'; // 로고 이미지 경로

function SignupPageOne({ onLoginClick, onNextClick, onNavigate }) { // onNavigate prop 추가
  const handleSelectType = (type) => {
    onNextClick(type); // App.js로 선택된 유형 전달
  };

  return (
    <div className="signup-page-one">
      {/* 상단 헤더 바 (기존 대시보드 헤더와 유사하게 유지) */}
      <div className="signup-header-bar">
        <div className="header-left">
          {/* 로고 클릭 시 로그인 페이지로 이동 */}
          <div className="header-logo" onClick={onLoginClick} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
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
          <span>Home</span> / <span>회원가입</span> / <span className="active-breadcrumb">회원유형선택</span>
          <div className="breadcrumb-divider"></div>
        </div>

        {/* 진행 단계 표시 */}
        <div className="progress-steps">
          <div className="progress-step active">
            <div className="progress-step-circle">
              <span className="step-number">01</span>
              <span className="step-text">회원유형선택</span>
            </div>
          </div>
          <div className="progress-arrow"></div> {/* 화살표 */}
          <div className="progress-step">
            <div className="progress-step-circle">
              <span className="step-number">02</span>
              <span className="step-text">약관동의</span>
            </div>
          </div>
          <div className="progress-arrow"></div> {/* 화살표 */}
          <div className="progress-step">
            <div className="progress-step-circle">
              <span className="step-number">03</span>
              <span className="step-text">정보 입력</span>
            </div>
          </div>
          <div className="progress-arrow"></div> {/* 화살표 */}
          <div className="progress-step">
            <div className="progress-step-circle">
              <span className="step-number">04</span>
              <span className="step-text">가입 완료</span>
            </div>
          </div>
        </div>

        {/* 총괄관리자 / 지점관리자 선택 카드 */}
        <div className="signup-cards-container">
          <div className="signup-card" onClick={() => handleSelectType('head')}>
            <h2 className="card-title">총괄관리자</h2>
            <p className="card-description">
              전국에 분포한 사업장 관리를 원하시면 선택해주세요.
            </p>
            <button className="signup-card-button">
              회원가입 <span className="arrow-icon">&gt;</span>
            </button>
          </div>

          <div className="signup-card" onClick={() => handleSelectType('branch')}>
            <h2 className="card-title">지점관리자</h2>
            <p className="card-description">
              개별 지점 관리를 원하시면 선택해주세요.
            </p>
            <button className="signup-card-button">
              회원가입 <span className="arrow-icon">&gt;</span>
            </button>
          </div>
        </div>

        {/* 하단 안내 문구 */}
        <p className="bottom-info-text">
          회원 유형에 따라 가입 절차 및 웹사이트 이용에 차이가 있으니 총괄 관리자 또는 지점 관리자를 선택해 주세요.
        </p>
      </div>
    </div>
  );
}

export default SignupPageOne;
