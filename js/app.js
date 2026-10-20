/**
 * Hello Kitty Travel Planner 🎀
 * Main Application Logic
 */

// =============================================================================
// 1. 상수 & 초기 데이터 정의
// =============================================================================

const STORAGE_KEY = 'hello_kitty_travel_planner_data_v1';

// 6대 카테고리 메타데이터
const CATEGORIES = [
  {
    name: '의류',
    themeClass: 'cat-theme-clothing',
    icon: '👗',
    sanrioChar: '🎀',
    badgeColor: '#ff477e'
  },
  {
    name: '세면도구',
    themeClass: 'cat-theme-toiletries',
    icon: '🧴',
    sanrioChar: '☕', // 시나모롤 느낌
    badgeColor: '#0096c7'
  },
  {
    name: '전자기기',
    themeClass: 'cat-theme-electronics',
    icon: '📱',
    sanrioChar: '😈', // 쿠로미 느낌
    badgeColor: '#7828c8'
  },
  {
    name: '여행 서류 및 결제',
    themeClass: 'cat-theme-documents',
    icon: '💳',
    sanrioChar: '✈️',
    badgeColor: '#c97a2b'
  },
  {
    name: '의약품',
    themeClass: 'cat-theme-medicine',
    icon: '💊',
    sanrioChar: '🐰', // 마이멜로디 느낌
    badgeColor: '#e04b38'
  },
  {
    name: '기타',
    themeClass: 'cat-theme-etc',
    icon: '🎒',
    sanrioChar: '⭐',
    badgeColor: '#b08920'
  }
];

// 최초 실행 시 기본 제공 준비물 목록 (요구사항 명시 항목)
const DEFAULT_CHECKLIST_ITEMS = [
  // 의류
  { id: 'def_c1', name: '상의', category: '의류', completed: false, source: 'default' },
  { id: 'def_c2', name: '하의', category: '의류', completed: false, source: 'default' },
  { id: 'def_c3', name: '속옷', category: '의류', completed: false, source: 'default' },
  { id: 'def_c4', name: '양말', category: '의류', completed: false, source: 'default' },
  { id: 'def_c5', name: '잠옷', category: '의류', completed: false, source: 'default' },
  { id: 'def_c6', name: '외투', category: '의류', completed: false, source: 'default' },

  // 세면도구
  { id: 'def_t1', name: '칫솔', category: '세면도구', completed: false, source: 'default' },
  { id: 'def_t2', name: '치약', category: '세면도구', completed: false, source: 'default' },
  { id: 'def_t3', name: '샴푸', category: '세면도구', completed: false, source: 'default' },
  { id: 'def_t4', name: '바디워시', category: '세면도구', completed: false, source: 'default' },
  { id: 'def_t5', name: '클렌징 제품', category: '세면도구', completed: false, source: 'default' },
  { id: 'def_t6', name: '수건', category: '세면도구', completed: false, source: 'default' },

  // 전자기기
  { id: 'def_e1', name: '휴대폰', category: '전자기기', completed: false, source: 'default' },
  { id: 'def_e2', name: '충전기', category: '전자기기', completed: false, source: 'default' },
  { id: 'def_e3', name: '보조배터리', category: '전자기기', completed: false, source: 'default' },
  { id: 'def_e4', name: '이어폰', category: '전자기기', completed: false, source: 'default' },
  { id: 'def_e5', name: '카메라', category: '전자기기', completed: false, source: 'default' },

  // 여행 서류 및 결제
  { id: 'def_d1', name: '여권', category: '여행 서류 및 결제', completed: false, source: 'default' },
  { id: 'def_d2', name: '신분증', category: '여행 서류 및 결제', completed: false, source: 'default' },
  { id: 'def_d3', name: '항공권 또는 탑승권', category: '여행 서류 및 결제', completed: false, source: 'default' },
  { id: 'def_d4', name: '숙소 예약 내역', category: '여행 서류 및 결제', completed: false, source: 'default' },
  { id: 'def_d5', name: '여행자 보험 정보', category: '여행 서류 및 결제', completed: false, source: 'default' },
  { id: 'def_d6', name: '해외 결제 카드', category: '여행 서류 및 결제', completed: false, source: 'default' },
  { id: 'def_d7', name: '일본 엔화 현금', category: '여행 서류 및 결제', completed: false, source: 'default' },

  // 의약품
  { id: 'def_m1', name: '개인 복용약', category: '의약품', completed: false, source: 'default' },
  { id: 'def_m2', name: '상비약', category: '의약품', completed: false, source: 'default' },
  { id: 'def_m3', name: '밴드', category: '의약품', completed: false, source: 'default' },
  { id: 'def_m4', name: '소화제', category: '의약품', completed: false, source: 'default' },
  { id: 'def_m5', name: '멀미약', category: '의약품', completed: false, source: 'default' },

  // 기타
  { id: 'def_o1', name: '지갑', category: '기타', completed: false, source: 'default' },
  { id: 'def_o2', name: '우산', category: '기타', completed: false, source: 'default' },
  { id: 'def_o3', name: '물티슈', category: '기타', completed: false, source: 'default' },
  { id: 'def_o4', name: '여행용 가방', category: '기타', completed: false, source: 'default' }
];

// 기본 여행 설정
const DEFAULT_SETTINGS = {
  country: '일본',
  season: '겨울',
  region: '선택 전',
  tripType: '일반 여행'
};

