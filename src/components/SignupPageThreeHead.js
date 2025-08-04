// src/components/SignupPageThreeHead.js
import React, { useState, useEffect } from 'react';
import './SignupPageThreeHead.css';
import FireGuardianLogo from '../assets/대비로고.png';
import { FaCheckCircle, FaTimesCircle, FaPlusCircle, FaTimes } from 'react-icons/fa';
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

function SignupPageThreeHead({ onLoginClick, onPrevClick, onNextClick }) {
  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 개인 정보 상태
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // 관리자 인증 상태 (객체로 그룹화)
  const [adminVerification, setAdminVerification] = useState({
    phone: '',
    code: '',
    isVerified: false,
    confirmationResult: null,
    isDisabled: false
  });

  // 담당자 인증 상태 (객체로 그룹화)
  const [managerVerification, setManagerVerification] = useState({
    phone: '',
    code: '',
    isVerified: false,
    confirmationResult: null,
    isDisabled: false
  });

  // 기타 상태들
  const [isPostcodeLoaded, setIsPostcodeLoaded] = useState(false);

  // 본사 정보 상태
  const [headOfficeName, setHeadOfficeName] = useState('');
  const [headOfficeAddress, setHeadOfficeAddress] = useState('');
  const [headOfficeDetailAddress, setHeadOfficeDetailAddress] = useState('');

  // 사업장 정보 상태
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchDetailAddress, setBranchDetailAddress] = useState('');
  const [branchManagerName, setBranchManagerName] = useState('');

  // 등록된 사업장 목록
  const [registeredBranches, setRegisteredBranches] = useState([]);

  // 유효성 검사 상태
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);

  // 비밀번호 확인 로직
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

  // 에러 메시지 처리 함수
  const getErrorMessage = (errorCode) => {
    const errorMessages = {
      'auth/too-many-requests': '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
      'auth/invalid-phone-number': '잘못된 전화번호 형식입니다.',
      'auth/quota-exceeded': '일일 SMS 할당량을 초과했습니다.',
      'auth/captcha-check-failed': 'reCAPTCHA 인증에 실패했습니다.',
      'auth/invalid-verification-code': '인증번호가 올바르지 않습니다.'
    };
    return errorMessages[errorCode] || '인증 과정에서 오류가 발생했습니다.';
  };

  // 전화번호 포맷팅 함수
  const formatPhoneNumber = (phoneNumber) => {
    let formatted = phoneNumber.replace(/[\s-]/g, '');
    if (!formatted.startsWith('+82')) {
      formatted = `+82${formatted.replace(/^0/, '')}`;
    }
    return formatted;
  };

  // reCAPTCHA 설정 함수
  const setupRecaptcha = async () => {
    try {
      if (window.recaptchaVerifier) {
        await window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }

      const oldContainer = document.getElementById('recaptcha-container');
      if (oldContainer) {
        oldContainer.remove();
      }

      const newContainer = document.createElement('div');
      newContainer.id = 'recaptcha-container';
      document.body.appendChild(newContainer);

      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA verified');
        },
        'expired-callback': () => {
          window.recaptchaVerifier = null;
        }
      });

      await window.recaptchaVerifier.render();
      return window.recaptchaVerifier;
    } catch (error) {
      console.error('reCAPTCHA 설정 오류:', error);
      throw error;
    }
  };

  // 인증 상태 초기화 함수
  const resetVerificationState = (type) => {
    if (type === 'admin') {
      setAdminVerification(prev => ({
        ...prev,
        confirmationResult: null,
        code: '',
        isVerified: false
      }));
    }
    else {
      setManagerVerification(prev => ({
        ...prev,
        confirmationResult: null,
        code: '',
        isVerified: false
      }));
    }
  };

  // reCAPTCHA 정리 함수
  const cleanupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  // 인증 번호 발송 함수
  const handlePhoneVerification = async (type = 'admin') => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const verification = type === 'admin' ? adminVerification : managerVerification;

      if (verification.isVerified) {
        alert('이미 인증이 완료되었습니다.');
        return;
      }

      resetVerificationState(type);

      const targetPhone = verification.phone;
      const phoneRegex = /^(\+82)?0?(10|11|16|17|18|19)[0-9]{7,8}$/;

      if (!phoneRegex.test(targetPhone)) {
        alert('올바른 전화번호 형식을 입력해주세요 (예: 01012345678).');
        return;
      }

      const verifier = await setupRecaptcha();
      if (!verifier) {
        throw new Error('reCAPTCHA 설정 실패');
      }

      const formattedPhone = formatPhoneNumber(targetPhone);
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, window.recaptchaVerifier);

      if (type === 'admin') {
        setAdminVerification(prev => ({
          ...prev,
          confirmationResult: confirmation,
          code: '',
          isVerified: false
        }));
      }
      else {
        setManagerVerification(prev => ({
          ...prev,
          confirmationResult: confirmation,
          code: '',
          isVerified: false
        }));
      }

      alert('인증번호가 전송되었습니다!');
    }
    catch (error) {
      console.error('SMS 전송 실패:', error);
      resetVerificationState(type);
      alert(`인증번호 전송 실패: ${getErrorMessage(error.code)}`);
    } finally {
      cleanupRecaptcha();
      setIsLoading(false);
    }
  };

  const handleVerifyPhoneCode = async (type = 'admin') => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const verification = type === 'admin' ? adminVerification : managerVerification;

      if (verification.isVerified) {
        alert('이미 인증이 완료되었습니다.');
        return;
      }

      if (!verification.confirmationResult) {
        alert('먼저 인증번호를 발송해주세요.');
        return;
      }

      const verificationCode = verification.code;
      if (!verificationCode || verificationCode.length !== 6 || !/^\d{6}$/.test(verificationCode)) {
        alert('6자리 숫자로 된 인증번호를 입력해주세요.');
        return;
      }

      await verification.confirmationResult.confirm(verificationCode);

      if (type === 'admin') {
        setAdminVerification(prev => ({
          ...prev,
          isVerified: true,
          isDisabled: true
        }));
      }
      else {
        setManagerVerification(prev => ({
          ...prev,
          isVerified: true,
          isDisabled: true
        }));
      }

      alert('인증이 성공적으로 완료되었습니다.');
    }
    catch (error) {
      console.error('인증 실패:', error);

      if (type === 'admin') {
        setAdminVerification(prev => ({
          ...prev,
          isVerified: false
        }));
      }
      else {
        setManagerVerification(prev => ({
          ...prev,
          isVerified: false
        }));
      }

      alert(`인증 실패: ${getErrorMessage(error.code)}`);
    }
    finally {
      setIsLoading(false);
    }
  };

  const handleAddressSearch = (type) => {
    if (!isPostcodeLoaded || !window.daum || !window.daum.Postcode) {
      alert('주소 검색 서비스를 로드 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    new window.daum.Postcode({
      oncomplete: (data) => {
        if (type === 'headOffice') {
          setHeadOfficeAddress(data.roadAddress);
          setHeadOfficeDetailAddress('');
        } else if (type === 'branch') {
          setBranchAddress(data.roadAddress);
          setBranchDetailAddress('');
        }
      },
      onclose: (state) => {
        if (state === 'FORCE_CLOSE') {
          alert('주소 검색이 취소되었습니다.');
        }
      }
    }).open();
  };

  const handleAddBranch = () => {
    if (!branchName || !branchAddress || !branchManagerName || !managerVerification.phone) {
      alert('사업장 정보 (사업장명, 주소, 담당자명, 담당자 휴대폰)를 모두 입력해주세요.');
      return;
    }
    if (!managerVerification.isVerified) {
      alert('사업장 담당자 휴대폰 인증을 완료해주세요.');
      return;
    }

    setRegisteredBranches([
      ...registeredBranches,
      {
        name: branchName,
        address: `${branchAddress} ${branchDetailAddress}`.trim(),
        manager: branchManagerName,
        phone: managerVerification.phone,
      },
    ]);

    // 사업장 정보 초기화
    setBranchName('');
    setBranchAddress('');
    setBranchDetailAddress('');
    setBranchManagerName('');

    // 담당자 인증 정보 초기화
    setManagerVerification({
      phone: '',
      code: '',
      isVerified: false,
      confirmationResult: null,
      isDisabled: false
    });
  };

  const handleRemoveBranch = (index) => {
    setRegisteredBranches(registeredBranches.filter((_, i) => i !== index));
  };

  // 회원가입 API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 입력값 검증
    if (!id || !password || !confirmPassword || !name || !adminVerification.phone || !headOfficeName || !headOfficeAddress) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    if (isIdAvailable !== true || isPasswordMatched !== true || !adminVerification.isVerified) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }

    if (registeredBranches.length === 0) {
      alert('최소 한 개 이상의 사업장 정보를 등록해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 회원가입 요청 데이터 구성
      const signupData = {
        username: id,
        password: password,
        name: name,
        phoneNumber: adminVerification.phone,
        userType: 'head_manager', // 총괄 관리자
        headquartersName: headOfficeName,
        headquartersAddress: headOfficeDetailAddress ? `${headOfficeAddress} ${headOfficeDetailAddress}` : headOfficeAddress,
        branches: registeredBranches.map(branch => ({
          branchName: branch.name,
          managerName: branch.manager,
          managerPhoneNumber: branch.phone,
          branchAddress: branch.address
        }))
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
    <div className="signup-page-three-head">
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
          <span>Home</span> / <span>회원가입</span> / <span className="active-breadcrumb">정보 입력</span>
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
          <div className="progress-step active">
            <div className="progress-step-circle">
              <span className="step-number">03</span>
              <span className="step-text">정보 입력</span>
            </div>
          </div>
          <div className="progress-arrow"></div>
          <div className="progress-step">
            <div className="progress-step-circle">
              <span className="step-number">04</span>
              <span className="step-text">가입 완료</span>
            </div>
          </div>
        </div>

        {/* 회원 정보 입력 섹션 */}
        <div className="member-info-input-section">
          <div className="section-title-with-circle">회원정보 입력</div>

          <form onSubmit={handleSubmit} className="info-input-form">
            {/* 아이디 */}
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

            {/* 비밀번호 */}
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

            {/* 비밀번호 확인 */}
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

            {/* 이름 */}
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

            {/* 휴대폰 */}
            <div className="form-row">
              <label htmlFor="phone-input" className="required">휴대폰</label>
              <div className="input-with-button">
                <input
                  type="tel"
                  id="phone-input"
                  value={adminVerification.phone}
                  onChange={(e) => setAdminVerification(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  placeholder="ex. 01012345678"
                  className="input-field"
                  disabled={adminVerification.isDisabled || isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="action-button"
                  onClick={() => handlePhoneVerification('admin')}
                  disabled={isLoading || adminVerification.isDisabled || isSubmitting}
                >
                  {isLoading ? '발송 중...' : '인증번호 발송'}
                </button>
              </div>
            </div>

            {/* 휴대폰 인증 코드 입력 */}
            {adminVerification.confirmationResult && !adminVerification.isVerified && (
              <div className="form-row">
                <label htmlFor="phone-code-input" className="required">인증 코드 입력</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="phone-code-input"
                    value={adminVerification.code}
                    onChange={(e) => setAdminVerification(prev => ({
                      ...prev,
                      code: e.target.value
                    }))}
                    placeholder="인증 코드 입력"
                    className="input-field"
                    disabled={adminVerification.isDisabled || isSubmitting}
                    maxLength="6"
                  />
                  <button
                    type="button"
                    className="action-button"
                    onClick={() => handleVerifyPhoneCode('admin')}
                    disabled={isLoading || adminVerification.isDisabled || isSubmitting}
                  >
                    {isLoading ? '확인 중...' : '확인'}
                  </button>
                </div>
              </div>
            )}

            {/* 인증 완료 메시지 */}
            {adminVerification.isVerified && (
              <div className="form-row">
                <span className="input-guide success-message">
                  <FaCheckCircle className="success-icon" /> 인증 완료
                </span>
              </div>
            )}

            {/* 본사 기본 정보 입력 */}
            <div className="section-title-with-circle second-section-title">본사 기본 정보 입력</div>

            {/* 본사명 */}
            <div className="form-row">
              <label htmlFor="head-office-name-input" className="required">본사명</label>
              <input
                type="text"
                id="head-office-name-input"
                value={headOfficeName}
                onChange={(e) => setHeadOfficeName(e.target.value)}
                placeholder="본사명 입력"
                className="input-field"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* 본사 주소 */}
            <div className="form-row">
              <label htmlFor="head-office-address-input" className="required">본사 주소</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="head-office-address-input"
                  value={headOfficeAddress}
                  onChange={(e) => setHeadOfficeAddress(e.target.value)}
                  placeholder="주소 검색"
                  className="input-field"
                  readOnly
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="action-button"
                  onClick={() => handleAddressSearch('headOffice')}
                  disabled={isSubmitting}
                >
                  우편번호검색
                </button>
              </div>
              <input
                type="text"
                id="head-office-detail-address-input"
                value={headOfficeDetailAddress}
                onChange={(e) => setHeadOfficeDetailAddress(e.target.value)}
                placeholder="상세 주소"
                className="input-field detail-address"
                disabled={isSubmitting}
              />
            </div>

            {/* 사업장 정보 등록 */}
            <div className="section-title-with-circle second-section-title">사업장 정보 등록</div>

            {/* 사업장명 */}
            <div className="form-row">
              <label htmlFor="branch-name-input" className="required">사업장명</label>
              <input
                type="text"
                id="branch-name-input"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                placeholder="사업장명 입력"
                className="input-field"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* 사업장 주소 */}
            <div className="form-row">
              <label htmlFor="branch-address-input" className="required">사업장 주소</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="branch-address-input"
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  placeholder="주소 검색"
                  className="input-field"
                  readOnly
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  className="action-button"
                  onClick={() => handleAddressSearch('branch')}
                  disabled={isSubmitting}
                >
                  우편번호검색
                </button>
              </div>
              <input
                type="text"
                id="branch-detail-address-input"
                value={branchDetailAddress}
                onChange={(e) => setBranchDetailAddress(e.target.value)}
                placeholder="상세 주소"
                className="input-field detail-address"
                disabled={isSubmitting}
              />
            </div>

            {/* 담당자명 */}
            <div className="form-row">
              <label htmlFor="branch-manager-name-input" className="required">담당자명</label>
              <input
                type="text"
                id="branch-manager-name-input"
                value={branchManagerName}
                onChange={(e) => setBranchManagerName(e.target.value)}
                placeholder="담당자명 입력"
                className="input-field"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* 담당자 휴대폰 */}
            <div className="form-row">
              <label htmlFor="branch-manager-phone-input" className="required">담당자 휴대폰</label>
              <div className="input-with-button">
                <input
                  type="tel"
                  id="branch-manager-phone-input"
                  value={managerVerification.phone}
                  onChange={(e) => setManagerVerification(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  placeholder="ex. 01012345678"
                  className="input-field"
                  disabled={managerVerification.isDisabled || isSubmitting}
                  required
                />
                <button
                  type="button"
                  className="action-button"
                  onClick={() => handlePhoneVerification('manager')}
                  disabled={isLoading || managerVerification.isDisabled || isSubmitting}
                >
                  {isLoading ? '발송 중...' : '인증번호 발송'}
                </button>
              </div>
            </div>

            {/* 담당자 휴대폰 인증 코드 입력 */}
            {managerVerification.confirmationResult && !managerVerification.isVerified && (
              <div className="form-row">
                <label htmlFor="branch-manager-phone-code-input" className="required">인증 코드 입력</label>
                <div className="input-with-button">
                  <input
                    type="text"
                    id="branch-manager-phone-code-input"
                    value={managerVerification.code}
                    onChange={(e) => setManagerVerification(prev => ({
                      ...prev,
                      code: e.target.value
                    }))}
                    placeholder="인증 코드 입력"
                    className="input-field"
                    disabled={managerVerification.isDisabled || isSubmitting}
                    maxLength="6"
                  />
                  <button
                    type="button"
                    className="action-button"
                    onClick={() => handleVerifyPhoneCode('manager')}
                    disabled={isLoading || managerVerification.isDisabled || isSubmitting}
                  >
                    {isLoading ? '확인 중...' : '확인'}
                  </button>
                </div>
              </div>
            )}

            {/* 인증 완료 메시지 */}
            {managerVerification.isVerified && (
              <div className="form-row">
                <span className="input-guide success-message">
                  <FaCheckCircle className="success-icon" /> 인증 완료
                </span>
              </div>
            )}

            <div className="add-branch-button-container">
              <button
                type="button"
                className="add-branch-button"
                onClick={handleAddBranch}
                disabled={isSubmitting}
              >
                추가 <FaPlusCircle />
              </button>
            </div>

            {/* 등록된 사업장 정보 테이블 */}
            <div className="registered-branches-section">
              <div className="section-title-with-circle third-section-title">등록된 사업장 정보</div>
              {registeredBranches.length > 0 ? (
                <table className="branch-table">
                  <thead>
                    <tr>
                      <th>사업장명</th>
                      <th>사업장 주소</th>
                      <th>담당자명</th>
                      <th>담당자 휴대폰</th>
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredBranches.map((branch, index) => (
                      <tr key={index}>
                        <td>{branch.name}</td>
                        <td>{branch.address}</td>
                        <td>{branch.manager}</td>
                        <td>{branch.phone}</td>
                        <td>
                          <button
                            type="button"
                            className="remove-branch-button"
                            onClick={() => handleRemoveBranch(index)}
                            disabled={isSubmitting}
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="no-branches-message">등록된 사업장 정보가 없습니다.</p>
              )}
            </div>
          </form>
        </div>

        {/* 하단 버튼 섹션 */}
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
            onClick={(e) => {
              e.preventDefault();
              if (!adminVerification.isVerified) {
                alert('휴대폰 인증을 완료해주세요.');
                return;
              }
              handleSubmit(e);
            }}
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? '처리 중...' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPageThreeHead;