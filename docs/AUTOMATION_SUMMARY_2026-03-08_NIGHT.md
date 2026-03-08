# 작업 요약 (Automation Summary) - 2026-03-08 NIGHT

상태: Report  
기준일: 2026-03-08

## 1) what was fixed
- 로컬 빌드 실패 원인(`@rollup/rollup-linux-x64-gnu` optional dependency 누락) 재현 후 `npm i`로 복구
- 일일 보상 수령 가능 판정에 시계 역행 가드(`lastClaimAt`) 추가
- timed reward 갱신 시 `lastSeenAt`이 뒤로 가지 않도록 보정
- 복귀 보상이 pending일 때 오프라인 보상을 새로 계산하지 않도록 우선순위 정리

## 2) what was tuned or expanded
- 일일 보상 배지(App)와 모달의 수령 가능 판정을 store 단일 경로(`canClaimDailyReward`)로 통일
- 리텐션 업적 4종 추가
  - 출석 루키(일일 7회)
  - 출석 챔피언(일일 30회)
  - 복귀 단골(복귀 3회)
  - 절전 고수(오프라인 10회)

## 3) validations run
- `npm run lint` ✅
- `npm run build` ✅
- 라이브 안정성 체크리스트 갱신: `docs/LIVE_STABILITY_CHECKLIST_2026-03-08.md`

## 4) local commits created
- (작성 예정) `chore: recover local rollup optional dependency and verify build`
- (작성 예정) `feat: harden reward guardrails and add retention achievements`
- (작성 예정) `docs: sync live-ops docs for v1.5.2 night batch`

## 5) remaining risks / next best steps
- 서버 검증 없는 로컬 저장 구조 특성상 기기 시계 조작 완전 차단은 어려움
- timed reward 밸런스(복귀 배수/오프라인 효율/상한) 실플레이 데이터 기반 2차 조정 필요
- Android 실기기에서 백그라운드 전환 경계(짧은 sleep/긴 sleep) QA 추가 권장
