pipeline {
    agent any

    environment {
        NEXUS_URL = 'http://localhost:8081'
        NEXUS_REPO = 'my-raw-repo'    // change to your Nexus repo name
        CREDENTIALS_ID = 'nexus-creds' // Jenkins credential ID for Nexus
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/sami-dot/flashfacts.git', branch: 'main'
            }
        }

        stage('Build Client') {
            steps {
                dir('client') {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'zip -r ../client-build.zip build'
                }
            }
        }

        stage('Build Server') {
            steps {
                dir('server') {
                    sh 'npm install'
                    // Add any server build or test commands here if needed
                }
            }
        }

        stage('Upload Artifact to Nexus') {
            steps {
                nexusArtifactUploader(
                    nexusVersion: 'nexus3',
                    protocol: 'http',
                    nexusUrl: "${NEXUS_URL}",
                    credentialsId: "${CREDENTIALS_ID}",
                    groupId: 'com.flashfacts',
                    version: '1.0.0',
                    repository: "${NEXUS_REPO}",
                    artifacts: [
                        [artifactId: 'client-build', file: 'client-build.zip', type: 'zip']
                    ]
                )
            }
        }
    }
}
