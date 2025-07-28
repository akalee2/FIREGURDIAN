// src/components/OverallAdminUserManagement.js
import React, { useState } from 'react';
import './OverallAdminUserManagement.css';
import FireGuardianLogo from '../assets/로고.png'; // 기존 로고 이미지 재사용
import { FaCheckCircle, FaTimesCircle, FaCog, FaTrashAlt, FaPlus } from 'react-icons/fa'; // 아이콘 사용

function OverallAdminUserManagement({ onLoginClick, onNavigate }) {
  // 사용자 목록 상태 (예시 데이터)
  const [users, setUsers] = useState([
    { id: 1, branch: '본사', address: '서울 강남구', manager: '김철수', contact: '010-1234-5678', permission: true },
    { id: 2, branch: '지점 A', address: '서울 서초구', manager: '이지영', contact: '010-2345-6789', permission: true },
    { id: 3, branch: '지점 B', address: '부산 해운대구', manager: '박준형', contact: '010-3456-7890', permission: true },
    { id: 4, branch: '지점 C', address: '대구 수성구', manager: '최유리', contact: '010-4567-8901', permission: true },
    { id: 5, branch: '지점 D', address: '인천 연수구', manager: '정민아', contact: '010-5678-9012', permission: false },
    { id: 6, branch: '지점 E', address: '광주 서구', manager: '윤지훈', contact: '010-6789-0123', permission: false },
    { id: 7, branch: '지점 F', address: '대전 유성구', manager: '장미리', contact: '010-7890-1234', permission: false },
    { id: 8, branch: '지점 G', address: '울산 남구', manager: '조현우', contact: '010-8901-2345', permission: false },
  ]);

  // 알림 권한 토글 상태
  const [smsNotification, setSmsNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);

  // 사용자 삭제 핸들러
  const handleDeleteUser = (userId) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // 관리자 추가 버튼 클릭 핸들러 (임시)
  const handleAddManager = () => {
    alert('관리자 추가 기능은 아직 구현되지 않았습니다.');
    // 실제로는 모달 팝업 등을 띄워 사용자 정보를 입력받는 로직이 들어갑니다.
  };

  return (
    <div className="overall-admin-user-management">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo">
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li> {/* 예시: onNavigate 함수 사용 */}
              <li onClick={() => onNavigate('cctv')}>CCTV</li> {/* 예시: onNavigate 함수 사용 */}
              <li className="active" onClick={() => onNavigate('user_management')}>사용자 관리</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="dashboard-main-container">
        <h1 className="dashboard-title">사용자 관리</h1>

        {/* 사용자 목록 테이블 섹션 */}
        <div className="user-table-section">
          <div className="table-header-actions">
            {/* 드롭다운 아이콘은 실제 드롭다운 기능이 필요할 때 추가 */}
            <div className="table-column-header">
              사업장 <span className="dropdown-arrow">▼</span>
            </div>
            <div className="table-column-header">
              주소 <span className="dropdown-arrow">▼</span>
            </div>
            <div className="table-column-header">
              관리자 <span className="dropdown-arrow">▼</span>
            </div>
            <div className="table-column-header">
              연락처 <span className="dropdown-arrow">▼</span>
            </div>
            <div className="table-column-header">권한</div>
            <div className="table-column-header">제어</div>
            <button className="add-manager-button" onClick={handleAddManager}>
              <FaPlus /> 관리자 추가
            </button>
          </div>

          <div className="table-body">
            {users.map(user => (
              <div className="table-row" key={user.id}>
                <div className="table-cell">{user.branch}</div>
                <div className="table-cell">{user.address}</div>
                <div className="table-cell">{user.manager}</div>
                <div className="table-cell">{user.contact}</div>
                <div className="table-cell permission-cell">
                  {user.permission ? <FaCheckCircle className="permission-granted" /> : <FaTimesCircle className="permission-denied" />}
                </div>
                <div className="table-cell control-cell">
                  <button className="control-button settings-button" title="설정">
                    <FaCog />
                  </button>
                  <button className="control-button delete-button" title="삭제" onClick={() => handleDeleteUser(user.id)}>
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 알림 권한 섹션 */}
        <div className="notification-permission-section">
          <h2 className="section-title">알림 권한</h2>
          <div className="toggle-group">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={smsNotification}
                onChange={() => setSmsNotification(!smsNotification)}
              />
              <span className="slider round"></span>
            </label>
            <span className="toggle-label">SMS</span>
          </div>
          <div className="toggle-group">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={emailNotification}
                onChange={() => setEmailNotification(!emailNotification)}
              />
              <span className="slider round"></span>
            </label>
            <span className="toggle-label">E-mail</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallAdminUserManagement;
