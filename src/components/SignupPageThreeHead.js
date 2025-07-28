// src/components/SignupPageThreeHead.js
import React, { useState, useEffect } from 'react';
import './SignupPageThreeHead.css';
import FireGuardianLogo from '../assets/로고.png'; // 기존 로고 이미지 재사용
import { FaCheckCircle, FaTimesCircle, FaPlusCircle, FaTimes } from 'react-icons/fa'; // 아이콘 사용

function SignupPageThreeHead({ onLoginClick, onPrevClick, onNextClick }) {
  // 개인 정보 상태
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 본사 정보 상태
  const [headOfficeName, setHeadOfficeName] = useState('');
  const [headOfficeAddress, setHeadOfficeAddress] = useState('');
  const [headOfficeDetailAddress, setHeadOfficeDetailAddress] = useState('');

  // 사업장 정보 상태
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchDetailAddress, setBranchDetailAddress] = useState('');
  const [branchManagerName, setBranchManagerName] = useState('');
  const [branchManagerPhone, setBranchManagerPhone] = useState('');

  // 등록된 사업장 목록
  const [registeredBranches, setRegisteredBranches] = useState([]);

  // 유효성 검사 상태
  const [isIdAvailable, setIsIdAvailable] = useState(null);
  const [isPasswordMatched, setIsPasswordMatched] = useState(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false); // 개인 휴대폰 인증
  const [isBranchManagerPhoneVerified, setIsBranchManagerPhoneVerified] = useState(false); // 담당자 휴대폰 인증

  // 비밀번호 확인 로직
  useEffect(() => {
    if (password && confirmPassword) {
      setIsPasswordMatched(password === confirmPassword);
    } else {
      setIsPasswordMatched(null);
    }
  }, [password, confirmPassword]);

  const handleIdCheck = () => {
    // 실제 아이디 중복 확인 API 호출 로직 (예시)
    if (id === 'adminuser') {
      setIsIdAvailable(false);
      alert('이미 사용 중인 아이디입니다.');
    } else if (id.length < 8 || id.length > 16) {
      setIsIdAvailable(false);
      alert('아이디는 8~16자 이내의 영문/숫자/기호여야 합니다.');
    } else {
      setIsIdAvailable(true);
      alert('사용 가능한 아이디입니다.');
    }
  };

  const handlePhoneVerification = () => {
    alert('개인 휴대폰 인증 코드를 발송했습니다. (실제 기능 아님)');
    setIsPhoneVerified(true);
  };

  const handleBranchManagerPhoneVerification = () => {
    alert('담당자 휴대폰 인증 코드를 발송했습니다. (실제 기능 아님)');
    setIsBranchManagerPhoneVerified(true);
  };

  const handleAddressSearch = (type) => {
    alert('우편번호 검색 팝업 (실제 기능 아님)');
    if (type === 'headOffice') {
      setHeadOfficeAddress('서울특별시 강남구 테헤란로 123 (본사)');
    } else if (type === 'branch') {
      setBranchAddress('서울특별시 서초구 서초대로 456 (지점)');
    }
  };

  const handleAddBranch = () => {
    if (!branchName || !branchAddress || !branchManagerName || !branchManagerPhone) {
      alert('사업장 정보 (사업장명, 주소, 담당자명, 담당자 휴대폰)를 모두 입력해주세요.');
      return;
    }
    if (!isBranchManagerPhoneVerified) {
      alert('사업장 담당자 휴대폰 인증을 완료해주세요.');
      return;
    }

    setRegisteredBranches([
      ...registeredBranches,
      {
        name: branchName,
        address: `${branchAddress} ${branchDetailAddress}`,
        manager: branchManagerName,
        phone: branchManagerPhone,
      },
    ]);
    // 입력 필드 초기화
    setBranchName('');
    setBranchAddress('');
    setBranchDetailAddress('');
    setBranchManagerName('');
    setBranchManagerPhone('');
    setIsBranchManagerPhoneVerified(false);
  };

  const handleRemoveBranch = (index) => {
    setRegisteredBranches(registeredBranches.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 필수 입력 필드 및 유효성 검사 확인 (간소화)
    if (!id || !password || !confirmPassword || !name || !phone || !headOfficeName || !headOfficeAddress) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }
    if (isIdAvailable !== true || isPasswordMatched !== true || !isPhoneVerified) {
      alert('입력 정보를 다시 확인해주세요.');
      return;
    }
    if (registeredBranches.length === 0) {
      alert('최소 한 개 이상의 사업장 정보를 등록해주세요.');
      return;
    }

    console.log('통합 관리자 회원 정보:', {
      id, password, name, phone,
      headOfficeName, headOfficeAddress, headOfficeDetailAddress,
      registeredBranches,
    });
    onNextClick(); // 다음 페이지 (가입 완료)로 이동
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

        {/* 브레드크럼 */}
        <div className="breadcrumb">
          <span>Home</span> / <span>회원가입</span> / <span className="current-step">정보 입력</span>
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
          <div className="step current"> {/* current 클래스 변경 */}
            <div className="step-number">03</div>
            <div className="step-text">정보입력</div>
          </div>
          <div className="step-arrow"></div>
          <div className="step">
            <div className="step-number">04</div>
            <div className="step-text">가입완료</div>
          </div>
        </div>

        {/* 회원 정보 입력 섹션 */}
        <div className="member-info-input-section">
          <div className="section-title-with-circle">회원정보 입력</div>

          <form onSubmit={handleSubmit} className="info-input-form">
            {/* 개인 정보 입력 필드는 지점관리자와 동일 */}
            {/* 아이디 */}
            <div className="form-row">
              <label htmlFor="id-input" className="required">아이디</label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="id-input"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  placeholder="아이디 입력"
                  className="input-field"
                  required
                />
                <button type="button" className="action-button" onClick={handleIdCheck}>
                  아이디중복확인
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="ex. 00012345678"
                  className="input-field"
                  required
                />
                <button type="button" className="action-button" onClick={handlePhoneVerification}>
                  인증
                </button>
              </div>
              {isPhoneVerified && <span className="input-guide success-message"><FaCheckCircle className="success-icon" /> 인증 완료</span>}
            </div>

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
                />
                <button type="button" className="action-button" onClick={() => handleAddressSearch('headOffice')}>
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
                />
                <button type="button" className="action-button" onClick={() => handleAddressSearch('branch')}>
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
              />
            </div>
            {/* 담당자 휴대폰 */}
            <div className="form-row">
              <label htmlFor="branch-manager-phone-input" className="required">담당자 휴대폰</label>
              <div className="input-with-button">
                <input
                  type="tel"
                  id="branch-manager-phone-input"
                  value={branchManagerPhone}
                  onChange={(e) => setBranchManagerPhone(e.target.value)}
                  placeholder="ex. 00012345678"
                  className="input-field"
                  required
                />
                <button type="button" className="action-button" onClick={handleBranchManagerPhoneVerification}>
                  인증
                </button>
              </div>
              {isBranchManagerPhoneVerified && <span className="input-guide success-message"><FaCheckCircle className="success-icon" /> 인증 완료</span>}
            </div>
            <div className="add-branch-button-container">
              <button type="button" className="add-branch-button" onClick={handleAddBranch}>
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
                      <th></th> {/* 삭제 버튼을 위한 컬럼 */}
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
                          <button type="button" className="remove-branch-button" onClick={() => handleRemoveBranch(index)}>
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
          <button className="nav-button prev-button" onClick={onPrevClick}>
            이전
          </button>
          <button className="nav-button next-button" onClick={handleSubmit}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignupPageThreeHead;
