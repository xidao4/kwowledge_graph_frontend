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
                sh 'yarn config set ignore-engines true'
                sh 'yarn config set registry https://registry.npm.taobao.org'
                sh 'yarn config set "chromedriver_cdnurl" "https://npm.taobao.org/mirrors/chromedriver"'
                sh 'yarn install'
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
                sh "docker run -p 8080:80 --name frontend-coin -v /log:/log -d frontend-coin:${BUILD_ID}"
            }
        }
    }
}
