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
                withCredentials([token(credentialsId: 'github-token', variable: 'GITHUB-TOKEN')]){
                  sh '''
                    echo 'REACT_APP_GITHUB_TOKEN=${GITHUB-TOKEN}' > .env
                    echo 'REACT_APP_GITHUB_TOKEN=${GITHUB-TOKEN}' > .env.test.local
                    npm run test
                    npm run build
                  '''
                }
            }
        }

        stage("Deploy") {
            steps {
                sh "echo 'Deploy here'"
            }
        }
    }
}
