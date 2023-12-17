pipeline {
    agent any
    environment {
        AWS_ACCOUNT_ID = '617981262533'
        AWS_DEFAULT_REGION = 'us-east-1'
        IMAGE_REPO_NAME = 'jenkins-pipeline-my-web-app'
        IMAGE_TAG = 'latest'
        REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}"
    }

    stages {
      stage('Logging into AWS ECR') {
        steps {
          script {
            sh "aws ecr get-login-password --region ${AWS_DEFAULT_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com"
          }
        }
      }

      stage('Cloning Git') {
        steps {
          checkout([$class: 'GitSCM', branches: [[name: '*/main']], userRemoteConfigs: [[url: 'https://github.com/ajaykaarthic/my-web-app.git']]])
        }
      }

      stage('Building image') {
        steps {
          script {
            dockerImage = docker.build "${IMAGE_REPO_NAME}:${IMAGE_TAG}"
          }
        }
      }

      stage('Pushing to ECR') {
        steps {
          script {
            sh "docker tag ${IMAGE_REPO_NAME}:${IMAGE_TAG} ${REPOSITORY_URI}:$IMAGE_TAG"
            sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/${IMAGE_REPO_NAME}:${IMAGE_TAG}"
          }
        }
      }
    }
}
