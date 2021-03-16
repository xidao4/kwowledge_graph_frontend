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
        stage('Image Build & deploy'){
            agent{
                label 'master'
            }
            steps{
                sh "ls"
                sh "pwd"
                sh "docker build -t frontend-coin ."
                sh "if (docker ps -a |grep frontend-coin) then (docker stop frontend-coin && docker rm frontend-coin) fi"
                sh "docker run --name=frontend-coin -d -p 9020:80 frontend-coin"
            }
        }
    }
}
