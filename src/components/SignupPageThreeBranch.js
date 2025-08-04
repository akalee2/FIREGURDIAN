import React, { useState, useEffect } from 'react';
import './SignupPageThreeBranch.css';
import FireGuardianLogo from '../assets/대비로고.png';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from 'axios';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// API 기본 URL 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

function SignupPageThreeBranch({ onLoginClick, onPrevClick, onNextClick }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [firebaseUid, setFirebaseUid] = useState('');
  const [isPostcodeLoaded, setIsPostcodeLoaded] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isAuthCodeVerified, setIsAuthCodeVerified] = useState(false);
  const [showAuthErrorModal, setShowAuthErrorModal] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password confirmation logic
  useEffect(() => {
    if (password && confirmPassword) {
      setIsPasswordMatched(password === confirmPassword);
    } else {
      setIsPasswordMatched(null);
    }
  }, [password, confirmPassword]);

  // 카카오 우편번호 js 파일 불러오기
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    script.onload = () => setIsPostcodeLoaded(true);
    script.onerror = () => setIsPostcodeLoaded(false);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // 아이디 중복 확인 API 호출
  const handleIdCheck = async () => {
    if (!id || id.trim().length < 3) {
      alert('아이디를 3자 이상 입력해주세요.');
      return;
    }

    setIsCheckingId(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/signup/check-username`, {
        username: id
      });

      const { available, message } = response.data;
      setIsIdAvailable(available);
      
      if (available) {
        alert('사용 가능한 아이디입니다.');
      } else {
        alert('이미 존재하는 아이디입니다.');
      }
    } catch (error) {
      console.error('아이디 중복 확인 오류:', error);
      const errorMessage = error.response?.data?.message || '아이디 중복 확인 중 오류가 발생했습니다.';
      alert(errorMessage);
      setIsIdAvailable(false);
    } finally {
      setIsCheckingId(false);
    }
  };

  // reCAPTCHA 설정 함수
  const setupRecaptcha = async () => {
    try {
      if (window.recaptchaVerifier) {
        await window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      const phoneInput = document.getElementById('phone-input');
      if (!phoneInput) return;

      window.recaptchaVerifier = new RecaptchaVerifier(auth, phoneInput, {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          window.recaptchaVerifier = null;
        },
        'error-callback': () => {
          window.recaptchaVerifier = null;
        }
      });
    } catch (error) {
      console.error('reCAPTCHA 설정 오류:', error);
      window.recaptchaVerifier = null;
      throw error;
    }
  };

  // 인증 번호 발송 함수
  const handlePhoneVerification = async () => {
    if (isAuthCodeVerified) {
      alert('이미 인증이 완료되었습니다.');
      return;
    }

    const button = document.getElementById('phone-verification-button');
    if (button) button.disabled = true;

    try {
      const phoneRegex = /^(\+82)?0?1[0-9]{8,9}$/;
      if (!phoneRegex.test(phone)) {
        alert('올바른 전화번호 형식을 입력해주세요 (예: 01012345678).');
        if (button) button.disabled = false;
        return;
      }

      await setupRecaptcha();

      let formattedPhone = phone.replace(/[\s-]/g, '');
      if (!formattedPhone.startsWith('+82')) {
        formattedPhone = `+82${formattedPhone.replace(/^0/, '')}`;
      }

      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      setIsPhoneVerified(true);
      setAuthCode('');
      setIsAuthCodeVerified(false);
      setShowAuthErrorModal(false);
      alert('인증번호가 전송되었습니다!');
    } catch (error) {
      console.error('SMS 전송 실패:', error);
      setIsPhoneVerified(false);
      setShowAuthErrorModal(true);
      alert(`인증번호 전송 실패: ${error.code === 'auth/too-many-requests' ? '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' : '오류가 발생했습니다.'}`);
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    }
  };

  // 인증 코드 확인 함수
  const handleAuthCodeVerification = async () => {
    if (isAuthCodeVerified) {
      alert('이미 인증이 완료되었습니다.');
      return;
    }

    if (!confirmationResult) {
      alert('먼저 인증번호를 발송해주세요.');
      return;
    }

    if (!authCode || authCode.length !== 6) {
      alert('6자리 인증 코드를 입력해주세요.');
      return;
    }

    const verifyButton = document.querySelector('button[onClick="handleAuthCodeVerification"]');
    if (verifyButton) verifyButton.disabled = true;

    try {
      const result = await confirmationResult.confirm(authCode);
      setIsAuthCodeVerified(true);
      setFirebaseUid(result.user.uid);
      setShowAuthErrorModal(false);
      
      const phoneInput = document.getElementById('phone-input');
      const authCodeInput = document.getElementById('auth-code-input');
      const verifyButton = document.getElementById('phone-verification-button');
      
      if (phoneInput) phoneInput.disabled = true;
      if (authCodeInput) authCodeInput.disabled = true;
      if (verifyButton) verifyButton.disabled = true;

      alert('인증이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('인증 실패:', error);
      setIsAuthCodeVerified(false);
      setShowAuthErrorModal(true);
      alert('인증 코드가 올바르지 않습니다. 다시 확인해주세요.');
    }
  };

  const handleAddressSearch = () => {
    if (!isPostcodeLoaded || !window.daum || !window.daum.Postcode) {
      alert('주소 검색 서비스를 로드 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    new window.daum.Postcode({
      oncomplete: (data) => {
        setAddress(data.roadAddress);
        setDetailAddress('');
      }
    }).open();
  };

  // 회원가입 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 입력값 검증
    if (!id || !password || !confirmPassword || !name || !phone || !authCode || !address) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }
    
    if (isIdAvailable !== true) {
      alert('아이디 중복 확인을 완료하거나 사용 가능한 아이디를 입력해주세요.');
      return;
    }
    
    if (isPasswordMatched !== true) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!isPhoneVerified) {
      alert('휴대폰 인증 코드를 먼저 발송해주세요.');
      return;
    }
    
    if (!isAuthCodeVerified) {
      alert('인증 코드 확인을 완료해주세요.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 회원가입 요청 데이터 구성
      const signupData = {
        username: id,
        password: password,
        name: name,
        phoneNumber: phone,
        userType: 'branch_manager', // 지점 담당자
        officeAddress: detailAddress ? `${address} ${detailAddress}` : address
      };

      console.log('회원가입 요청 데이터:', signupData);

      // 백엔드 회원가입 API 호출
      const response = await axios.post(`${API_BASE_URL}/signup/register`, signupData);
      
      const { success, message, username, userType } = response.data;
      
      if (success) {
        alert(`회원가입이 완료되었습니다!\n${message}`);
        console.log('회원가입 성공:', { username, userType });
        
        // 성공 시 다음 단계로 이동
        onNextClick();
      } else {
        alert(`회원가입 실패: ${message}`);
      }
      
    } catch (error) {
      console.error('회원가입 오류:', error);
      const errorMessage = error.response?.data?.message || '회원가입 중 오류가 발생했습니다.';
      alert(`회원가입 실패: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page-three-branch">
      <div className="signup-header-bar">
        <div className="header-logo">
          <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
        </div>
        <button className="header-login-button" onClick={onLoginClick}>로그인</button>
      </div>

      <div className="signup-main-container">
        <h1 className="signup-title">회원가입</h1>
        <div className="breadcrumb-nav">
          <span>Home</span> / <span>회원가입</span> / <span className="active-breadcrumb">정보 입력</span>
          <div className="breadcrumb-divider"></div>
        </div>

        <div className="progress-steps">
          <div className="progress-step"><div className="progress-step-circle"><span className="step-number">01</span><span className="step-text">회원유형선택</span></div></div>
          <div className="progress-arrow"></div>
          <div className="progress-step"><div className="progress-step-circle"><span className="step-number">02</span><span className="step-text">약관동의</span></div></div>
          <div className="progress-arrow"></div>
          <div className="progress-step active"><div className="progress-step-circle"><span className="step-number">03</span><span className="step-text">정보 입력</span></div></div>
          <div className="progress-arrow"></div>
          <div className="progress-step"><div className="progress-step-circle"><span className="step-number">04</span><span className="step-text">가입 완료</span></div></div>
        </div>

        <div className="member-info-input-section">
          <div className="section-title-with-circle">회원정보 입력</div>
          <form onSubmit={handleSubmit} className="info-input-form">
            <div className="form-row">
              <label htmlFor="id-input" className="required">아이디</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  id="id-input" 
                  value={id} 
                  onChange={(e) => {
                    setId(e.target.value);
                    setIsIdAvailable(null); // 아이디 변경 시 중복 확인 상태 초기화
                  }} 
                  placeholder="아이디 입력" 
                  className="input-field" 
                  required 
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  className="action-button" 
                  onClick={handleIdCheck}
                  disabled={isCheckingId || isSubmitting}
                >
                  {isCheckingId ? '확인중...' : '아이디중복확인'}
                </button>
              </div>
              <span className="input-guide">
                {isIdAvailable === true && <FaCheckCircle className="success-icon" />}
                {isIdAvailable === false && <FaTimesCircle className="error-icon" />}
                (8~16 이내의 영문/숫자/기호 사용 가능)
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="password-input" className="required">비밀번호</label>
              <input 
                type="password" 
                id="password-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="비밀번호 입력" 
                className="input-field" 
                required 
                disabled={isSubmitting}
              />
              <span className="input-guide">(8~16 이내의 영문/숫자/기호 사용 가능)</span>
            </div>

            <div className="form-row">
              <label htmlFor="confirm-password-input" className="required">비밀번호 확인</label>
              <input 
                type="password" 
                id="confirm-password-input" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                placeholder="비밀번호 재입력" 
                className="input-field" 
                required 
                disabled={isSubmitting}
              />
              <span className="input-guide">
                {isPasswordMatched === true && <FaCheckCircle className="success-icon" />}
                {isPasswordMatched === false && <FaTimesCircle className="error-icon" />}
                {isPasswordMatched === true && '비밀번호가 일치합니다.'}
                {isPasswordMatched === false && '비밀번호가 일치하지 않습니다.'}
              </span>
            </div>

            <div className="form-row">
              <label htmlFor="name-input" className="required">이름</label>
              <input 
                type="text" 
                id="name-input" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="이름 입력" 
                className="input-field" 
                required 
                disabled={isSubmitting}
              />
              <span className="input-guide">반드시 실명으로 입력해주세요.</span>
            </div>

            <div className="form-row">
              <label htmlFor="phone-input" className="required">휴대폰</label>
              <div className="input-with-button">
                <input
                  type="tel"
                  id="phone-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ex. +821012345678"
                  className="input-field"
                  required
                  disabled={isAuthCodeVerified || isSubmitting}
                />
                <button
                  type="button"
                  id="phone-verification-button"
                  className="action-button"
                  onClick={handlePhoneVerification}
                  disabled={isAuthCodeVerified || isSubmitting}
                >
                  {isAuthCodeVerified ? '인증완료' : '인증번호 발송'}
                </button>
              </div>
              {isPhoneVerified && <span className="input-guide success-message"><FaCheckCircle className="success-icon" /> 인증번호 발송 완료</span>}
            </div>

            {isPhoneVerified && (
              <div className="form-row auth-code-row">
                <label htmlFor="auth-code-input" className="required">인증번호</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="auth-code-input"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="인증번호 입력"
                    className="input-field"
                    required
                    disabled={isAuthCodeVerified || isSubmitting}
                  />
                  <button
                    type="button"
                    className="action-button"
                    onClick={handleAuthCodeVerification}
                    disabled={isAuthCodeVerified || isSubmitting}
                  >
                    {isAuthCodeVerified ? '인증완료' : '인증번호 확인'}
                  </button>
                </div>
                {isAuthCodeVerified && <span className="input-guide success-message"><FaCheckCircle className="success-icon" /> 인증 완료</span>}
              </div>
            )}

            <div className="form-row">
              <label htmlFor="address-input" className="required">사업장 주소</label>
              <div className="input-with-button">
                <input 
                  type="text" 
                  id="address-input" 
                  value={address} 
                  onChange={(e) => setAddress(e.target.value)} 
                  placeholder="주소 검색" 
                  className="input-field" 
                  readOnly 
                  required 
                  disabled={isSubmitting}
                />
                <button 
                  type="button" 
                  className="action-button" 
                  onClick={handleAddressSearch}
                  disabled={isSubmitting}
                >
                  우편번호검색
                </button>
              </div>
            </div>

            <div className="form-row detail-address-row">
              <label htmlFor="detail-address-input"></label>
              <input 
                type="text" 
                id="detail-address-input" 
                value={detailAddress} 
                onChange={(e) => setDetailAddress(e.target.value)} 
                placeholder="상세 주소" 
                className="input-field" 
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button prev-button" 
            onClick={onPrevClick}
            disabled={isSubmitting}
          >
            이전
          </button>
          <button 
            className="nav-button next-button" 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? '처리중...' : '다음'}
          </button>
        </div>
      </div>

      {showAuthErrorModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">인증 오류</h2>
            <p className="modal-message">인증 코드가 올바르지 않습니다. 다시 확인해주세요.</p>
            <button className="modal-close-button" onClick={() => setShowAuthErrorModal(false)}>확인</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignupPageThreeBranch;