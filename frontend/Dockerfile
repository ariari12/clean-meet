# 1. Node.js 이미지 선택 (Next.js 실행을 위한 Node 환경)
FROM node:18-alpine AS builder
WORKDIR /app

# 2. package.json과 yarn.lock 복사 후 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 3. 프로젝트 소스 코드 복사
COPY . .

# 4. Next.js 빌드 실행
RUN yarn build

# 5. 프로덕션 실행을 위한 가벼운 Node 이미지 사용
FROM node:18-alpine
WORKDIR /app

# 6. 빌드 결과물 복사
COPY --from=builder /app ./

# 7. 포트 설정 및 실행 명령어
EXPOSE 3000
CMD ["yarn", "start"]
