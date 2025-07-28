// src/components/BranchAdminDashboard.js
import React, { useState } from 'react';
import './BranchAdminDashboard.css';
import FireGuardianLogo from '../assets/로고.png'; // 기존 로고 이미지 재사용
import { FaPencilAlt, FaPlus, FaDownload, FaChevronDown, FaCheckCircle } from 'react-icons/fa'; // 아이콘 사용

function BranchAdminDashboard({ onLoginClick, onNavigate }) {
  // 현재 선택된 장소 (예시 데이터)
  const [selectedPlace, setSelectedPlace] = useState({
    id: 1,
    name: '장소 1',
    address: '서울 강남구 테헤란로 123',
    manager: '김철수',
    contact: '010-1234-5678',
    lastCheckDate: '2025-07-25',
    specialNotes: '소화기 교체 필요, 비상구 유도등 점검 요망',
    safetyScore: 65, // 안전 점수
    scoreStatus: '주의', // 주의, 안전, 위험 등
  });

  // 장소 목록 (사이드바용 예시 데이터)
  const [places, setPlaces] = useState([
    { id: 1, name: '장소 1' },
    { id: 2, name: '장소 2' },
    { id: 3, name: '장소 3' },
    { id: 4, name: '장소 4' },
    { id: 5, name: '장소 5' },
  ]);

  // 분석 보고서 드롭다운 상태
  const [cctvReport, setCctvReport] = useState('');
  const [drawingReport, setDrawingReport] = useState('');
  const [legalReport, setLegalReport] = useState('');

  // 감점 사유 로그 상태
  const [deductionLogs, setDeductionLogs] = useState([
    { id: 1, date: '2025-07-20', reason: '소화기 압력 미달 (3개)' },
    { id: 2, date: '2025-07-20', reason: '비상구 유도등 불량 (1개)' },
    { id: 3, date: '2025-07-15', reason: '화재 감지기 오작동 (1개)' },
    { id: 4, date: '2025-07-10', reason: '피난 안내도 훼손 (1개)' },
    { id: 5, date: '2025-07-05', reason: '스프링클러 헤드 오염 (2개)' },
  ]);

  // 파일 업로드 상태 (임시)
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // 파일 업로드 핸들러
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles((prevFiles) => [...prevFiles, ...files.map(f => f.name)]);
    alert(`${files.length}개의 파일이 추가되었습니다.`);
  };

  // 통합 분석 보고서 다운로드
  const handleDownloadReport = () => {
    alert('통합 분석 보고서를 다운로드합니다. (실제 기능 아님)');
  };

  return (
    <div className="branch-admin-dashboard">
      {/* 상단 헤더 바 */}
      <div className="dashboard-header-bar">
        <div className="header-left">
          <div className="header-logo">
            <img src={FireGuardianLogo} alt="Fire Guardian Logo" className="header-logo-img" />
          </div>
          <nav className="main-nav">
            <ul>
              {/* 지점관리자용 메뉴: 사업장관리, CCTV만 표시 */}
              <li className="active" onClick={() => onNavigate('branch_dashboard')}>사업장관리</li> {/* 메인 페이지 역할 */}
              <li onClick={() => onNavigate('branch_cctv')}>CCTV</li>
              {/* <li onClick={() => onNavigate('user_management')}>사용자 관리 (지점관리자용은 없음)</li> */}
            </ul>
          </nav>
        </div>
        <button className="header-login-button" onClick={onLoginClick}>
          로그아웃
        </button>
      </div>

      {/* 메인 컨테이너 */}
      <div className="dashboard-main-container">
        <h1 className="dashboard-title">사업장 1 안전 현황</h1> {/* 선택된 장소 이름 반영 */}

        <div className="content-layout-grid">
          {/* 왼쪽 사이드바 - 장소 검색 및 목록 */}
          <div className="sidebar-section">
            <div className="sidebar-search-box">
              <input type="text" placeholder="장소 검색" className="sidebar-search-input" />
              <button className="sidebar-search-button">검색</button>
            </div>
            <div className="sidebar-place-list"> {/* 클래스명 변경 */}
              <div className="list-title">장소 검색</div>
              <ul>
                {places.map(place => (
                  <li key={place.id} className={selectedPlace.id === place.id ? 'active' : ''} onClick={() => setSelectedPlace(place)}>
                    {place.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div className="main-content-area">
            <div className="main-content-grid-inner">
              {/* 사업장 정보 섹션 */}
              <div className="grid-item business-info-section">
                <div className="item-title">
                  사업장 정보 <FaPencilAlt className="edit-icon" title="수정" />
                </div>
                <div className="info-row">
                  <span className="info-label">사업장명</span>
                  <span className="info-value">{selectedPlace.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">주소</span>
                  <span className="info-value">{selectedPlace.address}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">관리자</span>
                  <span className="info-value">{selectedPlace.manager}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">연락처</span>
                  <span className="info-value">{selectedPlace.contact}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">최근 점검일</span>
                  <span className="info-value">{selectedPlace.lastCheckDate}</span>
                </div>
                <div className="info-row special-notes">
                  <span className="info-label">특이사항</span>
                  <span className="info-value">{selectedPlace.specialNotes}</span>
                </div>
              </div>

              {/* 안전 점수 및 파일 업로드 섹션 */}
              <div className="grid-item safety-score-section">
                <div className="item-title">안전 점수</div>
                <div className="score-display">
                  <div className="score-circle-large" style={{ 
                      borderColor: selectedPlace.safetyScore >= 80 ? '#28a745' : (selectedPlace.safetyScore >= 60 ? '#ffc107' : '#dc3545'),
                      background: `conic-gradient(
                        ${selectedPlace.safetyScore >= 80 ? '#28a745' : (selectedPlace.safetyScore >= 60 ? '#ffc107' : '#dc3545')} ${selectedPlace.safetyScore * 3.6}deg, 
                        #f0f0f0 ${selectedPlace.safetyScore * 3.6}deg 360deg
                      )`
                  }}>
                    <div className="score-value-large">{selectedPlace.safetyScore}</div>
                  </div>
                  <div className="score-status-label">{selectedPlace.scoreStatus}</div>
                  <p className="score-description">
                    현재 안전 점수는 <span className="highlight-score">{selectedPlace.safetyScore} [{selectedPlace.scoreStatus}]</span> 입니다.<br />
                    단기 개선이 필요합니다.
                  </p>
                </div>

                <div className="item-title file-upload-title">파일 업로드</div>
                <div className="file-upload-box">
                  <input type="file" id="file-upload" multiple onChange={handleFileUpload} style={{ display: 'none' }} />
                  <label htmlFor="file-upload" className="file-upload-button">
                    <FaPlus /> 도면 추가하기
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="uploaded-files-list">
                      {uploadedFiles.map((fileName, index) => (
                        <p key={index} className="uploaded-file-item">
                          <FaCheckCircle className="upload-check-icon" /> {fileName}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 분석 보고서 및 감점 사유 섹션 */}
              <div className="grid-item analysis-report-section">
                <div className="item-title">분석 보고서</div>
                <div className="report-dropdown-group">
                  <select className="report-dropdown" value={cctvReport} onChange={(e) => setCctvReport(e.target.value)}>
                    <option value="">CCTV 영상 분석 결과</option>
                    <option value="cctv_report_1">CCTV 보고서 2025-07-01</option>
                    <option value="cctv_report_2">CCTV 보고서 2025-06-15</option>
                  </select>
                  <FaChevronDown className="dropdown-arrow-icon" />
                </div>
                <div className="report-dropdown-group">
                  <select className="report-dropdown" value={drawingReport} onChange={(e) => setDrawingReport(e.target.value)}>
                    <option value="">사업장 도면 분석 결과</option>
                    <option value="drawing_report_1">도면 보고서 2025-07-01</option>
                    <option value="drawing_report_2">도면 보고서 2025-06-01</option>
                  </select>
                  <FaChevronDown className="dropdown-arrow-icon" />
                </div>
                <div className="report-dropdown-group">
                  <select className="report-dropdown" value={legalReport} onChange={(e) => setLegalReport(e.target.value)}>
                    <option value="">법적 기준 분석 결과</option>
                    <option value="legal_report_1">법적 보고서 2025-07-01</option>
                    <option value="legal_report_2">법적 보고서 2025-05-20</option>
                  </select>
                  <FaChevronDown className="dropdown-arrow-icon" />
                </div>

                <div className="item-title deduction-title">감점 사유</div>
                <div className="deduction-log-box">
                  {deductionLogs.length > 0 ? (
                    <ul>
                      {deductionLogs.map(log => (
                        <li key={log.id}>
                          <span className="log-date">[{log.date}]</span> {log.reason}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-log-message">등록된 감점 사유가 없습니다.</p>
                  )}
                </div>

                <button className="download-report-button" onClick={handleDownloadReport}>
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

export default BranchAdminDashboard;
