# GIVETREE

### 개발 환경 세팅하기

```bash

# yarn 이 설치되어 있지 않다면, 다음 명령어를 관리자 권한으로 실행
corepack enable

yarn install

yarn dlx @yarnpkg/sdks vscode
```

```bash
# storybook 실행하기
yarn storybook

# development mode 실행
yarn dev
```

### 📂 디렉토리 구조

```
├── @
│   ├── app                         // 페이지 (세부적인 건 아직 next를 잘 몰라서...)
│   ├── assets                      // 이미지, 폰트 등
│   │   ├── images
│   │   └── fonts
│   ├── components                  // 컴포넌트
│   │   ├── common                  // 공통 컴포넌트 (둘 이상의 도메인에서 사용할 가능성이 1% 라도 있는 컴포넌트)
│   │   └── market, member, ...     // 도메인에 종속적인 컴포넌트
│   ├── hooks                       // 커스텀 훅
│   ├── constants                   // 기타 상수
│   ├── utils                       // 유틸리티 함수
│   └── styles                      // CSS 관련 파일
```

- @/styles/tokens/\* 에 피그마에서 사용한 색상들 정의되어 있음.
