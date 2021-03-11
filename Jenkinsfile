pipeline {
    agent none
    stages {
        stage('build') {
            agent {
                docker {
                    image 'node:latest'
                }
            }
            steps {
                echo 'build'
                sh 'npm install'
                echo 'todo'
            }
        }
    }
}
