# 변경 이력

상태: Current  
기준일: 2026-03-08

## [1.5.2] - 2026-03-08

### 빌드 환경 복구
- `npm i` 재설치로 `@rollup/rollup-linux-x64-gnu` optional dependency 누락 상태를 복구
- 로컬 기준 `npm run build` 재통과 확인

### 보상 안정성 / 가드레일
- 일일 보상 수령 가능 판정에 `lastClaimAt` 시계 역행 가드 추가
- 상단 배지/App과 일일 보상 모달이 동일한 `canClaimDailyReward()` 경로를 사용하도록 통일
- `refreshTimedRewards()`에서 시스템 시간이 뒤로 간 경우 `lastSeenAt` 역행 저장을 막는 보정 추가
- 장기 복귀 보상이 pending일 때 오프라인 보상을 신규 생성하지 않도록 우선순위 정리(중복 정산 완화)

### 콘텐츠 확장
- 리텐션 중심 업적 4종 추가
  - `출석 루키` (일일 보상 7회)
  - `출석 챔피언` (일일 보상 30회)
  - `복귀 단골` (복귀 보상 3회)
  - `절전 고수` (오프라인 보상 10회)

## [1.5.1] - 2026-03-08

### 라이브 운영 UX 보완
- timed reward 모달을 닫아도 pending reward를 유지하도록 수정
- 복귀 보상 / 오프라인 보상을 메인 화면의 전용 tray에서 다시 열 수 있도록 추가
- timed reward 모달에 `나중에 받기 / 버리기 / 받기` 동작을 분리

### 안정성
- `refreshTimedRewards()`가 이미 보류 중인 보상을 새 계산값으로 덮어쓰지 않도록 보정
- 세션 중 보류 상태와 자동 모달 노출 충돌을 줄이기 위해 `App.tsx`에 suppression 흐름 추가

### 문서 / 메타데이터
- `README`, `ARCHITECTURE`, `ROADMAP`, `PHASE1_TASKS`, `TEMPLATE_GUIDE`를 `v1.5.1` 기준으로 갱신
- 버전 메타데이터를 `1.5.1`로 상향

## [1.5.0] - 2026-03-08

### 구조 리팩토링
- `useGameStore.ts`를 오케스트레이션 중심으로 정리하고, 순수 로직을 `game/coins.ts`, `game/achievements.ts`, `game/rewards.ts`로 분리
- 초기 상태와 저장 처리 로직을 `store/gameState.ts`, `store/persistence.ts`, `store/types.ts`로 분리
- 스타일 구조를 `styles/base.css`, `styles/layout.css`, `styles/modals.css`, `styles/responsive.css`로 분리
- `pps` 명칭을 `incomePerTick` 기준으로 정리하고, 수익을 초당이 아닌 주기 수익 개념으로 통일

### 라이브 안정화
- 비활성 상태에서 계속 돌던 자동 병합 / 자동 생산 polling 제거
- 주요 사용자 노출 문자열과 safe-area 대응 정리

### 리텐션 기능
- 복귀 보상 구현
- 오프라인 보상 최소형 구현
- timed reward 자동 검출과 중복 수령 방지 흐름 추가

### 수익화 준비
- `RewardSource` 타입 도입
- 광고 보상이나 IAP를 연결할 수 있는 공통 보상 진입점 정리

## [1.4.3] - 2026-03-08
- 일일 보상 1차 적용
- 문서 정합성 정리

## [1.4.2] - 2026-03-08
- `formatMoney` 유틸 통합
- 일부 dead code 제거

## [1.4.1] - 2026-03-05
- 배포 / 보안 설정 정리
- 일부 성능 최적화

## [1.4.0] - 2026-03-05
- 밸런스 및 구조 1차 정리
