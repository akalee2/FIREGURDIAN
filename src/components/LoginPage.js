// src/components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FireGuardianLogo from '../assets/로고.png';

// onLoginSuccess prop을 받도록 수정 (userType을 인자로 전달할 수 있도록)
function LoginPage({ onSignupClick, onLoginSuccess }) { 
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberId, setRememberId] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ID:', id);
    console.log('Password:', password);
    console.log('Remember ID:', rememberId);
    
    // --- 임시 로그인 인증 로직 시작 ---
    if (id === '1234' && password === '1234') {
      alert('총괄관리자 로그인 성공!');
      if (onLoginSuccess) {
        onLoginSuccess('head'); // 총괄관리자 유형으로 로그인 성공 전달
      }
    } else if (id === '456' && password === '456') {
      alert('지점관리자 로그인 성공!');
      if (onLoginSuccess) {
        onLoginSuccess('branch'); // 지점관리자 유형으로 로그인 성공 전달
      }
    } else {
      alert('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    }
    // --- 임시 로그인 인증 로직 끝 ---
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-section">
          <img src={FireGuardianLogo} alt="소방안전공모전 로고" className="logo" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <input
              type="text"
              placeholder="아이디"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-group password-group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <button type="submit" className="login-button">
            로그인
          </button>
        </form>

        <div className="options-section">
          <div className="remember-id">
            <input
              type="checkbox"
              id="rememberId"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
            />
            <label htmlFor="rememberId">아이디 저장</label>
          </div>
          <div className="find-links">
            <a href="#" className="find-link">
              아이디 찾기
            </a>{' '}
            |
            <a href="#" className="find-link">
              비밀번호 찾기
            </a>
          </div>
        </div>

        <div className="signup-section">
          <p>
            계정이 없으신가요?{' '}
            <a href="#" className="signup-link" onClick={onSignupClick}>
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
