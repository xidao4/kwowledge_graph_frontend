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
                sh 'vue-cli-service serve'
            }
        }
    }
}
