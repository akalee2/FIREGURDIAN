// src/components/SignupPageOne.js (일부 수정)
import React from 'react';
import './SignupPageOne.css';
import FireGuardianLogo from '../assets/로고.png';

// onNextClick prop을 받도록 수정
function SignupPageOne({ onLoginClick, onNextClick }) { 

  // 카드 클릭 핸들러: 선택된 유형을 onNextClick으로 전달
  const handleCardClick = (type) => {
    onNextClick(type); // App.js의 handleNextClick 호출 시 type 인자 전달
  };

  return (
    <div className="signup-page-one">
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
          <span>Home</span> / <span>회원가입</span> / <span className="current-step">회원유형선택</span>
        </div>

        {/* 스텝 인디케이터 */}
        <div className="step-indicator">
          <div className="step current">
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
          <div className="step">
            <div className="step-number">04</div>
            <div className="step-text">가입완료</div>
          </div>
        </div>

        {/* 회원 유형 선택 섹션 */}
        <div className="member-type-selection">
          {/* 총괄관리자 카드: 클릭 시 'head' 유형 전달 */}
          <div className="member-card" onClick={() => handleCardClick('head')}> 
            <h2 className="member-card-title">총괄관리자</h2>
            <p className="member-card-description">
              전국에 분포한 사업장 관리를 원하시면 선택해주세요.
            </p>
            <button className="member-card-button">
              회원가입 &gt;
            </button>
          </div>

          {/* 지점관리자 카드: 클릭 시 'branch' 유형 전달 */}
          <div className="member-card" onClick={() => handleCardClick('branch')}> 
            <h2 className="member-card-title">지점관리자</h2>
            <p className="member-card-description">
              개별 지점 관리를 원하시면 선택해주세요.
            </p>
            <button className="member-card-button">
              회원가입 &gt;
            </button>
          </div>
        </div>

        {/* 하단 설명 텍스트 */}
        <div className="description-text-bottom">
          <p>
            회원 유형에 따라 가입 절차 및 웹사이트 이용에<br />
            차이가 있으니 통합 관리자 또는 지점 관리자를 선택해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPageOne;
