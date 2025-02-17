pipeline {
    agent any

    environment {
        SPRING_DATASOURCE_URL_PROD       = credentials('SPRING_DATASOURCE_URL_PROD')
        SPRING_DATASOURCE_USERNAME_PROD  = credentials('SPRING_DATASOURCE_USERNAME_PROD')
        SPRING_DATASOURCE_PASSWORD_PROD  = credentials('SPRING_DATASOURCE_PASSWORD_PROD')
        JWT_SECRET                       = credentials('JWT_SECRET')
        REDIS_HOST                        = credentials('REDIS_HOST')
        REDIS_PORT                        = credentials('REDIS_PORT')
        NEXT_PUBLIC_API_BASE_URL         = credentials('NEXT_PUBLIC_API_BASE_URL')
    }

    stages {
        stage('Git Checkout') {
            steps {
                script {
                    echo "📥 Git 저장소에서 코드 가져오기"
                    checkout scm
                }
            }
        }

        stage('Stop & Remove Old Containers') {
            steps {
                script {
                    echo "🛑 기존 컨테이너 중지 및 제거"
                    sh """
                        docker-compose -f docker-compose.prod.yml down || true
                        docker system prune -f
                    """
                }
            }
        }

        stage('Pull Latest Image & Build') {
            steps {
                script {
                    echo "🚀 최신 Docker 이미지 가져오기 & 빌드"
                    try {
                        sh 'docker-compose -f docker-compose.prod.yml pull || true'
                        sh 'docker-compose -f docker-compose.prod.yml build'
                    } catch (Exception e) {
                        error "❌ Docker 이미지 빌드 실패: ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Run Application') {
            steps {
                script {
                    echo "▶️ 애플리케이션 실행"
                    try {
                        sh 'docker-compose -f docker-compose.prod.yml up -d'
                    } catch (Exception e) {
                        error "❌ 컨테이너 실행 실패: ${e.getMessage()}"
                    }
                }
            }
        }

        stage('Clean Up Unused Docker Resources') {
            steps {
                script {
                    echo "🧹 사용하지 않는 Docker 리소스 정리"
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        success {
            echo "✅ 배포 완료!"
        }
        failure {
            echo "❌ 배포 실패! 로그 확인 필요!"
        }
    }
}