// =============================================================================
// 2. 추천 준비물 데이터베이스 (요구사항 충실 반영)
// =============================================================================

// 일본 겨울 여행 기본 추천 (의류, 세면도구, 전자기기, 서류/결제, 의약품/안전, 겨울철 추가)
const WINTER_JAPAN_RECOMMENDATIONS = [
  // 의류 추천
  { name: '두꺼운 외투 또는 패딩', category: '의류', reason: '겨울철 야외 활동에 필요' },
  { name: '발열 내의', category: '의류', reason: '체온 유지에 도움' },
  { name: '니트 또는 기모 상의', category: '의류', reason: '보온을 위한 기본 의류' },
  { name: '목도리', category: '의류', reason: '목 주변의 보온' },
  { name: '장갑', category: '의류', reason: '추운 날씨에 손 보호' },
  { name: '두꺼운 양말', category: '의류', reason: '발 보온' },
  { name: '따뜻한 모자 또는 귀마개', category: '의류', reason: '추운 날씨 대비' },

  // 세면도구 및 보습 추천
  { name: '보습 크림', category: '세면도구', reason: '건조한 날씨에 피부 보습' },
  { name: '립밤', category: '세면도구', reason: '입술 건조 예방' },
  { name: '핸드크림', category: '세면도구', reason: '손 피부 보습' },
  { name: '휴대용 티슈', category: '세면도구', reason: '위생 관리 및 일상 휴대' },
  { name: '마스크', category: '세면도구', reason: '방한 및 호흡기 보호' },

  // 전자기기 추천
  { name: '휴대폰 충전기', category: '전자기기', reason: '기기 사용을 위한 필수 충전기' },
  { name: '보조배터리', category: '전자기기', reason: '기내 소지 필수 (위탁 수하물 불가)' },
  { name: '이어폰', category: '전자기기', reason: '이동 시간 음악 및 영상 청취' },
  { name: '일본 전압과 플러그에 맞는 충전 어댑터', category: '전자기기', reason: '일본 100V, 11자 A형 변환 어댑터' },

  // 여행 서류 및 결제 추천
  { name: '여권', category: '여행 서류 및 결제', reason: '출입국 필수 신분증' },
  { name: '항공권 또는 탑승권', category: '여행 서류 및 결제', reason: '비행기 탑승 및 입국 심사 확인' },
  { name: '숙소 예약 내역', category: '여행 서류 및 결제', reason: '호텔 체크인 및 입국서류 작성용' },
  { name: '여행자 보험 정보', category: '여행 서류 및 결제', reason: '해외 응급 상황 및 치료 대비' },
  { name: '해외 결제 가능한 카드', category: '여행 서류 및 결제', reason: '트래블로그/비자 등 해외 결제' },
  { name: '일본 엔화 현금', category: '여행 서류 및 결제', reason: '일본 현금 결제 전용 매장 대비' },

  // 의약품 및 안전 추천
  { name: '개인 복용약', category: '의약품', reason: '평소 복용하는 필수 의약품' },
  { name: '상비약', category: '의약품', reason: '소화제, 해열제, 진통제 등' },
  { name: '밴드', category: '의약품', reason: '작은 상처나 신발 물집 보호' },
  { name: '접이식 우산', category: '기타', reason: '갑작스러운 겨울 눈비 대비' },
  { name: '미끄럼 방지 기능이 있는 신발', category: '기타', reason: '빙판길 및 겨울 노면 안전 이동' },

  // 겨울철 추가 추천
  { name: '핫팩', category: '기타', reason: '야외 관광 시 손과 몸의 온기 보충' },
  { name: '넥워머', category: '기타', reason: '목과 얼굴 주변 찬바람 차단' },
  { name: '보온 텀블러', category: '기타', reason: '따뜻한 음료 보관 및 보온' },
  { name: '작은 손수건', category: '기타', reason: '일본 핸드드라이어 없는 화장실 대비' },
  { name: '방한용 마스크', category: '기타', reason: '칼바람 차단 및 방한' }
];

