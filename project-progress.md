# 🛠️ 매장 관리 시스템 - 개발 현황 정리

## ✅ 기본 프로젝트 정보
- 프로젝트명: store-mgmt-system
- 배포주소: https://store-mgmt-system.web.app
- 주요 스택: React, Firebase, Firestore, GitHub Actions

---

## 📅 개발 타임라인 (중요 이슈/단계)
- [x] Firebase 프로젝트 생성 및 호스팅 연결
- [x] GitHub Actions 배포 자동화 구성
- [x] 출결 UI 제작 (출근하기 버튼 포함)
- [x] Firestore 연동 성공 (출근 데이터 기록)
- [x] ESLint 오류 해결 (사용되지 않는 변수 등)
- [ ] 재고 연동 UI 제작 중
- [ ] 관리자/직원 권한 분기 기능 설계 예정

---

## 🐛 해결한 이슈
- GitHub Actions 배포 실패 (원인: `npm ci` vs `npm install` 충돌)
- `FirebaseError: collection() requires Firestore` → Firestore 초기화 누락
- ESLint `no-unused-vars` → 요약 데이터 미사용 문제 해결

---

## 🔗 배포 관련 설정
- Firebase 프로젝트: `store-mgmt-system`
- Hosting 설정: `firebase.json`
- 워크플로우: `.github/workflows/firebase-hosting-merge.yml`

---

## 🔜 다음 작업
- [ ] 관리자 페이지 UI 분리
- [ ] 출결 요약 대시보드 실제 데이터로 테스트
- [ ] Firestore 인덱스 충돌 해결 (복합 색인 생성) 