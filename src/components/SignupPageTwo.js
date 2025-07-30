// src/components/SignupPageTwo.js
import React, { useState, useEffect } from 'react';
import './SignupPageTwo.css';
import FireGuardianLogo from '../assets/대비로고.png'; // 기존 로고 이미지 재사용

function SignupPageTwo({ onLoginClick, onPrevClick, onNextClick }) {
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [allAgreed, setAllAgreed] = useState(false);

  // 모든 약관 동의 상태를 감지하여 '모두 동의하기' 체크박스 업데이트
  useEffect(() => {
    setAllAgreed(agreeService && agreePrivacy && agreeMarketing);
  }, [agreeService, agreePrivacy, agreeMarketing]);

  // '모두 동의하기' 체크박스 클릭 시 모든 약관 상태 업데이트
  const handleAllAgreedChange = (e) => {
    const checked = e.target.checked;
    setAgreeService(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  const handleNext = () => {
    if (agreeService && agreePrivacy) { // 필수 약관 동의 확인
      onNextClick(); // 다음 페이지로 이동
    } else {
      alert('필수 약관에 모두 동의해야 다음 단계로 진행할 수 있습니다.');
    }
  };

  return (
    <div className="signup-page-two">
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
          <span>Home</span> / <span>회원가입</span> / <span className="active-breadcrumb">약관동의</span>
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
          <div className="progress-arrow"></div> {/* 화살표 */}
          <div className="progress-step active">
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

        {/* 약관 동의 섹션 */}
        <div className="terms-agreement-section">
          {/* 서비스 이용 약관 */}
          <div className="term-group">
            <div className="term-title-required">서비스 이용 약관 [필수]</div>
            <div className="term-content-box">
              <p><strong>제1조 (목적)</strong></p>
              <p>이 약관은 FireGuardian(이하 "회사")이 제공하는 소방 안전 분석 및 사업장 관리 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 회원 간의 권리 및 의무를 규정함을 목적으로 합니다.</p>
              <p><strong>제2조 (회원 가입 및 자격)</strong></p>
              <p>1. 회원은 사업장 대표 또는 담당자 자격으로 가입할 수 있으며, 가입 시 회사의 승인을 거쳐야 합니다.</p>
              {/******** 더 많은 약관 내용 추가 가능 ********/}
            </div>
            <div className="term-agreement-checkbox">
              <span>서비스 이용 약관에 동의합니다.</span>
              <label>
                <input
                  type="radio"
                  name="agreeService"
                  value="yes"
                  checked={agreeService === true}
                  onChange={() => setAgreeService(true)}
                />
                예
              </label>
              <label>
                <input
                  type="radio"
                  name="agreeService"
                  value="no"
                  checked={agreeService === false}
                  onChange={() => setAgreeService(false)}
                />
                아니오
              </label>
            </div>
          </div>

          {/* 개인정보 수집 및 이용 동의 */}
          <div className="term-group">
            <div className="term-title-required">개인정보 수집 및 이용 동의 [필수]</div>
            <div className="term-content-box">
              <p><strong>[수집 항목]</strong></p>
              <ul>
                <li>필수: 이메일 주소, 비밀번호, 회사명, 사업장 위치, 담당자 이름</li>
                <li>선택: 직책, 연락처, 업로드된 도면 및 문서</li>
              </ul>
              <p><strong>[수집 목적]</strong></p>
              <ul>
                <li>서비스 제공 및 본인 확인</li>
              </ul>
            </div>
            <div className="term-agreement-checkbox">
              <span>개인 정보 수집 및 이용에 동의합니다.</span>
              <label>
                <input
                  type="radio"
                  name="agreePrivacy"
                  value="yes"
                  checked={agreePrivacy === true}
                  onChange={() => setAgreePrivacy(true)}
                />
                예
              </label>
              <label>
                <input
                  type="radio"
                  name="agreePrivacy"
                  value="no"
                  checked={agreePrivacy === false}
                  onChange={() => setAgreePrivacy(false)}
                />
                아니오
              </label>
            </div>
          </div>

          {/* 전자적 고지 및 알림 수신 동의 */}
          <div className="term-group">
            <div className="term-title-optional">전자적 고지 및 알림 수신 동의 [필수]</div> {/* 이미지에는 필수로 되어있으나, 보통 선택이므로 일단 필수로 표기 */}
            <div className="term-content-box">
              <p>회원은 FireGuardian에서 제공하는 전자적 알림(이메일, 앱 푸시 등)을 통해 사업장 위험 알림 결과, 점검 알림, 시스템 관련 공지사항을 수신하는 것에 동의합니다.</p>
            </div>
            <div className="term-agreement-checkbox">
              <span>전자적 고지 및 알림 수신에 동의합니다.</span>
              <label>
                <input
                  type="radio"
                  name="agreeMarketing"
                  value="yes"
                  checked={agreeMarketing === true}
                  onChange={() => setAgreeMarketing(true)}
                />
                예
              </label>
              <label>
                <input
                  type="radio"
                  name="agreeMarketing"
                  value="no"
                  checked={agreeMarketing === false}
                  onChange={() => setAgreeMarketing(false)}
                />
                아니오
              </label>
            </div>
          </div>

          {/* 모두 동의하기 체크박스 */}
          <div className="all-agree-checkbox">
            <label>
              <input
                type="checkbox"
                checked={allAgreed}
                onChange={handleAllAgreedChange}
              />
              모두 동의하기
            </label>
          </div>
        </div>

        {/* 하단 버튼 섹션 */}
        <div className="navigation-buttons">
          <button className="nav-button prev-button" onClick={onPrevClick}>
            이전
          </button>
          <button className="nav-button next-button" onClick={handleNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPageTwo;
