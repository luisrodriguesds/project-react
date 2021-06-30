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
                withCredentials([string(credentialsId: 'github-token', variable: 'TOKEN')]){
                  sh """
                    echo 'REACT_APP_GITHUB_TOKEN=${TOKEN}' > .env
                    echo 'REACT_APP_GITHUB_TOKEN=${TOKEN}' > .env.test.local
                    npm run test
                    npm run build
                  """
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
