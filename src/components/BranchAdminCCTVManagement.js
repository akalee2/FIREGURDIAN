// src/components/BranchAdminCCTVManagement.js
import React, { useState } from 'react';
import './OverallAdminCCTVManagement.css'; // 기존 CSS 재사용
import FireGuardianLogo from '../assets/대비로고.png';
import { FaPlus, FaSearch, FaTimes, FaPen, FaTrash, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

// 지점 관리자용 CCTV 관리 컴포넌트
// 해당 지점의 CCTV 목록을 관리합니다.
function BranchAdminCCTVManagement({ onLoginClick, onNavigate }) {
  // 지점의 CCTV 목록 (더미 데이터)
  const [cctvList, setCctvList] = useState([
    { id: 1, name: '지점 CCTV 1', link: 'https://placehold.co/400x250/000000/FFFFFF?text=Branch+CCTV+1', status: 'saved' },
    { id: 2, name: '지점 CCTV 2', link: 'https://placehold.co/400x250/000000/FFFFFF?text=Branch+CCTV+2', status: 'saved' },
  ]);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');
  // 수정 중인 항목의 ID
  const [editingId, setEditingId] = useState(null);
  // 추가 또는 수정 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 현재 모달에서 다루는 CCTV 데이터 (추가 또는 수정)
  const [currentCctv, setCurrentCctv] = useState({ id: null, name: '', link: '', status: 'saved' });

  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // CCTV 추가 모달 열기
  const handleAddClick = () => {
    setCurrentCctv({ id: null, name: '', link: '', status: 'saved' });
    setIsModalOpen(true);
  };

  // CCTV 수정 모달 열기
  const handleEditClick = (cctv) => {
    setEditingId(cctv.id);
    setCurrentCctv(cctv);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  // CCTV 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCctv(prev => ({ ...prev, [name]: value }));
  };

  // CCTV 저장 (추가/수정) 핸들러
  const handleSave = () => {
    if (!currentCctv.name || !currentCctv.link) {
      alert('CCTV 이름과 링크를 모두 입력해주세요.');
      return;
    }

    if (editingId) {
      // 수정
      setCctvList(prevList => prevList.map(cctv => cctv.id === editingId ? currentCctv : cctv));
      alert('CCTV 정보가 수정되었습니다.');
    } else {
      // 추가
      const newId = cctvList.length > 0 ? Math.max(...cctvList.map(c => c.id)) + 1 : 1;
      setCctvList(prevList => [...prevList, { ...currentCctv, id: newId }]);
      alert('새로운 CCTV가 추가되었습니다.');
    }
    handleModalClose();
  };

  // CCTV 삭제 핸들러
  const handleDeleteClick = (id, name) => {
    if (window.confirm(`정말로 CCTV "${name}"을(를) 삭제하시겠습니까?`)) {
      setCctvList(cctvList.filter(cctv => cctv.id !== id));
      alert('CCTV가 삭제되었습니다.');
    }
  };

  // 검색 기능 필터링
  const filteredCctvs = cctvList.filter(cctv =>
    cctv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cctv.link.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="overall-admin-cctv-management">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo" onClick={() => onNavigate('branch_dashboard')} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('branch_dashboard')}>대시보드</li>
              <li onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li className="active" onClick={() => onNavigate('branch_cctv')}>CCTV</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="dashboard-main-container">
        <h1 className="dashboard-title">지점 CCTV 관리</h1>

        <div className="dashboard-content">
          <div className="cctv-list-toolbar">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="CCTV 이름 또는 링크 검색"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button className="add-cctv-button" onClick={handleAddClick}>
              <FaPlus /> CCTV 추가하기
            </button>
          </div>
          <div className="cctv-list-container">
            {filteredCctvs.length > 0 ? (
              <table className="cctv-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CCTV 이름</th>
                    <th>스트리밍 링크</th>
                    <th>상태</th>
                    <th>관리</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCctvs.map(cctv => (
                    <tr key={cctv.id}>
                      <td>{cctv.id}</td>
                      <td>{cctv.name}</td>
                      <td>
                        <a href={cctv.link} target="_blank" rel="noopener noreferrer">
                          {cctv.link}
                        </a>
                      </td>
                      <td>
                        <span className={`status-badge ${cctv.status}`}>
                          {cctv.status === 'saved' ? (
                            <>
                              <FaCheckCircle className="status-icon success" /> 저장됨
                            </>
                          ) : (
                            <>
                              <FaExclamationCircle className="status-icon warning" /> 미저장
                            </>
                          )}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <FaPen className="action-icon edit" title="수정" onClick={() => handleEditClick(cctv)} />
                        <FaTrash className="action-icon delete" title="삭제" onClick={() => handleDeleteClick(cctv.id, cctv.name)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-cctv-message">등록된 CCTV가 없습니다.</p>
            )}
          </div>
        </div>
      </div>

      {/* CCTV 추가/수정 모달 */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingId ? 'CCTV 수정' : 'CCTV 추가'}</h3>
              <FaTimes className="close-modal-icon" onClick={handleModalClose} />
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>CCTV 이름</label>
                <input
                  type="text"
                  name="name"
                  value={currentCctv.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>스트리밍 링크</label>
                <input
                  type="text"
                  name="link"
                  value={currentCctv.link}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-button cancel" onClick={handleModalClose}>취소</button>
              <button className="modal-button save" onClick={handleSave}>저장</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BranchAdminCCTVManagement;
