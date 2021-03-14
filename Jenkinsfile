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
                sh 'yarn install'
                sh 'yarn build'
            }
        }
        stage('Image Build & deploy'){
            agent{
                label 'master'
            }
            steps{
                sh "mv dist /root/vue/dist -f"
                sh "mv Dockerfile /root/vue/Dockerfile -f"
                sh "cd /root/vue"
                sh "docker build . -t frontend-coin:${BUILD_ID}"
                sh "if (docker ps -a |grep frontend-coin) then (docker stop frontend-coin && docker rm frontend-coin) fi"
                sh "docker run -p 8080:80 --name frontend-coin -v /log:/log -d frontend-coin:${BUILD_ID}"
            }
        }
    }
}
