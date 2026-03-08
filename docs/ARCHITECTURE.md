# 아키텍처 가이드

상태: Current  
기준일: 2026-03-08

이 문서는 `v1.5.2` 기준 실제 코드 구조를 설명합니다.

## 1. 디렉터리 구조

```text
src/
├── App.tsx                     # 메인 화면, 모달 오케스트레이션, timed reward 노출 제어
├── components/
│   ├── Header.tsx             # 자산 / 주기 수익 표시
│   ├── Board.tsx              # 5x5 보드 렌더링, 드래그 / 머지 처리
│   ├── StoreModal.tsx         # 업그레이드 구매 UI
│   ├── CollectionModal.tsx    # 도감 UI
│   ├── DailyRewardModal.tsx   # 일일 보상 UI
│   ├── ReturnRewardModal.tsx  # 복귀 보상 UI
│   ├── OfflineRewardModal.tsx # 오프라인 보상 UI
│   ├── TimedRewardTray.tsx    # pending timed reward 재오픈 진입점
│   └── ...
├── game/
│   ├── economy.ts             # 비용 공식, 배율 공식, 상수
│   ├── coins.ts               # 코인 / 보드 순수 로직
│   ├── achievements.ts        # 업적 판단 로직
│   └── rewards.ts             # 일일 / 복귀 / 오프라인 보상 계산
├── store/
│   ├── gameState.ts           # 초기 상태
│   ├── persistence.ts         # persist partialize / hydration fallback
│   ├── types.ts               # store state / actions 타입
│   └── useGameStore.ts        # 상태 저장소와 액션 오케스트레이션
├── styles/
│   ├── base.css
│   ├── layout.css
│   ├── modals.css
│   └── responsive.css
├── types/
│   └── game.ts                # 코인 데이터, 업적 데이터, 공용 타입
└── utils/
    ├── dailyReward.ts
    ├── formatMoney.ts
    └── soundManager.ts
```

## 2. 핵심 모델

보드:
- `GRID_SIZE = 5`
- `TOTAL_CELLS = 25`

코인:
- `COIN_LEVELS`: 이름 / 가치 / 이모지 정의
- `COIN_BASE_INCOME`: 코인 1개가 1회 수익 지급 주기마다 만드는 기본 수익
- 최대 레벨은 `Lv.18`

상태:
- 단일 상태 원본은 `useGameStore.ts`
- 저장은 `zustand/persist`
- persist 키는 `merge-money-tycoon-v6`
- hydration 시 누락 필드 fallback과 수익 필드 보정을 함께 처리

## 3. 게임 루프

생산:
- `spawnCoin()`은 현재 `spawnLevel` 기준 코인을 생성합니다.
- 비용은 해당 레벨 코인 가치와 동일합니다.

머지:
- `tryMerge()`는 같은 레벨 코인 2개를 상위 레벨 1개로 합칩니다.
- 머지 보너스는 `RewardSource = 'merge_bonus'` 경로로 처리합니다.

주기 수익:
- `Header.tsx`가 `incomeInterval` 주기로 `grantMoney(incomePerTick, 'passive_income')`를 호출합니다.
- 실제 최종 지급액은 `finalizeRewardAmount()`에서 배율과 부스트를 반영합니다.

자동화:
- `Board.tsx`는 `AUTO_MERGE`, `AUTO_SPAWN`이 활성일 때만 루프를 돌립니다.
- 비활성 상태의 1초 polling은 제거됐습니다.

## 4. 보상 구조

일일 보상:
- KST(`Asia/Seoul`) 기준 하루 1회
- `dailyReward.ts`에서 streak와 지급액 계산

복귀 보상:
- 마지막 접속 기준 48시간 이상 이탈 시 대상
- `rewards.ts`에서 구간별 배수(`x30`, `x60`, `x120`) 계산
- `ReturnRewardModal.tsx`에서 수령 / 보류 / 폐기 처리

오프라인 보상:
- 최근 이탈 시간에 대해 최소형 정산
- 현재 50% 효율, 최대 4시간 상한
- `OfflineRewardModal.tsx`에서 수령 / 보류 / 폐기 처리

timed reward 보류 UX:
- timed reward 모달을 닫아도 pending reward는 유지됩니다.
- `TimedRewardTray.tsx`가 메인 화면에서 수동 재오픈 진입점을 제공합니다.
- `refreshTimedRewards()`는 이미 pending 상태인 보상을 덮어쓰지 않습니다.
- 시스템 시간이 역행해도 `lastSeenAt`이 뒤로 가지 않도록 보정합니다.
- 복귀 보상이 pending이면 오프라인 보상을 신규 생성하지 않아 과도한 중복 정산을 완화합니다.

보상 원천:
- `RewardSource`로 관리합니다.
- 현재 정의: `passive_income`, `merge_bonus`, `daily_reward`, `return_reward`, `offline_reward`, `achievement_reward`, `monetization_bonus`
- 이 구조는 향후 광고 보상과 IAP 연계 시 공통 진입점으로 재사용합니다.

## 5. 확장 지점

코인 단계 추가:
1. `src/types/game.ts`에 `COIN_LEVELS`, `COIN_BASE_INCOME` 추가
2. `src/components/Coin.tsx` 표시 보강
3. 도감 / 상점 문구 점검

보상 기능 추가:
1. `RewardSource`에 새 보상 원천 추가
2. `game/rewards.ts`에 계산 규칙 추가
3. `store/useGameStore.ts`에 지급 액션 연결
4. 모달 또는 HUD 연결

저장 필드 추가:
1. `src/types/game.ts`
2. `src/store/gameState.ts`
3. `src/store/persistence.ts`
4. 관련 UI / 문서

## 6. 운영 원칙

- 구조 변경 시 `README`, `CHANGELOG`, `ROADMAP`, `PHASE1_TASKS`, 필요 시 `TEMPLATE_GUIDE`까지 같이 갱신합니다.
- 라이브 단계에서는 기능 추가보다 저장 안정성, 보상 중복 방지, 기기별 레이아웃 안정성이 우선입니다.
