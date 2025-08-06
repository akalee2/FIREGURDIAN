// src/components/OverallAdminUserManagement.js
import React, { useState, useEffect } from 'react';
import './OverallAdminUserManagement.css';
import FireGuardianLogo from '../assets/로고.png';
import { FaCheckCircle, FaTimesCircle, FaCog, FaTrashAlt, FaPlus } from 'react-icons/fa';

// 모달 컴포넌트
const UserModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    branch: user ? user.branch : '',
    address: user ? user.address : '',
    manager: user ? user.manager : '',
    contact: user ? user.contact : '',
    permission: user ? user.permission : false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>{user ? '사용자 정보 수정' : '새 관리자 추가'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>사업장</label>
            <input type="text" name="branch" value={formData.branch} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>주소</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>관리자</label>
            <input type="text" name="manager" value={formData.manager} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>연락처</label>
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
          </div>
          <div className="form-group-checkbox">
            <label>권한</label>
            <input type="checkbox" name="permission" checked={formData.permission} onChange={handleChange} />
            <span>권한 부여</span>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="save-button">저장</button>
            <button type="button" className="cancel-button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

function OverallAdminUserManagement({ onLoginClick, onNavigate }) {
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

  const [smsNotification, setSmsNotification] = useState(true);
  const [emailNotification, setEmailNotification] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // 사용자 목록을 권한에 따라 정렬하는 함수
  const sortUsersByPermission = (userList) => {
    // 권한이 true인 사용자를 먼저 오게 하고, 나머지는 그대로 둡니다.
    return [...userList].sort((a, b) => (b.permission - a.permission));
  };
  
  // 컴포넌트가 처음 렌더링될 때, 그리고 users 상태가 바뀔 때마다 정렬
  useEffect(() => {
    setUsers(sortUsersByPermission(users));
  }, []);

  const handleAddManager = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(sortUsersByPermission(updatedUsers));
    }
  };

  const handleSaveUser = (formData) => {
    let updatedUsers;
    if (currentUser) {
      // 사용자 수정
      updatedUsers = users.map(user =>
        user.id === currentUser.id ? { ...user, ...formData } : user
      );
    } else {
      // 새로운 사용자 추가
      const newUser = {
        ...formData,
        id: Date.now(), // 고유 ID 생성
      };
      updatedUsers = [...users, newUser];
    }
    
    // 권한에 따라 정렬한 후 상태 업데이트
    setUsers(sortUsersByPermission(updatedUsers));
    setShowModal(false);
  };

  return (
    <div className="overall-admin-user-management">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li onClick={() => onNavigate('cctv')}>CCTV</li>
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
            <div className="table-column-headers">
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
            </div>
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
                  <button className="control-button settings-button" title="설정" onClick={() => handleEditUser(user)}>
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

      {showModal && (
        <UserModal
          user={currentUser}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}

export default OverallAdminUserManagement;