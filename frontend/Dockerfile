# 1. Node.js 이미지 선택 (Next.js 실행을 위한 Node 환경)
FROM node:18-alpine AS builder
WORKDIR /app

# 2. 환경변수 설정 (빌드 타임 ARG → 런타임 ENV로 변환)
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# 2. package.json과 yarn.lock 복사 후 의존성 설치
COPY package.json yarn.lock ./
RUN yarn install

# 3. 프로젝트 소스 코드 복사
COPY . .

# 4. Next.js 빌드 실행
RUN yarn build

# 5. Next.js standalone 실행
FROM node:18-alpine
WORKDIR /app

# 6. 빌드 결과물 복사
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# 7. 포트 설정 및 실행 명령어
EXPOSE 3000
CMD ["node", "server.js"]