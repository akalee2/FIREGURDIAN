import React, { useState, useEffect } from 'react';
import './OverallAdminCCTVManagement.css';
import FireGuardianLogo from '../assets/로고.png';
import { FaCheckCircle, FaTimesCircle, FaEdit, FaTrashAlt, FaChevronUp, FaChevronDown, FaPlus } from 'react-icons/fa';

function OverallAdminCCTVManagement({ onLoginClick, onNavigate, cctvList, setCctvList }) {
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const [newCctvName, setNewCctvName] = useState('');
  const [newCctvLink, setNewCctvLink] = useState('');

  useEffect(() => {
    console.log("CCTV 목록이 변경되었습니다. 현재 목록:", cctvList);
  }, [cctvList]);

  const handleAddCctv = () => {
    if (newCctvName.trim() === '' || newCctvLink.trim() === '') {
      alert('CCTV 이름과 링크를 모두 입력해주세요.');
      return;
    }
    const newId = cctvList.length > 0 ? Math.max(...cctvList.map(c => c.id)) + 1 : 1;
    const newCctv = {
      id: newId,
      name: newCctvName.trim(),
      link: newCctvLink.trim(),
      status: 'saved',
    };
    setCctvList([...cctvList, newCctv]);
    setNewCctvName('');
    setNewCctvLink('');
  };

  const handleEditClick = (id) => {
    setEditingId(id);
    const cctvToEdit = cctvList.find(c => c.id === id);
    if (cctvToEdit) {
      setEditedName(cctvToEdit.name);
      setEditedLink(cctvToEdit.link);
    }
  };

  const handleSaveClick = (id) => {
    const updatedList = cctvList.map(cctv =>
      cctv.id === id ? { ...cctv, name: editedName, link: editedLink, status: 'saved' } : cctv
    );
    setCctvList(updatedList);
    setEditingId(null);
  };

  const handleCancelClick = () => {
    setEditingId(null);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('정말로 이 CCTV를 삭제하시겠습니까?')) {
      setCctvList(cctvList.filter(cctv => cctv.id !== id));
    }
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newCctvList = [...cctvList];
    const [cctvToMove] = newCctvList.splice(index, 1);
    newCctvList.splice(index - 1, 0, cctvToMove);
    setCctvList(newCctvList);
  };

  const handleMoveDown = (index) => {
    if (index === cctvList.length - 1) return;
    const newCctvList = [...cctvList];
    const [cctvToMove] = newCctvList.splice(index, 1);
    newCctvList.splice(index + 1, 0, cctvToMove);
    setCctvList(newCctvList);
  };

  return (
    <div className="cctv-management-page">
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
              <li className="active">CCTV 관리</li>
              <li onClick={() => onNavigate('user_management')}>사용자 관리</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      <div className="management-main-container">
        <h1 className="management-title">CCTV 관리</h1>
        <div className="management-content">
          <div className="cctv-add-section">
            <input
              type="text"
              placeholder="CCTV 이름"
              value={newCctvName}
              onChange={(e) => setNewCctvName(e.target.value)}
              className="cctv-input"
            />
            <input
              type="text"
              placeholder="CCTV 링크"
              value={newCctvLink}
              onChange={(e) => setNewCctvLink(e.target.value)}
              className="cctv-input"
            />
            <button className="add-cctv-btn" onClick={handleAddCctv}>
              <FaPlus /> 추가
            </button>
          </div>

          <div className="cctv-table-container">
            <table className="cctv-table">
              <thead>
                <tr>
                  <th>CCTV 이름</th>
                  <th>CCTV 링크</th>
                  <th>상태</th>
                  <th>순서</th>
                  <th>기능</th>
                </tr>
              </thead>
              <tbody>
                {cctvList.map((cctv, index) => (
                  <tr key={cctv.id}>
                    {editingId === cctv.id ? (
                      <>
                        <td>
                          <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={editedLink}
                            onChange={(e) => setEditedLink(e.target.value)}
                            className="edit-input"
                          />
                        </td>
                        <td>
                          <FaEdit className="status-icon edit-icon" />
                        </td>
                        <td></td>
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => handleSaveClick(cctv.id)} className="save-btn">
                              저장
                            </button>
                            <button onClick={handleCancelClick} className="cancel-btn">
                              취소
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{cctv.name}</td>
                        <td>{cctv.link}</td>
                        <td>
                          {cctv.status === 'saved' ? (
                            <FaCheckCircle className="status-icon saved-icon" />
                          ) : (
                            <FaTimesCircle className="status-icon error-icon" />
                          )}
                        </td>
                        <td className="order-buttons-cell">
                          <div className="order-buttons">
                            <button onClick={() => handleMoveUp(index)} disabled={index === 0}>
                              <FaChevronUp />
                            </button>
                            <button onClick={() => handleMoveDown(index)} disabled={index === cctvList.length - 1}>
                              <FaChevronDown />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <button onClick={() => handleEditClick(cctv.id)} className="action-btn edit-btn">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteClick(cctv.id)} className="action-btn delete-btn">
                              <FaTrashAlt />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallAdminCCTVManagement;