# CLAUDE.md - Fan AI Land 프로젝트 가이드

## 프로젝트 개요

- **프로젝트명**: Fan AI Land - KPOP 팬 플랫폼
- **목적**: 생성형 AI 기술 기반 KPOP 팬 플랫폼 개발
- **핵심 기능**: AI 랭킹 차트, AI 홈마, 팬 콘텐츠 공유
- **구조**: Next.js 15 (App Router) + Tailwind CSS + Shadcn UI
- **주요 기술**: Next.js 15, TypeScript, React 19
- **패키지 매니저**: pnpm (v10.12.2)
- **Node 버전**: >= 20.0.0

## 프로젝트 비전

AI 기술을 적용한 랭킹 시스템을 도입하여 글로벌 KPOP 팬들이 실시간으로 수요가 높은 팬 콘텐츠(이미지, 영상, 게시물 등)를 접하고 공유할 수 있는 웹 플랫폼

### 핵심 가치

1. **KPOP 팬 콘텐츠의 퀄리티 유지**: 랭킹 시스템과 소통형 웹 플랫폼
2. **AI 홈마 운영**: 생성형 AI를 활용한 팬 콘텐츠 생성
3. **글로벌 팬 커뮤니티**: 실시간 랭킹 및 콘텐츠 공유

## 개발 로드맵 (v1.0)

### 📌 전체 개발 계획 구조

본 프로젝트는 **UI/UX 중심의 5단계 개발 계획**으로 구성되어 있으며, 각 단계별로 **스크린샷으로 완성도를 증명**할 수 있도록 설계되었습니다.

**전체 개발 기간**: 2024.06 ~ 2025.10 (사업 협약 기간)

---

### 🎯 개발 우선순위 및 단계

#### 🔴 HIGH PRIORITY (Phase 1-2)
**목표**: 핵심 기능 완성 및 스크린샷 기반 완성도 검증

**기간**: 2024.06 ~ 2025.06

#### 🟡 MEDIUM PRIORITY (Phase 3-4)
**목표**: 커뮤니티 기능 고도화 및 글로벌화

**기간**: 2025.02 ~ 2025.08

#### 🟢 LOW PRIORITY (Phase 5)
**목표**: 사용자 경험 최적화 및 폴리시 개선

**기간**: 2025.04 ~ 2025.10

---

### Phase 1: AI 랭킹 차트 시스템 (🔴 최우선)

**목표**: 직관적인 실시간 랭킹 시스템 페이지 개발

**기간**: 2024.07 ~ 2025.04

**페이지**: `/ranking`

#### 🎯 핵심 작업
- 🏆 TOP 3 히어로 섹션 (금/은/동 메달)
- 📊 필터 시스템 (아티스트, 기간, 콘텐츠 타입)
- 📈 Recharts 통합 차트 (순위 변동, 트렌드)
- 💫 실시간 업데이트 애니메이션
- 📱 반응형 그리드 (모바일/태블릿/데스크탑)

#### 🖼️ 스크린샷 대상 (5장)
1. TOP 3 히어로 섹션 (금/은/동 메달 + LIVE 배지)
2. 필터 적용된 전체 그리드
3. 순위 변동 라인 차트
4. 시간대별 트렌드 바 차트
5. 모바일 반응형 뷰

