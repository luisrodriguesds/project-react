pipeline {
     agent any
     stages {
        stage("Build and Test") {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
    }
}
