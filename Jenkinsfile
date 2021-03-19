pipeline {
    agent none
    stages {
        stage('Yarn Build') {
            agent {
                docker {
                    image 'node:latest'
                }
            }
            steps {
                echo 'yarn config'
                sh 'yarn config set registry https://registry.npm.taobao.org'
                sh 'yarn install'
                sh 'yarn build'
            }
        }
        stage('Image Build'){
            agent{
                label 'master'
            }
            steps{
                echo 'Image Build Stage'
                sh "docker build . -t frontend-coin:${BUILD_ID}"
            }
        }
        stage('Image Push'){
            agent{
                label 'master'
            }
            steps{
                echo 'Image Push Stage'
                sh "docker tag frontend-coin:${BUILD_ID} ykxixi/frontend-coin:${BUILD_ID}"
                sh "docker login --username=ykxixi -p dockerdocker"
                sh "docker push ykxixi/frontend-coin:${BUILD_ID}"
            }
        }
        stage('deploy'){
            agent{
                label 'ydlServer'
            }
            steps{
                sh 'docker pull ykxixi/frontend-coin:${BUILD_ID}'
                sh "if (docker ps -a |grep frontend-coin) then (docker stop frontend-coin && docker rm frontend-coin) fi"
                sh "docker run -p 9020:80 --name frontend-coin -d ykxixi/frontend-coin:${BUILD_ID}"
            }
        }
    }
}
