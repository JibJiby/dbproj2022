## 프로젝트

2022 데이터베이스 프로젝트 프론트/백엔드 repo
프로젝트 솔루션

<br><br>

## 기술 스택

Typescript
Nestjs
Handlers
jquery
Bootstrap

<br><br>

## 설치 순서

### 미리 설치

- mysql community (로컬용 DB 서버)
  설치 주소 : https://dev.mysql.com/downloads/

<br>

- node.js
  설치 주소 : https://nodejs.org/ko/
  확인법

  ```bash
  npm -v
  ```

<br>

- nest-cli 전역 설치 (node 정상 설치되어야 가능)

  ```bash
  npm i -g @nestjs/cli
  ```

<br>

설치 중 자세한 설명은 <u>구글링 추천</u>해드립니다.

<br>

### Fork

문서 확인하면서 레포 포크하기
// 노션 주소

<br>

### 설치 후 의존성 설치

```bash
$ npm install
```

<br><br>

## 서버 실행

### 스키마 생성

MysqlWorkbench나 터미널로 mysql 서버에 접속한다음 아래 쿼리로 스키마 생성하기
자세한 mysql 서버 접속 방법은 <u>구글링 추천</u>해드립니다.

```bash
CREATE SCHEMA `dbproj2022` DEFAULT CHARACTER SET utf8mb4 ;
```

<br>

### 실제 서버 실행 스크립트

```bash
# development
$ npm run start:dev
```

정상적으로 실행되었다면 스키마에 테이블들 정상 저장된 거 확인할 수 있음