// 지역별 맞춤 추천 (도쿄, 오사카, 교토 / 삿포로 및 홋카이도 / 후쿠오카)
const REGION_RECOMMENDATIONS = {
  '도쿄': [
    { name: '따뜻한 외투', category: '의류', reason: '도심 도보 이동용 외투' },
    { name: '목도리와 장갑', category: '의류', reason: '빌딩풍과 찬 바람 대비' },
    { name: '보습 크림과 립밤', category: '세면도구', reason: '건조한 도쿄 겨울 날씨 보습' },
    { name: '편하게 걸을 수 있는 신발', category: '기타', reason: '지하철 환승 및 장시간 도보 쇼핑용' }
  ],
  '오사카': [
    { name: '따뜻한 외투', category: '의류', reason: '도심 도보 이동용 외투' },
    { name: '목도리와 장갑', category: '의류', reason: '빌딩풍과 찬 바람 대비' },
    { name: '보습 크림과 립밤', category: '세면도구', reason: '건조한 겨울 날씨 보습' },
    { name: '편하게 걸을 수 있는 신발', category: '기타', reason: '도톤보리, 유니버설 등 장시간 도보 대비' }
  ],
  '교토': [
    { name: '따뜻한 외투', category: '의류', reason: '신사 및 사찰 야외 관람용 외투' },
    { name: '목도리와 장갑', category: '의류', reason: '고궁 및 분지 특유의 차가운 공기 대비' },
    { name: '보습 크림과 립밤', category: '세면도구', reason: '건조한 바람 대비 피부 보습' },
    { name: '편하게 걸을 수 있는 신발', category: '기타', reason: '자갈길, 언덕길, 계단 도보 대비' }
  ],
  '삿포로 및 홋카이도': [
    { name: '방수 기능이 있는 방한화', category: '기타', reason: '많은 눈과 빙판길에 젖지 않고 미끄러지지 않는 신발' },
    { name: '두꺼운 장갑', category: '의류', reason: '영하의 추위와 눈놀이 대비 필수 방한 장갑' },
    { name: '방한 모자', category: '의류', reason: '머리와 귀를 덮어 체온을 지켜주는 털모자' },
    { name: '방수 외투', category: '의류', reason: '내리는 눈이 녹아 옷이 젖지 않도록 방수/발수 코팅 패딩' },
    { name: '눈길 미끄럼 방지 용품', category: '기타', reason: '신발 밑창에 장착하는 탈부착형 아이젠/스노우 밴드' }
  ],
  '후쿠오카': [
    { name: '따뜻한 외투', category: '의류', reason: '비교적 온화하지만 바닷바람 대비 외투' },
    { name: '목도리', category: '의류', reason: '아침저녁 쌀쌀한 바람 대비' },
    { name: '보습 제품', category: '세면도구', reason: '촉촉한 피부 유지를 위한 수분 케어' },
    { name: '우산', category: '기타', reason: '겨울철 잦은 비나 눈에 대비하는 휴대용 우산' }
  ]
};

// 여행 유형별 맞춤 추천 (온천 여행 / 스키 및 스노보드 여행)
const TRIP_TYPE_RECOMMENDATIONS = {
  '온천 여행': [
    { name: '여분 속옷', category: '의류', reason: '온천 입욕 횟수가 많아 여유 있는 교체 필요' },
    { name: '여분 양말', category: '의류', reason: '목욕 후 보송보송하게 갈아 신을 여벌 양말' },
    { name: '작은 수건', category: '세면도구', reason: '온천탕 입욕 시 머리에 얹거나 닦는 개인 페이스타월' },
    { name: '갈아입을 옷', category: '의류', reason: '료칸 및 온천욕 후 편안하게 휴식할 수 있는 이지웨어' }
  ],
  '스키 및 스노보드 여행': [
    { name: '방수 스키복', category: '의류', reason: '슬로프 활주 시 눈에 젖지 않는 방수/방풍 기능성 의류' },
    { name: '방한 장갑', category: '의류', reason: '눈과의 마찰과 추위를 막아주는 스키 전용 방한 장갑' },
    { name: '고글', category: '기타', reason: '설원의 강한 자외선 반사 차단 및 눈보라 시야 확보' },
    { name: '방수 방한화', category: '기타', reason: '스키장 슬로프 주변 이동 시 미끄럼 방지와 방수' },
    { name: '여벌 양말', category: '의류', reason: '눈과 땀에 젖었을 때 갈아 신을 두꺼운 스포츠 보온 양말' }
  ]
};

// 카테고리별 원클릭 선택 프리셋 (사용자가 타이핑 없이 클릭해서 담을 수 있는 풍부한 여행 준비물 보물상자)
const CATEGORY_PRESETS = {
  '의류': [
    '상의', '하의', '속옷', '양말', '잠옷', '외투',
    '패딩', '경량패딩', '발열내의', '니트/기모',
    '목도리', '장갑', '방한모자', '귀마개',
    '수면양말', '편한바지', '수영복/래시가드'
  ],
  '세면도구': [
    '칫솔', '치약', '샴푸', '린스/트리트먼트', '바디워시',
    '클렌징 제품', '수건', '보습 크림', '립밤', '핸드크림',
    '스킨/로션', '선크림', '마스크팩', '면도기', '빗/머리끈'
  ],
  '전자기기': [
    '휴대폰', '충전기', '보조배터리', '이어폰/헤드폰', '카메라',
    '11자 변환 플러그(돼지코)', '멀티탭/멀티포트', '셀카봉/삼각대',
    '스마트워치 충전기', '태블릿/e북'
  ],
  '여행 서류 및 결제': [
    '여권', '신분증', '항공권/탑승권', '숙소 예약 내역', '여행자 보험 정보',
    '해외 결제 카드', '일본 엔화 현금', '동전지갑', '비짓재팬(VJW) 등록',
    '바우처/입장권'
  ],
  '의약품': [
    '개인 복용약', '상비약', '밴드/반창고', '소화제', '멀미약',
    '감기약', '진통/해열제', '지사제', '인공눈물', '파스/근육이완제', '소독약'
  ],
  '기타': [
    '지갑', '우산', '물티슈', '여행용 가방', '핫팩', '보온 텀블러',
    '작은 손수건', '비닐/지퍼백', '목베개/안대', '귀마개(소음용)',
    '압축 파우치', '쇼핑백'
  ]
};

// =============================================================================
// 3. 애플리케이션 상태 (State)
// =============================================================================

let appState = {
  items: [],
  settings: { ...DEFAULT_SETTINGS },
  activePickerCategory: '의류',
  activeRecomFilter: 'all',
  isRecomCollapsed: false,
  pendingDeleteId: null
};

