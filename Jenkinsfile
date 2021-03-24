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
                sh 'yarn install'
                sh 'yarn build'

                echo 'publish coverage report'
                publishHTML([allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: false,
                    reportDir: 'coverage/Icov-report',
                    reportFiles: 'index.html',
                    reportName: 'Jest HTML Report',
                    reportTitles: ''])
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
