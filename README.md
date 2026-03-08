# Merge Money Tycoon

토스 앱용 머지 + 방치형 웹 게임 프로젝트입니다. React + Vite + TypeScript + Zustand 기반이며, PWA와 Capacitor(Android) 빌드를 함께 지원합니다.

현재 기준 상태:
- 버전: `v1.5.2`
- 보드 크기: `5x5` (`25칸`)
- 코인 단계: `Lv.1 ~ Lv.18`
- 일일 보상: 구현 완료
- 복귀 보상: 구현 완료
- 오프라인 보상: 최소형 구현 완료
- timed reward UX: 닫아도 보류 유지, 메인 화면에서 수동 재오픈 가능
- 리워드 가드레일: 시계 역행 방어, 복귀/오프라인 중복 정산 완화 반영
- 광고 SDK / IAP: 미연동, 보상 진입점 구조만 준비 완료

## 기술 스택
- React 19
- TypeScript 5
- Vite 7
- Zustand
- Framer Motion
- Tailwind CSS 4
- Capacitor 8

## 개발 환경
- Node.js `22.x`
- npm `11+`

```bash
node -v
npm -v
```

## 시작하기
```bash
npm install
npm run dev
```

## 검증 명령
```bash
npm run lint
npm run build
```

## 빌드 분기
- 기본 웹 / PWA 빌드

```bash
npm run build
```

- Capacitor(Android WebView) 빌드

```bash
# bash/zsh
VITE_BUILD_TARGET=capacitor npm run build

# PowerShell
$env:VITE_BUILD_TARGET='capacitor'; npm run build
```

- PWA 비활성 빌드

```bash
# bash/zsh
VITE_ENABLE_PWA=false npm run build

# PowerShell
$env:VITE_ENABLE_PWA='false'; npm run build
```

## Android 릴리즈 서명
릴리즈 빌드에는 아래 환경 변수가 필요합니다.
- `ANDROID_KEYSTORE_PATH`
- `ANDROID_KEY_ALIAS`
- `ANDROID_KEYSTORE_PASSWORD`
- `ANDROID_KEY_PASSWORD`

원칙:
- `keystore` 파일은 저장소에 커밋하지 않습니다.
- CI에서는 `ANDROID_KEYSTORE_BASE64` 같은 시크릿으로 복원합니다.

## 데이터 / 개인정보
- 게임 데이터는 브라우저 `localStorage`에 저장됩니다.
- 서버로 개인정보를 수집하거나 전송하지 않습니다.
- 자세한 정책은 [public/privacy.html](D:/Projects/Web/AIP_merge-to-rich/public/privacy.html), [PRIVACY_POLICY.md](D:/Projects/Web/AIP_merge-to-rich/docs/PRIVACY_POLICY.md)를 기준으로 봅니다.

## 문서 맵
현재 기준 문서:
- [ONBOARDING.md](D:/Projects/Web/AIP_merge-to-rich/docs/ONBOARDING.md)
- [ARCHITECTURE.md](D:/Projects/Web/AIP_merge-to-rich/docs/ARCHITECTURE.md)
- [CHANGELOG.md](D:/Projects/Web/AIP_merge-to-rich/docs/CHANGELOG.md)
- [ROADMAP.md](D:/Projects/Web/AIP_merge-to-rich/docs/ROADMAP.md)
- [TROUBLESHOOTING.md](D:/Projects/Web/AIP_merge-to-rich/docs/TROUBLESHOOTING.md)
- [PRIVACY_POLICY.md](D:/Projects/Web/AIP_merge-to-rich/docs/PRIVACY_POLICY.md)

계획 문서:
- [PHASE1_PLAN.md](D:/Projects/Web/AIP_merge-to-rich/docs/PHASE1_PLAN.md)
- [PHASE1_TASKS.md](D:/Projects/Web/AIP_merge-to-rich/docs/PHASE1_TASKS.md)
- [RETURN_REWARD_PLAN.md](D:/Projects/Web/AIP_merge-to-rich/docs/RETURN_REWARD_PLAN.md)

재사용 / 템플릿 문서:
- [ASSET_GUIDE.md](D:/Projects/Web/AIP_merge-to-rich/docs/ASSET_GUIDE.md)
- [TEMPLATE_GUIDE.md](D:/Projects/Web/AIP_merge-to-rich/docs/TEMPLATE_GUIDE.md)
- [STORE_LISTING.md](D:/Projects/Web/AIP_merge-to-rich/docs/STORE_LISTING.md)

운영 기록 / 리포트:
- [DEV_LOG_FULL.md](D:/Projects/Web/AIP_merge-to-rich/docs/DEV_LOG_FULL.md)
- [BUG_ISSUE_REPORT.md](D:/Projects/Web/AIP_merge-to-rich/docs/BUG_ISSUE_REPORT.md)
- [LIVE_STABILITY_CHECKLIST_2026-03-08.md](D:/Projects/Web/AIP_merge-to-rich/docs/LIVE_STABILITY_CHECKLIST_2026-03-08.md)
- [AUTOMATION_SUMMARY_2026-03-08.md](D:/Projects/Web/AIP_merge-to-rich/docs/AUTOMATION_SUMMARY_2026-03-08.md)
