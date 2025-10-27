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

## 개발 로드맵

### Phase 1: AI 랭킹 차트 (현재 진행 중)

1. ✅ **기능 보안 및 개선 계획 수립**
   - 랭킹 차트 서비스의 개선점 분석

2. 🚧 **AI 랭킹 차트 개발**
   - AI 랭킹 차트 UI/UX 개발
   - Fake Data 기반 프로토타입 구현

3. ⏳ **글로벌 펀딩 의견 수립**
   - AI 랭킹 서비스에 대한 펀딩 의견 수립

4. ⏳ **AI 랭킹 시스템 개선 및 서비스 오픈**
   - 시스템 개선 및 정식 출시

### Phase 2: AI 홈마

5. ⏳ **기능 보안 및 개선 계획 수립**
   - AI 홈마 서비스의 개선점 분석

6. ⏳ **AI 홈마 개발**
   - AI 홈마 기능 개발 진행

7. ⏳ **글로벌 펀딩 의견 수립**
   - AI 홈마에 대한 펀딩 의견 수립

8. ⏳ **AI 홈마 시스템 개선 및 서비스 오픈**
   - 시스템 개선 및 정식 출시

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
