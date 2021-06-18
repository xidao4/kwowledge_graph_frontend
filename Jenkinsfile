pipeline {
    agent none
    stages {
        stage('Yarn Build & test') {
            agent {
                docker {
                    image 'node:latest'
                }
            }
            steps {
                echo 'yarn config'
                sh 'yarn config set registry https://registry.npm.taobao.org'
                sh 'yarn install --registry=https://registry.npm.taobao.org'
                sh 'yarn build'


            }
        }
        stage('Image Build & deploy'){
            agent{
                label 'master'
            }
            steps{
                sh "docker build . -t frontend-coin:${BUILD_ID}"
                sh "if (docker ps -a |grep frontend-coin) then (docker stop frontend-coin && docker rm frontend-coin) fi"
                sh "docker run -p 9020:80 --name frontend-coin -d frontend-coin:${BUILD_ID}"
            }
        }
    }
}
