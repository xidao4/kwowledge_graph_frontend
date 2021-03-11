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
                echo 'yarn install'
                sh 'yarn'
                echo 'yarn build'
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
    }
}
