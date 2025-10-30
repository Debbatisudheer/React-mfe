pipeline {
    agent any

    tools {
        nodejs "nodejs-18"   // name you configured in Jenkins
    }

    stages {
        stage('Pull from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/Debbatisudheer/React-mfe.git'
            }
        }

        stage('Install dependencies') {
            steps {
                sh 'cd shell-app && npm install'
                sh 'cd menu-app && npm install'
                sh 'cd cart-app && npm install'
                sh 'cd login-app && npm install'
            }
        }

        stage('Build apps') {
            steps {
                sh 'cd shell-app && npm run build'
                sh 'cd menu-app && npm run build'
                sh 'cd cart-app && npm run build'
                sh 'cd login-app && npm run build'
            }
        }
    }
}