// =============================================================================
// 4. 로컬스토리지 (LocalStorage) 입출력 모듈
// =============================================================================

function loadFromStorage() {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      // 최초 방문: 기본 준비물 & 기본 설정 생성
      appState.items = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST_ITEMS));
      appState.settings = { ...DEFAULT_SETTINGS };
      saveToStorage();
      return;
    }

    const parsed = JSON.parse(rawData);

    // 데이터 형식 검증 및 보정
    if (Array.isArray(parsed.items) && parsed.items.length > 0) {
      appState.items = parsed.items;
    } else {
      appState.items = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST_ITEMS));
    }

    if (parsed.settings && typeof parsed.settings === 'object') {
      appState.settings = {
        country: parsed.settings.country || DEFAULT_SETTINGS.country,
        season: parsed.settings.season || DEFAULT_SETTINGS.season,
        region: parsed.settings.region || DEFAULT_SETTINGS.region,
        tripType: parsed.settings.tripType || DEFAULT_SETTINGS.tripType
      };
    } else {
      appState.settings = { ...DEFAULT_SETTINGS };
    }
  } catch (error) {
    console.error('LocalStorage 로드 실패, 기본값으로 초기화합니다:', error);
    appState.items = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST_ITEMS));
    appState.settings = { ...DEFAULT_SETTINGS };
  }
}

