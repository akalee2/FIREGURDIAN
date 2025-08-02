// src/components/BranchAdminDashboard.js

import React, { useState, useEffect } from 'react';
import './BranchAdminDashboard.css';
import FireGuardianLogo from '../assets/대비로고.png'; // 로고 이미지 경로 확인
import { FaUpload, FaDownload, FaChevronDown, FaCheckCircle, FaSave, FaTimes, FaPen } from 'react-icons/fa';

function BranchAdminDashboard({ onLoginClick, onNavigate }) {
    // --- Mock Data (실제 환경에서는 API 호출로 받아옵니다) ---
    const mockPlaces = [
        {
            id: 'place-1',
            name: '장소 1',
            address: '서울 강남구 테헤란로 123',
            manager: '김철수',
            contact: '010-1234-5678',
            lastCheckDate: '2025-07-25',
            specialNotes: '소화기 교체 필요, 비상구 유도등 점검 요망.',
            safetyScore: 65,
            scoreStatus: '양호',
            drawingFiles: [
                { id: 'file-101', name: '장소1_도면_최종본.pdf' },
                { id: 'file-102', name: '장소1_비상구_안내도.jpg' },
            ],
            deductionLogs: [
                { id: 1, date: '2025-07-20', reason: '소화기 압력 미달 (3개)' },
                { id: 2, date: '2025-07-20', reason: '비상구 유도등 불량 (1개)' },
                { id: 3, date: '2025-07-15', reason: '화재 감지기 오작동 (1개)' },
            ]
        },
        {
            id: 'place-2',
            name: '장소 2 ',
            address: '경기도 성남시 분당구 456-78',
            manager: '이영희',
            contact: '010-9876-5432',
            lastCheckDate: '2025-07-28',
            specialNotes: '오후 5시 이후 차량 혼잡 주의.',
            safetyScore: 88,
            scoreStatus: '위험',
            drawingFiles: [
                { id: 'file-201', name: '미술학원_전체도면_2024.pdf' },
            ],
            deductionLogs: [
                { id: 4, date: '2025-07-29', reason: '자동화재탐지설비 미작동 (감점 10점)' },
                { id: 5, date: '2025-07-22', reason: '유도등 불량 (감점 5점)' },
            ]
        },
        {
            id: 'place-3',
            name: '장소 3',
            address: '부산광역시 해운대구 901-23',
            manager: '박지민',
            contact: '010-3333-2222',
            lastCheckDate: '2025-07-10',
            specialNotes: '주차 공간 협소.',
            safetyScore: 92,
            scoreStatus: '위험',
            drawingFiles: [],
            deductionLogs: [
                { id: 6, date: '2025-07-10', reason: '피난 안내도 훼손 (1개)' },
            ]
        },
    ];
    // ---------------------------------------------------------------------

    // State 관리
    const [places, setPlaces] = useState(mockPlaces); // 전체 장소 목록
    const [selectedPlaceId, setSelectedPlaceId] = useState(mockPlaces[0]?.id || null); // 현재 선택된 장소의 ID
    const [isEditing, setIsEditing] = useState(false); // 사업장 정보 수정 모드 상태
    const [editedPlace, setEditedPlace] = useState({}); // 수정 중인 데이터를 임시로 저장할 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태

    // 현재 선택된 장소 객체 (selectedPlaceId 기반)
    const currentSelectedPlace = places.find(p => p.id === selectedPlaceId);

    // useEffect를 사용하여 selectedPlaceId가 변경될 때마다 editedPlace를 업데이트
    useEffect(() => {
        if (currentSelectedPlace) {
            setEditedPlace(currentSelectedPlace);
            setIsEditing(false); // 장소 변경 시 수정 모드 해제
        }
    }, [selectedPlaceId, currentSelectedPlace]);

    // 분석 보고서 드롭다운 상태
    const [cctvReport, setCctvReport] = useState('');
    const [drawingReport, setDrawingReport] = useState('');
    const [legalReport, setLegalReport] = useState('');

    // 보고서 내용 표시를 위한 새로운 State 추가
    const [cctvReportContent, setCctvReportContent] = useState('');
    const [drawingReportContent, setDrawingReportContent] = useState('');
    const [legalReportContent, setLegalReportContent] = useState('');


    // --- 이벤트 핸들러 ---

    // 지점(장소) 선택 핸들러
    const handlePlaceSelect = (id) => {
        setSelectedPlaceId(id);
        // 장소 변경 시 보고서 내용 초기화
        setCctvReport('');
        setDrawingReport('');
        setLegalReport('');
        setCctvReportContent('');
        setDrawingReportContent('');
        setLegalReportContent('');
    };

    // 검색 입력 필드 변경 핸들러
    const handleSearchInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // 검색 버튼 핸들러
    const handleSearch = () => {
        const foundPlace = places.find(place =>
            place.name.includes(searchTerm) ||
            place.address.includes(searchTerm) ||
            place.manager.includes(searchTerm)
        );

        if (foundPlace) {
            setSelectedPlaceId(foundPlace.id);
            setSearchTerm(''); // 검색 후 검색창 비우기
        } else {
            alert(`'${searchTerm}' 에 해당하는 장소를 찾을 수 없습니다.`);
        }
    };

    // 입력 필드 변경 핸들러 (사업장 정보 수정용)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPlace(prev => ({ ...prev, [name]: value }));
    };

    // 수정 모드 토글
    const toggleEditMode = () => {
        setIsEditing(true); // 수정 모드 진입
        setEditedPlace(currentSelectedPlace); // 현재 선택된 장소의 정보를 editedPlace에 복사
    };

    // 저장 버튼 핸들러
    const handleSave = () => {
        // 실제 백엔드 API 호출 등을 통해 데이터 업데이트 로직 필요
        console.log('사업장 정보 저장:', editedPlace);

        // Mock data 업데이트: 전체 places 배열에서 해당 장소만 editedPlace로 교체
        setPlaces(prevPlaces => prevPlaces.map(place =>
            place.id === editedPlace.id ? editedPlace : place
        ));
        setIsEditing(false); // 수정 모드 종료
        alert('사업장 정보가 저장되었습니다.');
    };

    // 취소 버튼 핸들러
    const handleCancel = () => {
        setEditedPlace(currentSelectedPlace); // 변경사항 되돌리기 (원래 selectedPlace 정보로)
        setIsEditing(false); // 수정 모드 종료
    };

    // 도면 파일 업로드 핸들러
    const handleDrawingFileUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0 && currentSelectedPlace) {
            const newFiles = files.map(file => ({
                name: file.name,
                id: Date.now() + '-' + Math.random().toString(36).substring(2, 9), // 고유 ID 생성
                url: URL.createObjectURL(file) // 미리보기 URL (선택 사항)
            }));

            // Mock data 업데이트 (실제로는 서버 업로드 후 응답에 따라 업데이트)
            setPlaces(prevPlaces => prevPlaces.map(place =>
                place.id === selectedPlaceId
                    ? { ...place, drawingFiles: [...(place.drawingFiles || []), ...newFiles] }
                    : place
            ));
            console.log("새 파일 추가:", newFiles);
            event.target.value = null; // 같은 파일 다시 선택 가능하도록
        }
    };

    // 도면 파일 삭제 핸들러
    const handleDrawingFileDelete = (fileIdToDelete) => {
        if (!currentSelectedPlace) return;

        // 실제 환경에서는 여기에 서버에 파일 삭제 요청을 보내는 로직을 추가합니다.
        // 서버에서 삭제 성공 응답을 받은 후, state를 업데이트합니다.
        setPlaces(prevPlaces => prevPlaces.map(place =>
            place.id === selectedPlaceId
                ? { ...place, drawingFiles: (place.drawingFiles || []).filter(file => file.id !== fileIdToDelete) }
                : place
        ));
        console.log("파일 삭제:", fileIdToDelete);
    };

    // 통합 분석 보고서 다운로드
    const handleDownloadReport = () => {
        alert('통합 분석 보고서를 다운로드합니다. (실제 기능 아님)');
    };

    // 드롭다운 선택 변경 시 보고서 내용 업데이트
    const handleReportChange = (e, reportType) => {
        const value = e.target.value;
        let content = '';

        // 실제로는 여기에서 value(보고서 ID 등)를 사용하여 서버에서 해당 보고서 내용을 가져옵니다.
        // 지금은 예시 데이터를 사용합니다.
        if (value) { // '선택 안 함'이 아닐 경우에만 내용 표시
            switch (reportType) {
                case 'cctv':
                    setCctvReport(value);
                    if (value === 'cctv_report_1') content = 'CCTV 보고서 2025-07-01: 최근 한 달간 침입 시도 2회 감지, 수상한 움직임 5회 포착. 전반적으로 양호하나, 특정 시간대 모니터링 강화 필요.';
                    else if (value === 'cctv_report_2') content = 'CCTV 보고서 2025-06-15: 건물 주변 이상 없음. 비상 상황 발생 시 비상벨 위치 안내 시스템 정상 작동 확인.';
                    break;
                case 'drawing':
                    setDrawingReport(value);
                    if (value === 'drawing_report_1') content = '도면 보고서 2025-07-01: 비상구 유도등 위치 및 개수 법규 준수. 소화기 비치 간격 적정.';
                    else if (value === 'drawing_report_2') content = '도면 보고서 2025-06-01: 피난 경로 일부 구간 물품 적재 확인, 시정 조치 필요.';
                    break;
                case 'legal':
                    setLegalReport(value);
                    if (value === 'legal_report_1') content = '법적 보고서 2025-07-01: 소방시설 설치 및 관리 법률 제 10조 준수. 피난 유도선 설치 기준 충족.';
                    else if (value === 'legal_report_2') content = '법적 보고서 2025-05-20: 비상구 출구 폭 기준 미달 (구형 건물). 개선 방안 검토 중.';
                    break;
                default:
                    break;
            }
        } else { // '선택 안 함'을 선택한 경우 내용 초기화
            switch (reportType) {
                case 'cctv': setCctvReport(''); setCctvReportContent(''); break;
                case 'drawing': setDrawingReport(''); setDrawingReportContent(''); break;
                case 'legal': setLegalReport(''); setLegalReportContent(''); break;
                default: break;
            }
        }

        // 해당 보고서 타입의 내용을 업데이트
        if (reportType === 'cctv') setCctvReportContent(content);
        else if (reportType === 'drawing') setDrawingReportContent(content);
        else if (reportType === 'legal') setLegalReportContent(content);
    };


    // 선택된 장소가 없을 경우 로딩 메시지
    if (!currentSelectedPlace) {
        return (
            <div className="branch-admin-dashboard">
                <div className="dashboard-main-container">
                    <p>장소 정보를 불러오는 중입니다...</p>
                </div>
            </div>
        );
    }

    // --- 렌더링 ---
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
                            <li className="active" onClick={() => onNavigate('branch_dashboard')}>사업장관리</li>
                            <li onClick={() => onNavigate('branch_cctv')}>CCTV</li>
                        </ul>
                    </nav>
                </div>
                <button className="header-login-button" onClick={onLoginClick}>
                    로그아웃
                </button>
            </div>

            {/* 메인 컨테이너 */}
            <div className="dashboard-main-container">
                <h1 className="dashboard-title">{currentSelectedPlace.name} 안전 현황</h1>

                <div className="content-layout-grid">
                    {/* 왼쪽 사이드바 - 장소 검색 및 목록 */}
                    <div className="sidebar-section">
                        <div className="sidebar-search-box">
                            <input
                                type="text"
                                placeholder="장소 검색"
                                className="sidebar-search-input"
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                onKeyPress={(e) => { // 엔터 키로 검색 가능하게 추가
                                    if (e.key === 'Enter') {
                                        handleSearch();
                                    }
                                }}
                            />
                            <button className="sidebar-search-button" onClick={handleSearch}>검색</button>
                        </div>
                        <div className="sidebar-place-list">
                            <div className="list-title">장소 목록</div>
                            <ul>
                                {places.map(place => (
                                    <li
                                        key={place.id}
                                        className={currentSelectedPlace.id === place.id ? 'active' : ''}
                                        onClick={() => handlePlaceSelect(place.id)}
                                    >
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
                                    사업장 정보
                                    {isEditing ? (
                                        <div className="edit-buttons">
                                            <FaSave className="action-icon save-icon" title="저장" onClick={handleSave} />
                                            <FaTimes className="action-icon cancel-icon" title="취소" onClick={handleCancel} />
                                        </div>
                                    ) : (
                                        <FaPen className="edit-icon" title="수정" onClick={toggleEditMode} />
                                    )}
                                </div>
                                <div className="info-row">
                                    <span className="info-label">사업장명</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedPlace.name || ''}
                                            onChange={handleInputChange}
                                            className="info-input"
                                        />
                                    ) : (
                                        <span className="info-value">{currentSelectedPlace.name}</span>
                                    )}
                                </div>
                                <div className="info-row">
                                    <span className="info-label">주소</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="address"
                                            value={editedPlace.address || ''}
                                            onChange={handleInputChange}
                                            className="info-input"
                                        />
                                    ) : (
                                        <span className="info-value">{currentSelectedPlace.address}</span>
                                    )}
                                </div>
                                <div className="info-row">
                                    <span className="info-label">관리자</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="manager"
                                            value={editedPlace.manager || ''}
                                            onChange={handleInputChange}
                                            className="info-input"
                                        />
                                    ) : (
                                        <span className="info-value">{currentSelectedPlace.manager}</span>
                                    )}
                                </div>
                                <div className="info-row">
                                    <span className="info-label">연락처</span>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="contact"
                                            value={editedPlace.contact || ''}
                                            onChange={handleInputChange}
                                            className="info-input"
                                        />
                                    ) : (
                                        <span className="info-value">{currentSelectedPlace.contact}</span>
                                    )}
                                </div>
                                <div className="info-row">
                                    <span className="info-label">최근 점검일</span>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            name="lastCheckDate"
                                            value={editedPlace.lastCheckDate || ''}
                                            onChange={handleInputChange}
                                            className="info-input"
                                        />
                                    ) : (
                                        <span className="info-value">{currentSelectedPlace.lastCheckDate}</span>
                                    )}
                                </div>
                                <div className="info-row special-notes">
                                    <span className="info-label">특이사항</span>
                                    {isEditing ? (
                                        <textarea
                                            name="specialNotes"
                                            value={editedPlace.specialNotes || ''}
                                            onChange={handleInputChange}
                                            className="info-textarea"
                                            rows="3"
                                        ></textarea>
                                    ) : (
                                        <span className="info-value">{currentSelectedPlace.specialNotes}</span>
                                    )}
                                </div>
                            </div>

                            {/* 위험 점수 및 파일 업로드 섹션 */}
                            <div className="grid-item safety-score-section">
                                <div className="item-title">위험 점수</div>
                                <div className="score-display">
                                    <div
                                        className="score-circle-large"
                                        style={{
                                            borderColor: currentSelectedPlace.safetyScore >= 80 ? '#ff0000ff' : (currentSelectedPlace.safetyScore >= 60 ? '#ffc107' : '#40dc35ff'),
                                            background: `conic-gradient(
                                                ${currentSelectedPlace.safetyScore >= 80 ? '#ff0000ff' : (currentSelectedPlace.safetyScore >= 60 ? '#ffc107' : '#40dc35ff')} ${currentSelectedPlace.safetyScore * 3.6}deg,
                                                #f0f0f0 ${currentSelectedPlace.safetyScore * 3.6}deg 360deg
                                            )`
                                        }}
                                    >
                                        <div className="score-value-large">{currentSelectedPlace.safetyScore}</div>
                                    </div>
                                    <div className="score-status-label">{currentSelectedPlace.scoreStatus}</div>
                                    <p className="score-description">
                                        현재 위험 점수는 <span className="highlight-score">{currentSelectedPlace.safetyScore} [{currentSelectedPlace.scoreStatus}]</span> 입니다.<br />
                                        {currentSelectedPlace.safetyScore < 70 ? '꾸준한 관리가 중요합니다.' : '단기 개선이 필요합니다.'}
                                    </p>
                                </div>

                                <div className="item-title file-upload-title">도면 파일</div>
                                <div className="file-upload-box">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        multiple
                                        onChange={handleDrawingFileUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="file-upload" className="file-upload-button">
                                        <FaUpload /> 도면 추가하기
                                    </label>
                                    {currentSelectedPlace.drawingFiles && currentSelectedPlace.drawingFiles.length > 0 ? (
                                        <div className="uploaded-files-list">
                                            <h3>업로드된 파일:</h3>
                                            <ul>
                                                {currentSelectedPlace.drawingFiles.map(file => (
                                                    <li key={file.id} className="uploaded-file-item">
                                                        <FaCheckCircle className="upload-check-icon" />
                                                        <span className="file-name">{file.name}</span>
                                                        <button
                                                            onClick={() => handleDrawingFileDelete(file.id)}
                                                            className="delete-file-button"
                                                            title="파일 삭제"
                                                        >
                                                            <FaTimes />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <p className="no-files-message">업로드된 도면 파일이 없습니다.</p>
                                    )}
                                </div>
                            </div>

                            {/* 분석 보고서 및 감점 사유 섹션 */}
                            <div className="grid-item analysis-report-section">
                                <div className="item-title">분석 보고서</div>
                                <div className="report-dropdown-group">
                                    <select
                                        className="report-dropdown"
                                        value={cctvReport}
                                        onChange={(e) => handleReportChange(e, 'cctv')}
                                    >
                                        <option value="">CCTV 영상 분석 결과 선택</option>
                                        <option value="cctv_report_1">CCTV 보고서 2025-07-01</option>
                                        <option value="cctv_report_2">CCTV 보고서 2025-06-15</option>
                                    </select>
                                    <FaChevronDown className="dropdown-arrow-icon" />
                                </div>
                                {cctvReportContent && <div className="report-content">{cctvReportContent}</div>}

                                <div className="report-dropdown-group">
                                    <select
                                        className="report-dropdown"
                                        value={drawingReport}
                                        onChange={(e) => handleReportChange(e, 'drawing')}
                                    >
                                        <option value="">사업장 도면 분석 결과 선택</option>
                                        <option value="drawing_report_1">도면 보고서 2025-07-01</option>
                                        <option value="drawing_report_2">도면 보고서 2025-06-01</option>
                                    </select>
                                    <FaChevronDown className="dropdown-arrow-icon" />
                                </div>
                                {drawingReportContent && <div className="report-content">{drawingReportContent}</div>}

                                <div className="report-dropdown-group">
                                    <select
                                        className="report-dropdown"
                                        value={legalReport}
                                        onChange={(e) => handleReportChange(e, 'legal')}
                                    >
                                        <option value="">법적 기준 분석 결과 선택</option>
                                        <option value="legal_report_1">법적 보고서 2025-07-01</option>
                                        <option value="legal_report_2">법적 보고서 2025-05-20</option>
                                    </select>
                                    <FaChevronDown className="dropdown-arrow-icon" />
                                </div>
                                {legalReportContent && <div className="report-content">{legalReportContent}</div>}

                                <div className="item-title deduction-title">감점 사유</div>
                                <div className="deduction-log-box">
                                    {currentSelectedPlace.deductionLogs && currentSelectedPlace.deductionLogs.length > 0 ? (
                                        <ul>
                                            {currentSelectedPlace.deductionLogs.map(log => (
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