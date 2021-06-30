pipeline {
     agent any
     stages {
        stage("Checking and Installing dependencies") {
            steps {
                sh "npm install"
            }
        }

        stage("Test and Build") {
            steps {
                sh "npm run test"
                sh "npm run build"
            }
        }

        stage("Deploy") {
            steps {
                sh "echo 'Deploy here'"
            }
        }
    }
}