#### 📋 GitHub Issue
[#1 - AI 랭킹 차트 페이지 개발](https://github.com/KooYS/fan_ai_land/issues/1)

---

### Phase 2: AI 홈마 생성 인터페이스 (🔴 최우선)

**목표**: AI 이미지 생성 프로세스를 시각적으로 보여주는 UI

**기간**: 2024.09 ~ 2025.07

**페이지**: `/ai-homma`

#### 🎯 핵심 작업
- 🎨 생성 인터페이스 (프롬프트, 아티스트, 스타일 선택)
- ⚡ 생성 프로세스 애니메이션 (프로그레스 바)
- 🖼️ 결과 갤러리 (Masonry 레이아웃)
- 📸 이미지 확대 보기 모달
- 📜 생성 히스토리 관리

#### 🖼️ 스크린샷 대상 (5장)
1. 생성 인터페이스 전체
2. 생성 중 프로그레스 화면
3. 결과 갤러리
4. 이미지 확대 보기 모달
5. Before/After 비교 슬라이더

#### 📋 GitHub Issue
[#2 - AI 홈마 생성 인터페이스](https://github.com/KooYS/fan_ai_land/issues/2)

---

### Phase 3: 피드 & 커뮤니티 (🟡 중간 우선)

**목표**: SNS 스타일의 팬 커뮤니티 플랫폼

**기간**: 2024.12 ~ 2025.08

**페이지**: `/feed`

#### 🎯 핵심 작업
- 📰 피드 카드 컴포넌트 (사용자 정보, 콘텐츠, 액션)
- 🔥 트렌딩 섹션 (해시태그, 크리에이터)
- ✍️ 포스트 작성 UI (FAB + Sheet)
- 💬 댓글 시스템
- 🎯 인터랙션 기능 (좋아요, 공유, 북마크)

#### 🖼️ 스크린샷 대상 (3장)
1. 피드 타임라인 (여러 카드)
2. 포스트 작성 Sheet UI
3. 트렌딩 & 댓글 섹션

#### 📋 GitHub Issue
[#3 - 피드 페이지 고도화](https://github.com/KooYS/fan_ai_land/issues/3)

---

### Phase 4: 글로벌화 & 반응형 최적화 (🟡 중간 우선)

**목표**: 다국어 지원 및 모든 디바이스 최적화

**기간**: 2025.01 ~ 2025.09

#### 🎯 핵심 작업

**4-1. 다국어 지원 (i18n)**
- next-intl 설정
- 4개국 번역 (한/영/일/중)
- 언어 스위처 UI

**4-2. 반응형 최적화**
- 모바일 네비게이션 (햄버거 메뉴)
- 하단 탭 바 구현
- PWA 설정 (manifest.json)
- 터치 제스처 지원

#### 🖼️ 스크린샷 대상 (2장)
1. 다국어 전환 (언어 스위처)
2. 모바일 네비게이션

#### 📋 GitHub Issues
- [#5 - 다국어 지원 (i18n)](https://github.com/KooYS/fan_ai_land/issues/5)
- [#6 - 반응형 최적화](https://github.com/KooYS/fan_ai_land/issues/6)

---

### Phase 5: 애니메이션 & 폴리시 (🟢 낮은 우선)

**목표**: 부드럽고 직관적인 사용자 경험

**기간**: 2025.03 ~ 2025.10

#### 🎯 핵심 작업
- 🎬 Framer Motion 통합 (페이지 전환, 리스트 애니메이션)
- ✨ 마이크로 인터랙션 (하트 터지기, 버튼 피드백)
- 💀 Skeleton 로딩 및 Shimmer 효과
- 🚀 성능 최적화 (이미지, 코드 스플리팅)
- 📊 Core Web Vitals 최적화

#### 📋 GitHub Issue
[#7 - 애니메이션 & 폴리시](https://github.com/KooYS/fan_ai_land/issues/7)

---

## 📋 권장 개발 순서

```
Step 1. 필수 기반 작업 (1주)
    └─ Issue #4: Shadcn UI 컴포넌트 추가
    └─ Issue #8: Recharts 통합 및 차트 구현

Step 2. 핵심 기능 #1 (3주)
    └─ Issue #1: AI 랭킹 차트 페이지 개발
    └─ 스크린샷 5장 촬영

Step 3. 핵심 기능 #2 (3주)
    └─ Issue #2: AI 홈마 생성 인터페이스
    └─ 스크린샷 5장 촬영

Step 4. 커뮤니티 기능 (2주)
    └─ Issue #3: 피드 페이지 고도화
    └─ 스크린샷 3장 촬영

Step 5. 글로벌화 (2주)
    └─ Issue #5: 다국어 지원
    └─ Issue #6: 반응형 최적화
    └─ 스크린샷 2장 촬영

Step 6. 최적화 (진행 중)
    └─ Issue #7: 애니메이션 & 폴리시
    └─ 성능 최적화

총 개발 기간: ~4개월 (기본 로드맵)
```

---

## 🎨 Shadcn UI 추가 컴포넌트 설치

Phase 1-3 개발을 위해 다음 컴포넌트 설치 필요:

```bash
# 탭 & 선택
npx shadcn@latest add tabs
npx shadcn@latest add select
npx shadcn@latest add textarea

# 슬라이더 & 프로그레스
npx shadcn@latest add slider
npx shadcn@latest add progress

# 로딩 & 피드백
npx shadcn@latest add skeleton
npx shadcn@latest add toast

# 패널 & 팝업
npx shadcn@latest add sheet
npx shadcn@latest add popover
npx shadcn@latest add dropdown-menu

# 확장 & 툴팁
npx shadcn@latest add accordion
npx shadcn@latest add tooltip
```

---

## 📊 추가 라이브러리 설치

```bash
# 차트 라이브러리
pnpm add recharts

# 애니메이션 (Phase 5)
pnpm add framer-motion

# 다국어 (Phase 4)
pnpm add next-intl
```

---

## 📈 개발 진행 추적

### 완료도 기준

- **Phase 1 (Ranking)**: 우선순위 최고 (25%)
- **Phase 2 (AI Homma)**: 우선순위 최고 (25%)
- **Phase 3 (Feed)**: 우선순위 중간 (20%)
- **Phase 4 (Global)**: 우선순위 중간 (15%)
- **Phase 5 (Polish)**: 우선순위 낮음 (15%)

### 스크린샷 체크리스트 (총 15장)

- [ ] Phase 1: 5장
- [ ] Phase 2: 5장
- [ ] Phase 3: 3장
- [ ] Phase 4: 2장

---

## 🔗 참고 문서

- 상세 개발 계획: `DEVELOPMENT_PLAN.md`
- GitHub Issues: https://github.com/KooYS/fan_ai_land/issues
- 사업 계획서: 포스트팁스 제출 자료

## 프로젝트 구조

```
fan_ai_land/
├── src/
│   ├── app/
│   │   ├── (main)/              # 메인 레이아웃 그룹
│   │   │   ├── _components/     # 메인 페이지 전용 컴포넌트
│   │   │   ├── feed/            # 피드 페이지
│   │   │   ├── page.tsx         # 메인 홈페이지
│   │   │   └── layout.tsx       # 메인 레이아웃
│   │   ├── layout.tsx           # 루트 레이아웃
│   │   └── globals.css          # 글로벌 스타일
│   ├── components/
│   │   ├── ui/                  # shadcn/ui 컴포넌트
│   │   └── layout/              # 레이아웃 컴포넌트
│   └── lib/
│       └── utils.ts             # 유틸리티 함수
├── public/                      # 정적 파일
└── CLAUDE.md                    # 프로젝트 가이드
```

## 개발 환경 설정

### 로컬 개발 서버 실행

```bash
# 개발 서버 시작 (Turbopack)
pnpm dev

# 프로덕션 빌드
pnpm build

# 프로덕션 모드 실행
pnpm start

# 린트 실행
pnpm lint
```

### 의존성 관리

```bash
# 의존성 설치
pnpm install

# 의존성 추가
pnpm add <package-name>

# 개발 의존성 추가
pnpm add -D <package-name>
```

## 기술 스택

### Frontend

- **Framework**: Next.js 15.1.7 (App Router)
- **UI Library**: React 19.0.0
- **스타일링**:
  - Tailwind CSS 4.0.8
  - Radix UI Components
  - shadcn/ui 컴포넌트 패턴
- **아이콘**: Lucide React
- **캐러셀**: Embla Carousel
- **스크롤**: SimpleBar React

### 개발 도구

- **TypeScript**: 5.x
- **린터**: ESLint
- **포매터**: Prettier (권장)
- **패키지 매니저**: pnpm 10.12.2

### 데이터 처리 (현재 단계)

- **Mock Data**: Fake Data를 활용한 프로토타입 개발
- **향후 계획**: API 연동 및 실시간 데이터 처리

## 주요 패턴 및 컨벤션

### 컴포넌트 구조

- Next.js App Router 패턴 사용
- 페이지별 `_components` 폴더로 컴포넌트 구성
- 서버/클라이언트 컴포넌트 명확히 구분
- shadcn/ui 컴포넌트는 `src/components/ui/`에 위치

### 데이터 처리

- **현재 단계**: Fake Data 사용
- **향후 계획**: API 연동 및 실시간 데이터 처리
- Mock 데이터는 컴포넌트 또는 별도 `data/` 폴더에 관리

### 파일 네이밍

- 컴포넌트: PascalCase (예: `RankingCard.tsx`)
- 페이지: kebab-case (예: `ai-ranking/page.tsx`)
- 훅: camelCase with `use` prefix (예: `useRanking.ts`)
- 유틸리티: camelCase (예: `formatDate.ts`)
- 타입/인터페이스: PascalCase with prefix (예: `IUser`, `TRanking`)

### 스타일링 원칙

- Tailwind CSS 유틸리티 클래스 우선 사용
- 복잡한 스타일은 컴포넌트 레벨에서 관리
- 테마 색상은 `tailwind.config.ts`에서 정의
- 다크 모드 고려하여 개발

## Git 워크플로우

### 브랜치 전략

- `main`: 프로덕션 배포 브랜치
- `dev`: 개발 통합 브랜치 (필요시)
- `feature/*`: 기능 개발 브랜치
- `fix/*`: 버그 수정 브랜치

### 커밋 컨벤션 개요

Conventional Commits 기반 (자세한 내용은 하단 참조):

- `feat:` 새로운 기능
- `fix:` 버그 수정
- `docs:` 문서 수정
- `design:` CSS, UI 변경
- `style:` 코드 포맷팅
- `refactor:` 코드 리팩토링
- `test:` 테스트 코드
- `chore:` 빌드, 설정 관련

## 주의사항

### 보안

- 민감한 정보(API 키 등)는 환경 변수 사용
- `.env.local` 파일은 절대 커밋하지 않음
- Public 폴더에 민감한 파일 업로드 금지

### 성능

- 이미지는 Next.js `<Image>` 컴포넌트 사용
- 적절한 로딩 상태 표시
- 클라이언트 컴포넌트 최소화

### 개발 시 주의사항

- **pnpm 사용 필수** (npm, yarn 사용 금지)
- TypeScript 타입 정의 철저히
- 컴포넌트 재사용성 고려
- 접근성(a11y) 고려하여 개발

## 문제 해결

### 자주 발생하는 이슈

1. **빌드 에러**: `pnpm install` 재실행
2. **타입 에러**: `tsconfig.json` 설정 확인
3. **스타일 미적용**: Tailwind 설정 및 캐시 확인

### 유용한 명령어

```bash
# 개발 서버 재시작
pnpm dev

# 빌드 확인
pnpm build

# 타입 체크
npx tsc --noEmit

# 캐시 클리어 (Next.js)
rm -rf .next
```

## 추가 리소스

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)

## Best Practices

1. **컴포넌트 설계**: 단일 책임 원칙
2. **상태 관리**: 가능한 서버 컴포넌트 활용
3. **타입 안정성**: `any` 타입 사용 지양
4. **코드 가독성**: 명확한 변수/함수명 사용
5. **문서화**: 복잡한 로직은 주석 추가

## 금지사항

❌ 피해야 할 패턴:

- 하드코딩된 값 (상수는 별도 파일로 관리)
- 과도한 props drilling
- 중복 코드
- 비표준 컨벤션
- Claude Code 출처 표시 추가

✅ 권장사항:

- 컴포넌트 분리 및 재사용
- 타입 안정성 확보
- 성능 최적화 고려
- 접근성 준수
- 일관된 코딩 스타일

---

# Git Commit Convention

본 프로젝트는 Conventional Commits 기반의 커밋 메시지 컨벤션을 따릅니다.

## 기본 구조

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Commit Types

### 주요 타입

- **Feat**: 새로운 기능 추가
- **Fix**: 버그 수정
- **Docs**: 문서 수정
- **Design**: CSS, UI 변경
- **Style**: 코드 포맷팅, 세미콜론 누락 등 (기능 변경 없음)
- **Refactor**: 코드 리팩토링 (기능 변경 없음)
- **Test**: 테스트 코드 추가/수정
- **Chore**: 빌드 스크립트, 패키지 관리 등

### 추가 타입

- **Perf**: 성능 개선
- **Ci**: CI/CD 설정 변경
- **Build**: 빌드 시스템 변경
- **Revert**: 이전 커밋 되돌리기

## 작성 규칙

### Subject (제목)

- 50자 이내로 작성
- 첫 글자는 대문자로 시작
- 마침표(.) 사용하지 않음
- 명령문으로 작성
- 현재형으로 작성
- 영어: "Fix", "Add", "Change"로 시작
- 한글: "고침", "추가", "변경"으로 시작

### Body (본문)

- 72자마다 줄바꿈
- "무엇"과 "왜"를 설명
- "어떻게"보다는 변경의 이유와 목적에 집중

### Footer (꼬리말)

이슈 트래커 연동:

- `Fixes: #이슈번호` - 이슈 수정 중 (미해결)
- `Resolves: #이슈번호` - 이슈 해결 완료
- `Ref: #이슈번호` - 참고할 이슈
- `Related to: #이슈번호` - 관련 이슈 (미해결)

## 자동 커밋 가이드라인

Claude Code 사용 시 다음 우선순위로 커밋 타입을 결정:

**중요: 커밋 메시지에 Claude Code 출처 표시를 추가하지 마세요.**

1. **파일 분석 기준**:

   - `package.json`, `yarn.lock` 변경 → `Chore`
   - `test/`, `__tests__/` 폴더 → `Test`
   - `README.md`, `docs/` 폴더 → `Docs`
   - `.css`, `.scss` 파일 → `Design`
   - 새 기능 파일 추가 → `Feat`
   - 기존 로직 수정 → `Fix` 또는 `Refactor`

2. **변경 내용 분석**:
   - 새로운 함수/컴포넌트 추가 → `Feat`
   - 버그 수정, 에러 해결 → `Fix`
   - 코드 구조 개선 → `Refactor`
   - 성능 최적화 → `Perf`

## 예시

### 기본 예시

```
Feat(auth): 추가 JWT token 검증

JWT token 검증 미들웨어 구현 (API 보안 향상)

Resolves: #123
```

### 간단한 수정

```
fix: 고침 로그인 버튼 이슈
```

### 영어 예시

```
Feat(api): Add user authentication endpoint

Implement OAuth 2.0 authentication with JWT tokens
for enhanced security and user session management

Resolves: #456
Related to: #123, #234
```

## Claude Code 통합

### 자동 커밋 명령어

프로젝트에서 `/commit` 명령어 사용 시:

1. 변경사항 자동 분석
2. 적절한 타입 선택
3. 의미있는 메시지 생성
4. 사용자 확인 후 커밋

### 권장 워크플로우

```bash
# 변경사항 확인 및 자동 커밋
/commit

# 특정 타입으로 커밋
> feat 타입으로 사용자 인증 기능 커밋해줘

# 이슈 연동 커밋
> #123 이슈 해결한 변경사항 커밋해줘
```

## Best Practices

1. **일관성 유지**: 팀 내 동일한 컨벤션 사용
2. **의미 있는 커밋**: 논리적 단위로 변경사항 분리
3. **명확한 설명**: 코드를 보지 않고도 변경사항 이해 가능
4. **정기적 커밋**: 작은 단위로 자주 커밋
5. **리뷰 고려**: 리뷰어가 이해하기 쉽게 작성

## 금지사항

❌ 피해야 할 패턴:

- 모호한 메시지: "fix bug", "update code"
- 너무 긴 제목 (50자 초과)
- 마침표 사용
- 과거형 사용
- Claude Code 출처 표시 추가

✅ 권장사항:

- 구체적이고 명확한 설명
- 표준 타입 사용
- 변경 이유 명시
- 관련 이슈 번호 포함
- Subject, Body, Footer 구분을 명확하고 패턴을 지켜 작성
