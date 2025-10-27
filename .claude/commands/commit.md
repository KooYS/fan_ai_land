# Smart Commit

자동으로 변경사항을 분석하고 Conventional Commits 형식의 커밋 메시지를 생성합니다.
단, 불필요한 설명은 필요없고 바로 승인.

## 사용법

- `/commit` - 변경사항 자동 분석 후 커밋
- `/commit <메시지>` - 수동 메시지로 커밋 (컨벤션 검증 포함)

## 실행 프로세스

1. **변경사항 확인**

   ```bash
   git status
   git diff --cached  # staged 파일이 있는 경우
   git diff           # unstaged 파일 확인
   git branch --show-current  # 현재 브랜치에서 이슈 번호 추출
   ```

2. **파일 분석 및 타입 결정**

   - `package.json`, `yarn.lock`, `pnpm-lock.yaml` → `Chore`
   - `test/`, `__tests__/`, `*.test.*`, `*.spec.*` → `Test`
   - `README.md`, `docs/`, `*.md` (문서) → `Docs`
   - `*.css`, `*.scss`, `*.sass`, `*.less` → `Design`
   - `.github/workflows/`, `ci/`, `.circleci/` → `Ci`
   - `webpack.config.*`, `vite.config.*`, `rollup.config.*` → `Build`
   - 새 파일 추가 → `Feat`
   - 기존 파일 수정 → 내용 분석하여 `Fix`, `Refactor`, `Perf` 결정

3. **커밋 메시지 생성 규칙**

   **기본 구조:**

   ```
   <type>(<scope>): <subject>

   <body>

   <footer>
   ```

   **Type 우선순위:**

   - **Feat**: 새로운 기능, 컴포넌트, API 엔드포인트 추가
   - **Fix**: 버그 수정, 에러 해결, 예외 처리
   - **Docs**: 문서 추가/수정 (README, 주석, 가이드)
   - **Design**: UI/UX 변경, 스타일 수정
   - **Style**: 코드 포맷팅, 린트 수정, 세미콜론 등
   - **Refactor**: 기능 변경 없는 코드 구조 개선
   - **Perf**: 성능 최적화, 속도 개선
   - **Test**: 테스트 코드 추가/수정
   - **Chore**: 의존성 업데이트, 빌드 설정, 패키지 관리
   - **Ci**: CI/CD 파이프라인, GitHub Actions 등
   - **Build**: 빌드 도구, 번들러 설정 변경
   - **Revert**: 이전 커밋 되돌리기

4. **Subject 작성 규칙**

   - 50자 이내로 제한
   - 첫 글자 대문자로 시작
   - 마침표(.) 사용 금지
   - 명령문/현재형으로 작성
   - 영어: "Add", "Fix", "Update", "Remove" 등으로 시작
   - 한글: "추가", "고침", "변경", "제거" 등으로 시작

5. **Body 작성 (필요시)**

   - 72자마다 줄바꿈
   - "무엇을" 변경했는지보다 "왜" 변경했는지 설명
   - 기존 동작과의 차이점 명시

6. **Footer 작성 (필수)**

   **브랜치 이름에서 이슈 번호 자동 추출:**

   - `issue-324` 브랜치 → `Related to: #324` 자동 추가
   - `feat/issue-123` 브랜치 → `Related to: #123` 자동 추가

   **이슈 상태별 키워드:**

   - `Fixes: #이슈번호` - 이슈 수정 중 (미해결)
   - `Resolves: #이슈번호` - 이슈 완전 해결
   - `Ref: #이슈번호` - 참고할 이슈
   - `Related to: #이슈번호` - 관련 이슈들 (기본값)

   \*\*중요:

   - 모든 커밋에 이슈 번호 연결 필수
   - Claude Code 출처 표시를 Footer에 추가하지 마세요.\*\*

## 커밋 실행 단계

1. **변경사항이 staged되지 않은 경우:**

   ```bash
   git add .
   # 또는 선택적으로 git add <파일명>
   ```

2. **커밋 메시지 생성 및 확인:**

   - 브랜치 이름에서 이슈 번호 자동 추출 (예: `issue-324` → `#324`)
   - 분석 결과를 바탕으로 메시지 생성
   - Footer에 이슈 번호 자동 포함
   - 사용자에게 확인 요청
   - 필요시 수정 제안

3. **커밋 실행:**

   ```bash
   git commit -m "<생성된 커밋 메시지>"
   ```

   **중요: 커밋 메시지에는 오직 프로젝트 변경사항만 포함하며, Claude Code 출처나 Co-Authored-By 정보는 추가하지 않습니다.**

## 예시 시나리오

### 시나리오 1: 새 기능 추가

**변경 파일:** `src/components/LoginForm.tsx` (새 파일)
**생성 메시지:**

```
Feat(auth): 추가 로그인 폼 컴포넌트

사용자 인증을 위한 로그인 폼 구현
- 이메일/비밀번호 입력 필드
- 폼 유효성 검증
- 에러 메시지 표시

Related to: #123
```

### 시나리오 2: 버그 수정

**변경 파일:** `src/utils/validation.ts`
**생성 메시지:**

```
Fix(validation): 고침 이메일 유효성 검증 로직

특수문자가 포함된 이메일 주소 처리 오류 수정

Fixes: #456
```

### 시나리오 3: 의존성 업데이트

**변경 파일:** `package.json`, `yarn.lock`
**생성 메시지:**

```
Chore(deps): 업데이트 React 18.3.0

보안 패치 및 성능 개선을 위한 React 버전 업데이트
```

### 시나리오 4: 테스트 추가

**변경 파일:** `__tests__/LoginForm.test.tsx`
**생성 메시지:**

```
Test(auth): 추가 로그인 폼 단위 테스트

로그인 폼 컴포넌트의 렌더링 및 상호작용 테스트 추가
```

## 특별 처리 규칙

### 다중 타입 변경사항

여러 타입의 변경이 있는 경우:

1. 가장 중요한 변경사항의 타입 선택
2. Body에서 다른 변경사항들 언급
3. 또는 개별 커밋으로 분리 제안

### Breaking Changes

API 변경, 하위 호환성 깨짐:

```
feat!: 변경 사용자 API 스키마

BREAKING CHANGE: User 객체에서 'name' 필드가
'firstName'과 'lastName'으로 분리됨
```

### Scope 가이드라인

- `auth`: 인증/권한 관련
- `api`: API 엔드포인트
- `ui`: UI 컴포넌트
- `db`: 데이터베이스 관련
- `config`: 설정 파일
- `deps`: 의존성 관련
- `docs`: 문서 관련

## 주의사항

❌ **피해야 할 것들:**

- 모호한 메시지: "fix bug", "update code"
- 너무 긴 제목 (50자 초과)
- 마침표 사용
- 과거형 사용 ("Fixed", "Added")
- Claude Code 출처 표시 (🤖 Generated with Claude Code 등)

✅ **권장사항:**

- 구체적인 변경 내용 명시
- 변경 이유 포함
- 관련 이슈 번호 연결
- 일관된 언어 사용 (한글 또는 영어)
- Subject, Body, Footer 구분을 명확하고 패턴을 지켜 작성

## 에러 처리

1. **Staged 파일이 없는 경우:**

   - 변경사항 확인 후 staging 여부 묻기
   - 전체 또는 선택적 add 옵션 제공

2. **커밋 메시지 검증 실패:**

   - 컨벤션에 맞지 않는 경우 수정 제안
   - 예시와 함께 올바른 형식 안내

3. **Git 에러 발생:**
   - 에러 메시지 분석 후 해결 방법 제안
   - 브랜치 상태, 머지 충돌 등 확인