function saveToStorage() {
  try {
    const dataToSave = {
      items: appState.items,
      settings: appState.settings,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('LocalStorage 저장 오류:', error);
    showToast('저장 공간이 부족하거나 브라우저 저장이 제한되어 있습니다.', 'warning');
  }
}

// =============================================================================
// 5. 추천 엔진 (Recommendation Generator)
// =============================================================================

/**
 * 여행 설정(국가, 계절, 지역, 유형)에 따라 최적화된 추천 준비물 목록 반환
 * 중복은 name 기준으로 제거
 */
function getActiveRecommendations() {
  const { country, season, region, tripType } = appState.settings;
  const recomList = [];
  const nameSet = new Set();

  function addItem(item) {
    if (!nameSet.has(item.name)) {
      nameSet.add(item.name);
      recomList.push(item);
    }
  }

  // 1. 기본 일본 겨울 여행 필수 추천
  // (국가가 일본이고 계절이 겨울이거나, 기본 테마 추천으로 활용)
  if (country === '일본' && season === '겨울') {
    WINTER_JAPAN_RECOMMENDATIONS.forEach(addItem);
  } else if (season === '겨울') {
    // 타 국가 겨울 여행인 경우에도 기본 겨울 추천 아이템 제공
    WINTER_JAPAN_RECOMMENDATIONS.filter(item => item.name !== '일본 전압과 플러그에 맞는 충전 어댑터' && item.name !== '일본 엔화 현금')
      .forEach(addItem);
    if (country === '일본') {
      addItem({ name: '일본 전압과 플러그에 맞는 충전 어댑터', category: '전자기기', reason: '일본 100V 11자 플러그 변환 어댑터' });
      addItem({ name: '일본 엔화 현금', category: '여행 서류 및 결제', reason: '일본 현금 결제 전용 매장 대비' });
    }
  } else {
    // 타 계절일 경우 기본 의류/서류/상비약 추천
    [
      { name: '여권', category: '여행 서류 및 결제', reason: '해외 출입국 필수 신분증' },
      { name: '항공권 또는 탑승권', category: '여행 서류 및 결제', reason: '이동 및 공항 탑승 확인' },
      { name: '숙소 예약 내역', category: '여행 서류 및 결제', reason: '체크인 필수 증빙' },
      { name: '휴대폰 충전기', category: '전자기기', reason: '전자기기 충전 필수품' },
      { name: '보조배터리', category: '전자기기', reason: '기내 반입 필수' },
      { name: '상비약', category: '의약품', reason: '긴급 상비약 준비' },
      { name: '접이식 우산', category: '기타', reason: '갑작스러운 날씨 변화 대비' },
      { name: '보습 크림', category: '세면도구', reason: '피부 건강 유지' }
    ].forEach(addItem);

    if (country === '일본') {
      addItem({ name: '일본 전압과 플러그에 맞는 충전 어댑터', category: '전자기기', reason: '일본 100V 11자 플러그 변환 어댑터' });
      addItem({ name: '일본 엔화 현금', category: '여행 서류 및 결제', reason: '일본 현금 결제 전용 매장 대비' });
    }
  }

  // 2. 지역별 맞춤 추천 추가 (선택된 지역이 있을 때)
  if (region && REGION_RECOMMENDATIONS[region]) {
    REGION_RECOMMENDATIONS[region].forEach(addItem);
  }

  // 3. 여행 유형별 맞춤 추천 추가 (온천, 스키 등)
  if (tripType && TRIP_TYPE_RECOMMENDATIONS[tripType]) {
    TRIP_TYPE_RECOMMENDATIONS[tripType].forEach(addItem);
  }

  return recomList;
}

// =============================================================================
// 6. UI 렌더링 함수들 (Renderers)
// =============================================================================

/**
 * 전체 대시보드 렌더링
 */
function renderAll() {
  renderSettings();
  renderProgress();
  renderPickerChips();
  renderRecommendations();
  renderChecklist();
}

/**
 * 준비물 스티커 보물상자 칩 렌더링 (원클릭 선택 방식)
 */
function renderPickerChips() {
  const container = document.getElementById('pickerChipsContainer');
  if (!container) return;

  const currentCat = appState.activePickerCategory || '의류';
  const presets = CATEGORY_PRESETS[currentCat] || [];

  // 카테고리 탭 active 클래스 동기화
  const tabs = document.querySelectorAll('.picker-cat-tab');
  tabs.forEach(tab => {
    if (tab.dataset.category === currentCat) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  if (presets.length === 0) {
    container.innerHTML = '<span style="color:#aaa;font-size:0.9rem;">등록된 추천 스티커가 없습니다.</span>';
    return;
  }

  container.innerHTML = presets.map(itemName => {
    // 현재 체크리스트에 담겨 있는지 확인
    const isPicked = appState.items.some(
      item => item.category === currentCat && item.name.trim().toLowerCase() === itemName.trim().toLowerCase()
    );

    return `
      <button 
        type="button" 
        class="picker-chip ${isPicked ? 'is-picked' : ''}" 
        onclick="handlePickerChipClick('${escapeHtml(itemName)}', '${escapeHtml(currentCat)}')"
        title="${isPicked ? '이미 담긴 준비물이에요 (클릭하여 확인)' : '클릭해서 준비물에 담기!'}"
      >
        <span class="picker-chip-icon">${isPicked ? '✓' : '➕'}</span>
        <span class="picker-chip-name">${escapeHtml(itemName)}</span>
      </button>
    `;
  }).join('');
}

/**
 * 준비물 스티커 클릭 핸들러 (원클릭 선택/담기)
 */
window.handlePickerChipClick = function(name, category) {
  const existing = appState.items.find(
    item => item.category === category && item.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (existing) {
    // 이미 체크리스트에 있는 경우: 사용자에게 알림 제공 및 삭제 의사 확인
    promptDeleteItem(existing.id);
  } else {
    // 체크리스트에 없는 경우: 즉시 담기
    addNewItem(name, category);
  }
};

/**
 * 여행 설정 컨트롤 및 요약 배너 갱신
 */
function renderSettings() {
  const { country, season, region, tripType } = appState.settings;

  const countryEl = document.getElementById('countrySelect');
  const seasonEl = document.getElementById('seasonSelect');
  const regionEl = document.getElementById('regionSelect');
  const tripTypeEl = document.getElementById('tripTypeSelect');

  if (countryEl) countryEl.value = country;
  if (seasonEl) seasonEl.value = season;
  if (regionEl) regionEl.value = region;
  if (tripTypeEl) tripTypeEl.value = tripType;

  // 요약 배너
  const summaryEl = document.getElementById('settingsSummaryText');
  if (summaryEl) {
    const flag = country === '일본' ? '🇯🇵' : country === '한국' ? '🇰🇷' : country === '대만' ? '🇹🇼' : '🌏';
    const seasonEmoji = season === '봄' ? '🌸' : season === '여름' ? '☀️' : season === '가을' ? '🍁' : '❄️';
    const regionTxt = region === '선택 전' ? '전체 지역' : region;
    summaryEl.textContent = `${flag} ${country} · ${seasonEmoji} ${season} · 📍 ${regionTxt} · 🎒 ${tripType}`;
  }

  // 추천 카드 헤더 배지 업데이트
  const seasonTagEl = document.getElementById('recomSeasonTag');
  if (seasonTagEl) {
    seasonTagEl.textContent = `${country} ${season} 맞춤`;
  }
}

/**
 * 전체 준비 진행률 카드 렌더링 (0 나누기 예외 처리, 프로그레스 바, 축하 문구)
 */
function renderProgress() {
  const total = appState.items.length;
  const completed = appState.items.filter(item => item.completed).length;
  const remaining = total - completed;

  // 0 나누기 방지
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  // 텍스트 업데이트
  const totalEl = document.getElementById('statTotal');
  const completedEl = document.getElementById('statCompleted');
  const remainingEl = document.getElementById('statRemaining');
  const percentBadgeEl = document.getElementById('progressPercentNum');
  const progressBarFill = document.getElementById('progressBarFill');
  const completionBanner = document.getElementById('completionBanner');

  if (totalEl) totalEl.textContent = total;
  if (completedEl) completedEl.textContent = completed;
  if (remainingEl) remainingEl.textContent = remaining;
  if (percentBadgeEl) percentBadgeEl.textContent = percent;

  if (progressBarFill) {
    progressBarFill.style.width = `${percent}%`;
  }

  // 100% 완료 상태일 때 축하 배너 표시 (준비물이 1개 이상이고 100%일 때)
  if (completionBanner) {
    if (total > 0 && completed === total) {
      if (completionBanner.style.display === 'none') {
        completionBanner.style.display = 'block';
        triggerConfettiEffect();
      }
    } else {
      completionBanner.style.display = 'none';
    }
  }
}

/**
 * 추천 영역 렌더링 (필터링, 이미 추가된 상태 표시)
 */
function renderRecommendations() {
  const gridEl = document.getElementById('recomItemsGrid');
  const countEl = document.getElementById('recomCountTotal');
  if (!gridEl) return;

  const allRecoms = getActiveRecommendations();
  if (countEl) countEl.textContent = allRecoms.length;

  const filter = appState.activeRecomFilter;
  const filtered = filter === 'all'
    ? allRecoms
    : allRecoms.filter(r => r.category === filter);

  if (filtered.length === 0) {
    gridEl.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 24px; color: #888; font-style: italic;">
        선택한 카테고리의 추천 아이템이 없습니다 🎀
      </div>
    `;
    return;
  }

  gridEl.innerHTML = filtered.map(item => {
    // 체크리스트에 이미 추가되어 있는지 확인
    const isAlreadyAdded = appState.items.some(
      i => i.category === item.category && i.name.trim().toLowerCase() === item.name.trim().toLowerCase()
    );

    const catMeta = CATEGORIES.find(c => c.name === item.category) || CATEGORIES[5];

    return `
      <div class="recom-item-card ${isAlreadyAdded ? 'is-added' : ''}">
        <div class="recom-item-top">
          <div class="recom-item-name-group">
            <h4 class="recom-item-name">
              <span>${catMeta.icon}</span> ${escapeHtml(item.name)}
            </h4>
            <p class="recom-item-reason">${escapeHtml(item.reason)}</p>
          </div>
          <span class="recom-item-category-tag" style="background: ${catMeta.badgeColor}18; color: ${catMeta.badgeColor};">
            ${escapeHtml(item.category)}
          </span>
        </div>
        <div class="recom-item-bottom">
          <button 
            type="button" 
            class="btn-add-recom ${isAlreadyAdded ? 'added' : ''}" 
            data-name="${escapeHtml(item.name)}" 
            data-category="${escapeHtml(item.category)}"
            ${isAlreadyAdded ? 'disabled' : ''}
          >
            ${isAlreadyAdded ? '✓ 담기 완료' : '➕ 준비물에 추가'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 카테고리별 준비물 체크리스트 그리드 렌더링
 */
function renderChecklist() {
  const gridEl = document.getElementById('categoriesGrid');
  if (!gridEl) return;

  gridEl.innerHTML = CATEGORIES.map(category => {
    const categoryItems = appState.items.filter(item => item.category === category.name);
    const completedCount = categoryItems.filter(item => item.completed).length;
    const totalCount = categoryItems.length;

    let itemsHtml = '';
    if (categoryItems.length === 0) {
      itemsHtml = `<li class="cat-empty-msg">아직 등록된 준비물이 없어요 💭</li>`;
    } else {
      itemsHtml = categoryItems.map(item => {
        return `
          <li class="check-item ${item.completed ? 'is-completed' : ''}" data-id="${item.id}">
            <div class="item-left" onclick="toggleItemComplete('${item.id}')">
              <div class="custom-checkbox" aria-label="체크박스"></div>
              <div class="item-text-wrap">
                <span class="item-name">${escapeHtml(item.name)}</span>
                ${item.source === 'user' ? '<span class="item-source-tag">직접 추가</span>' : ''}
              </div>
            </div>
            <button 
              type="button" 
              class="btn-delete-item" 
              title="준비물 삭제" 
              onclick="promptDeleteItem('${item.id}')"
              aria-label="${escapeHtml(item.name)} 삭제"
            >
              🗑️
            </button>
          </li>
        `;
      }).join('');
    }

    return `
      <div class="category-card ${category.themeClass}">
        <div class="cat-card-header">
          <div class="cat-title-group">
            <span class="cat-sanrio-icon">${category.sanrioChar}</span>
            <h3 class="cat-name">${category.icon} ${category.name}</h3>
          </div>
          <span class="cat-badge">
            ${completedCount} / ${totalCount} 완료
          </span>
        </div>
        <ul class="cat-items-list">
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');
}

// =============================================================================
// 7. 데이터 조작 핸들러 (State Modifiers)
// =============================================================================

/**
 * 준비물 완료 상태 토글 (체크 / 체크해제)
 */
window.toggleItemComplete = function(itemId) {
  const target = appState.items.find(i => i.id === itemId);
  if (!target) return;

  target.completed = !target.completed;
  saveToStorage();
  renderProgress();
  renderChecklist();
};

/**
 * 준비물 추가 함수 (유효성 검사, trim, 중복 체크)
 */
function addNewItem(name, category) {
  const cleanName = (name || '').trim();

  // 빈 문자열/공백만 있을 경우 추가 불가
  if (!cleanName) {
    showToast('준비물 이름을 입력해 주세요! 🎀', 'warning');
    return false;
  }

  // 유효한 카테고리 확인
  const validCategory = CATEGORIES.find(c => c.name === category);
  if (!validCategory) {
    showToast('올바른 카테고리를 선택해 주세요.', 'warning');
    return false;
  }

  // 동일 카테고리 내 중복 이름 검사 (공백 무시 및 대소문자 무시)
  const isDuplicate = appState.items.some(
    item => item.category === category && item.name.trim().toLowerCase() === cleanName.toLowerCase()
  );

  if (isDuplicate) {
    showToast(`'${cleanName}'은(는) 이미 '${category}'에 있어요! 🐰`, 'warning');
    return false;
  }

  // 신규 항목 생성
  const newItem = {
    id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
    name: cleanName,
    category: category,
    completed: false,
    source: 'user'
  };

  appState.items.push(newItem);
  saveToStorage();
  renderProgress();
  renderChecklist();
  renderRecommendations(); // 추천 목록에서 방금 추가된 항목 버튼 상태 갱신
  renderPickerChips();     // 스티커 보물상자 칩 상태 동기화

  showToast(`'${cleanName}' 준비물이 쏙 들어갔어요! ✨`, 'success');
  return true;
}

/**
 * 삭제 확인 팝업 모달 열기
 */
window.promptDeleteItem = function(itemId) {
  const item = appState.items.find(i => i.id === itemId);
  if (!item) return;

  appState.pendingDeleteId = itemId;
  const modal = document.getElementById('deleteConfirmModal');
  const itemNameEl = document.getElementById('deleteModalItemName');

  if (itemNameEl) {
    itemNameEl.innerHTML = `<strong>'${escapeHtml(item.name)}'</strong> 항목을 정말 삭제할까요?`;
  }
  if (modal) {
    modal.style.display = 'flex';
  }
};

/**
 * 삭제 확정
 */
function confirmDeleteItem() {
  if (!appState.pendingDeleteId) return;

  const targetId = appState.pendingDeleteId;
  const deletedItem = appState.items.find(i => i.id === targetId);

  appState.items = appState.items.filter(i => i.id !== targetId);
  appState.pendingDeleteId = null;

  closeDeleteModal();
  saveToStorage();
  renderProgress();
  renderChecklist();
  renderRecommendations();
  renderPickerChips();

  if (deletedItem) {
    showToast(`'${deletedItem.name}' 항목이 삭제되었어요! 🗑️`, 'success');
  }
}

function closeDeleteModal() {
  appState.pendingDeleteId = null;
  const modal = document.getElementById('deleteConfirmModal');
  if (modal) modal.style.display = 'none';
}

/**
 * 추천 아이템 단일 추가
 */
function addRecommendationItem(name, category) {
  addNewItem(name, category);
}

/**
 * 추천 아이템 전체 일괄 담기
 */
function addAllRecommendations() {
  const activeRecoms = getActiveRecommendations();
  let addedCount = 0;

  activeRecoms.forEach(recom => {
    const alreadyExists = appState.items.some(
      item => item.category === recom.category && item.name.trim().toLowerCase() === recom.name.trim().toLowerCase()
    );

    if (!alreadyExists) {
      appState.items.push({
        id: 'recom_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
        name: recom.name.trim(),
        category: recom.category,
        completed: false,
        source: 'recommendation'
      });
      addedCount++;
    }
  });

  if (addedCount > 0) {
    saveToStorage();
    renderProgress();
    renderChecklist();
    renderRecommendations();
    renderPickerChips();
    showToast(`키티의 추천 필수템 ${addedCount}개를 모두 담았어요! 🧳✨`, 'success');
  } else {
    showToast('모든 추천 아이템이 이미 준비물에 포함되어 있어요! 💖', 'warning');
  }
}

/**
 * 기본 준비물로 전체 초기화
 */
function resetAllToChecklist() {
  if (confirm('모든 준비물을 초기 기본 목록으로 재설정하시겠어요?\n(체크 상태와 추가한 항목이 초기화됩니다)')) {
    appState.items = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST_ITEMS));
    appState.settings = { ...DEFAULT_SETTINGS };
    saveToStorage();
    renderAll();
    showToast('기본 준비물 목록으로 산뜻하게 초기화되었어요! 🎀', 'success');
  }
}

// =============================================================================
// 8. 유틸리티 및 인터랙션 (Toast, Confetti, Particles)
// =============================================================================

function escapeHtml(string) {
  const div = document.createElement('div');
  div.textContent = string;
  return div.innerHTML;
}

function showToast(message, type = 'normal') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'warning' ? '⚠️' : type === 'success' ? '🎀' : '✨'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/**
 * 100% 달성 시 귀여운 파스텔 콘페티 효과
 */
function triggerConfettiEffect() {
  const colors = ['#ff85a2', '#ffd166', '#06d6a0', '#118ab2', '#b388ff', '#ffb3c6'];
  const symbols = ['🎀', '⭐', '💖', '❄️', '🌸', '✨'];

  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.top = '-20px';
    confetti.style.fontSize = `${14 + Math.random() * 16}px`;
    confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
    confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s ease-out forwards`;
    
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 4000);
  }
}

// 콘페티 애니메이션 키프레임 동적 삽입
if (!document.getElementById('confetti-styles')) {
  const style = document.createElement('style');
  style.id = 'confetti-styles';
  style.textContent = `
    @keyframes confettiFall {
      0% { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(100vh) rotate(${360 + Math.random() * 360}deg); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

/**
 * 배경 눈송이 & 반짝이 파티클 생성
 */
function initBackgroundSparkles() {
  const container = document.getElementById('sparklesContainer');
  if (!container) return;

  const count = 20;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle-dot';
    const size = 3 + Math.random() * 5;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.backgroundColor = Math.random() > 0.5 ? '#ffb6c1' : '#bde0fe';
    dot.style.left = `${Math.random() * 100}vw`;
    dot.style.animationDuration = `${8 + Math.random() * 12}s`;
    dot.style.animationDelay = `${Math.random() * 6}s`;
    container.appendChild(dot);
  }
}

// =============================================================================
// 9. 이벤트 리스너 바인딩 및 앱 초기화
// =============================================================================

function bindEvents() {
  // 1. 여행 설정 드롭다운 변경 리스너
  const countrySelect = document.getElementById('countrySelect');
  const seasonSelect = document.getElementById('seasonSelect');
  const regionSelect = document.getElementById('regionSelect');
  const tripTypeSelect = document.getElementById('tripTypeSelect');

  function handleSettingChange() {
    appState.settings.country = countrySelect.value;
    appState.settings.season = seasonSelect.value;
    appState.settings.region = regionSelect.value;
    appState.settings.tripType = tripTypeSelect.value;

    saveToStorage();
    renderSettings();
    renderRecommendations(); // 추천 목록만 즉시 변경 (기존 준비물과 체크 상태는 절대 보존!)
    showToast('여행 플랜에 맞춰 추천 목록이 새로워졌어요! ❄️', 'normal');
  }

  if (countrySelect) countrySelect.addEventListener('change', handleSettingChange);
  if (seasonSelect) seasonSelect.addEventListener('change', handleSettingChange);
  if (regionSelect) regionSelect.addEventListener('change', handleSettingChange);
  if (tripTypeSelect) tripTypeSelect.addEventListener('change', handleSettingChange);

  // 2. 준비물 스티커 보물상자 카테고리 탭 클릭 리스너
  const pickerTabs = document.querySelectorAll('.picker-cat-tab');
  pickerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      appState.activePickerCategory = tab.dataset.category;
      renderPickerChips();
    });
  });

  // 3. 직접 입력 아코디언 토글 리스너
  const toggleCustomInputBtn = document.getElementById('toggleCustomInputBtn');
  const customAddForm = document.getElementById('addItemForm');
  const customInputToggleArrow = document.getElementById('customInputToggleArrow');

  if (toggleCustomInputBtn && customAddForm) {
    toggleCustomInputBtn.addEventListener('click', () => {
      const isHidden = customAddForm.style.display === 'none';
      customAddForm.style.display = isHidden ? 'block' : 'none';
      if (customInputToggleArrow) {
        customInputToggleArrow.textContent = isHidden ? '▲' : '▼';
      }
      if (isHidden) {
        const input = document.getElementById('newItemInput');
        if (input) input.focus();
      }
    });
  }

  // 4. 직접 입력 폼 제출 리스너 (보조 옵션)
  const addItemForm = document.getElementById('addItemForm');
  const newItemInput = document.getElementById('newItemInput');
  const newCategorySelect = document.getElementById('newCategorySelect');

  if (addItemForm) {
    addItemForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = newItemInput.value;
      const category = newCategorySelect.value;
      if (addNewItem(name, category)) {
        newItemInput.value = '';
        newItemInput.focus();
      }
    });
  }

  // 3. 추천 탭 필터링 클릭 리스너
  const filterTabs = document.querySelectorAll('.recom-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      appState.activeRecomFilter = tab.dataset.filter;
      renderRecommendations();
    });
  });

  // 4. 추천 아이템 동적 클릭 리스너 (위임)
  const recomGrid = document.getElementById('recomItemsGrid');
  if (recomGrid) {
    recomGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-recom');
      if (btn && !btn.disabled) {
        const name = btn.dataset.name;
        const category = btn.dataset.category;
        addRecommendationItem(name, category);
      }
    });
  }

  // 5. 추천 아이템 전체 담기 버튼
  const addAllBtn = document.getElementById('addAllRecomBtn');
  if (addAllBtn) {
    addAllBtn.addEventListener('click', addAllRecommendations);
  }

  // 6. 추천 영역 접기/펼치기 토글
  const toggleRecomBtn = document.getElementById('toggleRecomBtn');
  const recomToggleIcon = document.getElementById('recomToggleIcon');
  if (toggleRecomBtn && recomGrid) {
    toggleRecomBtn.addEventListener('click', () => {
      appState.isRecomCollapsed = !appState.isRecomCollapsed;
      if (appState.isRecomCollapsed) {
        recomGrid.style.display = 'none';
        recomToggleIcon.textContent = '▼';
      } else {
        recomGrid.style.display = 'grid';
        recomToggleIcon.textContent = '▲';
      }
    });
  }

  // 7. 삭제 확인 모달 리스너
  const modalCancelBtn = document.getElementById('deleteModalCancelBtn');
  const modalConfirmBtn = document.getElementById('deleteModalConfirmBtn');
  const modalOverlay = document.getElementById('deleteConfirmModal');

  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeDeleteModal);
  if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', confirmDeleteItem);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDeleteModal();
    });
  }

  // 8. 전체 초기화 버튼
  const resetBtn = document.getElementById('resetAllBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllToChecklist);
  }

  // 키보드 ESC로 모달 닫기
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
      closeDeleteModal();
    }
  });

  // 이미지 에러 방어: 로딩 실패 시 귀여운 CSS 폴백 표시
  const kittyHeroImg = document.getElementById('kittyHeroImg');
  if (kittyHeroImg) {
    kittyHeroImg.addEventListener('error', function() {
      this.style.display = 'none';
      const frame = this.parentElement;
      if (frame) {
        const fallback = document.createElement('div');
        fallback.style.cssText = 'height:155px;display:flex;align-items:center;justify-content:center;font-size:3rem;background:#ffe6ee;border-radius:8px;';
        fallback.textContent = '🎀🐱✈️';
        frame.insertBefore(fallback, frame.querySelector('.polaroid-caption'));
      }
    });
  }
}

// 앱 시작
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  initBackgroundSparkles();
  bindEvents();
  renderAll();
});
