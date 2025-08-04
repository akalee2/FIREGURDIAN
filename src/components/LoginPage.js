// src/components/LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FireGuardianLogo from '../assets/로고.png';
import axios from 'axios';

function LoginPage({ onSignupClick, onLoginSuccess }) { 
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberId, setRememberId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 백엔드 로그인 API 호출
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: id,
        password: password
      });

      const { success, message, token, username, userType, name } = response.data;

      if (success) {
        // 로그인 성공 처리
        console.log('로그인 성공:', message);
        
        // 토큰과 사용자 정보 저장
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify({
          username,
          userType,
          name
        }));

        // 아이디 저장 처리
        if (rememberId) {
          localStorage.setItem('rememberedId', id);
        } else {
          localStorage.removeItem('rememberedId');
        }

        // 성공 메시지 표시
        alert(`${message}\n사용자: ${name} (${userType === 'head_manager' ? '총괄관리자' : '지점관리자'})`);

        // 부모 컴포넌트에 로그인 성공 알림
        if (onLoginSuccess) {
          // userType을 'head' 또는 'branch'로 변환
          const loginType = userType === 'head_manager' ? 'head' : 'branch';
          onLoginSuccess(loginType);
        }
      } else {
        setError(message);
        alert(`로그인 실패: ${message}`);
      }

    } catch (error) {
      // 에러 처리
      const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      setError(errorMessage);
      alert(`로그인 실패: ${errorMessage}`);
      console.error('로그인 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 컴포넌트 마운트 시 저장된 아이디 불러오기
  React.useEffect(() => {
    const rememberedId = localStorage.getItem('rememberedId');
    if (rememberedId) {
      setId(rememberedId);
      setRememberId(true);
    }
  }, []);

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
              disabled={loading}
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
              disabled={loading}
            />
            <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          {error && (
            <div className="error-message" style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="options-section">
          <div className="remember-id">
            <input
              type="checkbox"
              id="rememberId"
              checked={rememberId}
              onChange={(e) => setRememberId(e.target.checked)}
              disabled={loading}
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