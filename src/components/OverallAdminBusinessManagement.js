// src/components/OverallAdminBusinessManagement.js
import React, { useState, useEffect } from 'react';
import './OverallAdminBusinessManagement.css';
import FireGuardianLogo from '../assets/로고.png';
import { FaUpload, FaDownload, FaCheckCircle, FaSave, FaTimes, FaPen, FaSearch } from 'react-icons/fa';

function OverallAdminBusinessManagement({ onLoginClick, onNavigate }) {
  // 안전 점수에 따라 상태를 결정하는 함수
  const getScoreStatus = (score) => {
    if (score >= 70) {
      return '안전';
    } else if (score >= 50) {
      return '주의';
    } else {
      return '위험';
    }
  };

  // 전체 사업장 목록 (원본 데이터)
  const [allBranches, setAllBranches] = useState([
    {
      id: 1,
      name: '사업장 1',
      address: '서울 강남구 테헤란로 123',
      manager: '김철수',
      contact: '010-1234-5678',
      lastCheckDate: '2025-07-25',
      specialNotes: '소화기 교체 필요, 비상구 유도등 점검 요망',
      safetyScore: 65, // 안전 점수
    },
    {
      id: 2,
      name: '사업장 2',
      address: '부산 해운대구 센텀시티로 222',
      manager: '박영희',
      contact: '010-9876-5432',
      lastCheckDate: '2025-07-20',
      specialNotes: 'CCTV 교체 필요',
      safetyScore: 85,
    },
    {
      id: 3,
      name: '사업장 3',
      address: '인천 연수구 송도과학로 333',
      manager: '이민준',
      contact: '010-1111-2222',
      lastCheckDate: '2025-07-18',
      specialNotes: '화재경보기 점검 필요',
      safetyScore: 50,
    },
    {
      id: 4,
      name: '사업장 4',
      address: '대전 유성구 대학로 444',
      manager: '최지우',
      contact: '010-3333-4444',
      lastCheckDate: '2025-07-10',
      specialNotes: '소방시설 종합정밀점검 요망',
      safetyScore: 75,
    },
    {
      id: 5,
      name: '사업장 5',
      address: '광주 서구 상무중앙로 555',
      manager: '정대현',
      contact: '010-5555-6666',
      lastCheckDate: '2025-07-05',
      specialNotes: '피난 유도선 재설치 필요',
      safetyScore: 90,
    },
  ].map(branch => ({...branch, scoreStatus: getScoreStatus(branch.safetyScore)})));


  // 현재 선택된 사업장 (기본값은 allBranches[0]으로 설정)
  const [selectedBranch, setSelectedBranch] = useState(allBranches[0]);
  // 사업장 정보 수정 모드 여부
  const [isEditing, setIsEditing] = useState(false);
  // 수정 중인 사업장 정보 (수정 취소 시 원본 유지를 위해 별도 관리)
  const [editedBranch, setEditedBranch] = useState(selectedBranch);

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');
  // 검색 결과 하이라이트를 위한 state (실제 목록을 필터링하진 않음)
  const [highlightedBranchId, setHighlightedBranchId] = useState(null);


  // 선택된 사업장이 변경될 때마다 editedBranch를 업데이트
  useEffect(() => {
    setEditedBranch(selectedBranch);
    setIsEditing(false); // 사업장 변경 시 수정 모드 자동 해제
  }, [selectedBranch]);

  // 검색어 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setHighlightedBranchId(null); // 검색어 변경 시 하이라이트 초기화
  };

  // 사업장 검색 실행 핸들러
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setHighlightedBranchId(null);
      alert('검색어를 입력해주세요.');
      return;
    }

    const foundBranch = allBranches.find(branch =>
      branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundBranch) {
      setSelectedBranch(foundBranch); // 찾은 사업장으로 메인 화면 정보 변경
      setHighlightedBranchId(foundBranch.id); // 사이드바에서 해당 항목 하이라이트
      // 필요하다면 사이드바 스크롤도 추가할 수 있습니다.
      const element = document.getElementById(`branch-${foundBranch.id}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    } else {
      setSelectedBranch(allBranches[0]); // 찾지 못하면 첫번째 사업장으로 되돌리거나, 빈 화면을 보여줄 수 있습니다.
      setHighlightedBranchId(null);
      alert(`'${searchTerm}'에 해당하는 사업장을 찾을 수 없습니다.`);
    }
  };

  // 사업장 정보 수정 모드 토글 (이름 변경)
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    if (isEditing) { // 수정 모드를 끄는 경우 (취소)
      setEditedBranch(selectedBranch); // 변경사항 되돌리기
    }
  };

  // 수정 중인 사업장 정보 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBranch(prev => ({ ...prev, [name]: value }));
  };

  // 사업장 정보 저장 핸들러
  const handleSave = () => {
    // allBranches 업데이트
    setAllBranches(prevBranches =>
      prevBranches.map(branch =>
        branch.id === editedBranch.id ? editedBranch : branch
      )
    );
    // 선택된 사업장 정보 업데이트
    setSelectedBranch(editedBranch);
    setIsEditing(false); // 수정 모드 종료
    alert('사업장 정보가 성공적으로 저장되었습니다!');
  };


  // 감점 사유 로그 상태
  const [deductionLogs] = useState([
    { id: 1, date: '2025-07-20', reason: '소화기 압력 미달 (3개)' },
    { id: 2, date: '2025-07-20', reason: '비상구 유도등 불량 (1개)' },
    { id: 3, date: '2025-07-15', reason: '화재 감지기 오작동 (1개)' },
    { id: 4, date: '2025-07-10', reason: '피난 안내도 훼손 (1개)' },
    { id: 5, date: '2025-07-05', reason: '스프링클러 헤드 오염 (2개)' },
  ]);

  // 파일 업로드 상태
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // 파일 업로드 핸들러
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(f => f.name);
    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    alert(`${newFiles.length}개의 파일이 추가되었습니다.`);
  };

  // 파일 삭제 핸들러
  const handleDeleteFile = (fileNameToDelete) => {
    setUploadedFiles(prevFiles => prevFiles.filter(name => name !== fileNameToDelete));
    alert(`${fileNameToDelete} 파일이 삭제되었습니다.`);
  };


  // 통합 분석 보고서 다운로드
  const handleDownloadReport = () => {
    alert('통합 분석 보고서를 다운로드합니다. (실제 기능 아님)');
  };


  return (
    <div className="overall-admin-business-management">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          {/* 로고 클릭 시 대시보드로 이동 */}
          <div className="header-logo" onClick={() => onNavigate('dashboard')} style={{ cursor: 'pointer' }}>
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              <li onClick={() => onNavigate('dashboard')}>대시보드</li>
              <li className="active" onClick={() => onNavigate('business_management')}>사업장관리</li>
              <li onClick={() => onNavigate('cctv')}>CCTV</li>
              <li onClick={() => onNavigate('user_management')}>사용자 관리</li>
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="dashboard-main-container">
        <h1 className="dashboard-title">{selectedBranch.name} 안전 현황</h1> {/* 선택된 사업장 이름 반영 */}

        <div className="content-layout-grid">
          {/* 왼쪽 사이드바 - 사업장 검색 및 목록 */}
          <div className="sidebar-section">
            <div className="sidebar-search-box">
              <input
                type="text"
                placeholder="사업장 검색"
                className="sidebar-search-input"
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }} // 엔터키로 검색
              />
              <button className="sidebar-search-button" onClick={handleSearch}>
                <FaSearch /> 검색
              </button>
            </div>
            <div className="sidebar-place-list">
              <div className="list-title">사업장 목록</div>
              <ul>
                {allBranches.length > 0 ? (
                  allBranches.map(branch => (
                    <li
                      key={branch.id}
                      id={`branch-${branch.id}`} // 스크롤 이동을 위한 ID 추가
                      className={`${selectedBranch.id === branch.id ? 'active' : ''} ${highlightedBranchId === branch.id ? 'highlight' : ''}`}
                      onClick={() => setSelectedBranch(branch)}
                    >
                      {branch.name}
                    </li>
                  ))
                ) : (
                  <li className="no-results">등록된 사업장이 없습니다.</li>
                )}
              </ul>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="main-content-area">
            <div className="main-content-grid-inner">
              {/* 사업장 정보 섹션 */}
              <div className="grid-item business-info-section">
                <div className="item-title">
                  사업장 정보
                  <div className="edit-buttons">
                    {isEditing ? (
                      <>
                        <FaSave className="action-icon save-icon" title="저장" onClick={handleSave} />
                        <FaTimes className="action-icon cancel-icon" title="취소" onClick={toggleEditMode} />
                      </>
                    ) : (
                      <FaPen className="edit-icon" title="수정" onClick={toggleEditMode} />
                    )}
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-label">사업장명</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={editedBranch.name}
                      onChange={handleInputChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{selectedBranch.name}</span>
                  )}
                </div>
                <div className="info-row">
                  <span className="info-label">주소</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address"
                      value={editedBranch.address}
                      onChange={handleInputChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{selectedBranch.address}</span>
                  )}
                </div>
                <div className="info-row">
                  <span className="info-label">관리자</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="manager"
                      value={editedBranch.manager}
                      onChange={handleInputChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{selectedBranch.manager}</span>
                  )}
                </div>
                <div className="info-row">
                  <span className="info-label">연락처</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="contact"
                      value={editedBranch.contact}
                      onChange={handleInputChange}
                      className="info-input"
                    />
                  ) : (
                    <span className="info-value">{selectedBranch.contact}</span>
                  )}
                </div>
                <div className="info-row">
                  <span className="info-label">최종 점검일</span>
                  <span className="info-value">{selectedBranch.lastCheckDate}</span>
                </div>
                <div className="info-row special-notes">
                  <span className="info-label">특이사항</span>
                  {isEditing ? (
                    <textarea
                      name="specialNotes"
                      value={editedBranch.specialNotes}
                      onChange={handleInputChange}
                      className="info-textarea"
                    />
                  ) : (
                    <span className="info-value">{selectedBranch.specialNotes}</span>
                  )}
                </div>
              </div>

              {/* 안전 점수 및 파일 업로드 섹션 */}
              <div className="grid-item safety-score-section">
                <div className="item-title">안전 점수 및 관리 파일</div>
                <div className="score-display">
                  <div className={`score-circle-large ${selectedBranch.scoreStatus === '안전' ? 'safe' : selectedBranch.scoreStatus === '주의' ? 'warning' : 'danger'}`}>
                    <span className="score-value-large">{selectedBranch.safetyScore}</span>
                  </div>
                  <div className={`score-status-label ${selectedBranch.scoreStatus === '안전' ? 'safe' : selectedBranch.scoreStatus === '주의' ? 'warning' : 'danger'}`}>
                    {selectedBranch.scoreStatus}
                  </div>
                  <div className="score-description">
                    <span className="highlight-score">{selectedBranch.name}</span>의 현재 안전 점수입니다.<br />
                    안전 점수가 낮을 경우, 주요 감점 사유를 확인해 주세요.
                  </div>
                </div>

                <h3 className="item-title file-upload-title">관리 파일</h3>
                <div className="file-upload-box">
                  <input
                    type="file"
                    id="file-upload-input"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleFileUpload}
                  />
                  <button
                    className="file-upload-button"
                    onClick={() => document.getElementById('file-upload-input').click()}
                  >
                    <FaUpload /> 파일 업로드
                  </button>
                  {uploadedFiles.length > 0 ? (
                    <ul className="uploaded-files-list">
                      {uploadedFiles.map((file, index) => (
                        <li key={index} className="uploaded-file-item">
                          <span className="upload-check-icon"><FaCheckCircle /></span>
                          <span className="file-name">{file}</span>
                          <button
                            className="delete-file-button"
                            onClick={() => handleDeleteFile(file)}
                            title="파일 삭제"
                          >
                            <FaTimes />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-files-message">업로드된 파일이 없습니다.</p>
                  )}
                </div>
              </div>

              {/* 감점 사유 및 보고서 섹션 */}
              <div className="grid-item overall-analysis-report-section">
                <h3 className="item-title overall-deduction-title">주요 감점 사유</h3>
                <div className="overall-deduction-log-box">
                  <ul>
                    {deductionLogs.length > 0 ? (
                      deductionLogs.map(log => (
                        <li key={log.id}>
                          <span className="log-date">[{log.date}]</span> {log.reason}
                        </li>
                      ))
                    ) : (
                      <p className="no-log-message">최근 감점 사유 내역이 없습니다.</p>
                    )}
                  </ul>
                </div>
                <button className="overall-download-report-button" onClick={handleDownloadReport}>
                  <FaDownload /> 통합 분석 보고서 다운로드
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverallAdminBusinessManagement;
