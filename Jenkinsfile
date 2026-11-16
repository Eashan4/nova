// PBL-3 Exp 7 + 9: CI/CD (build -> scan -> push -> deploy) for Nova on Kubernetes
pipeline {
  agent any
  options { timestamps() }
  environment {
    IMAGE = 'ramdev23/nova'
    TAG   = "build-${env.BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') {
      steps {
        sh 'rm -rf src && git clone -q /home/ec2-user/nova src'
        dir('src') { sh 'git log --oneline -1' }
      }
    }
    stage('Build Docker Image') {
      steps { dir('src') { sh 'docker build -t $IMAGE:$TAG .' } }
    }
    stage('Security Scan (Trivy)') {
      // report-only gate: findings are archived, build is not failed
      steps {
        sh 'trivy image -q --scanners vuln --severity HIGH,CRITICAL --exit-code 0 $IMAGE:$TAG > trivy-report.txt'
        sh 'echo "Trivy HIGH/CRITICAL findings: $(trivy image -q --scanners vuln --severity HIGH,CRITICAL --format json $IMAGE:$TAG | grep -c VulnerabilityID)"'
        archiveArtifacts artifacts: 'trivy-report.txt', allowEmptyArchive: true
      }
    }
    stage('Push to Docker Hub') {
      steps { sh 'docker push $IMAGE:$TAG' }
    }
    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl set image deployment/nova nova=$IMAGE:$TAG'
        sh 'kubectl rollout status deployment/nova --timeout=240s'
      }
    }
    stage('Verify') {
      steps {
        sh 'kubectl get deployment nova -o wide; kubectl get pods -l app=nova -o wide'
        sh 'curl -fsS -o /dev/null -w "Nova NodePort 32456 -> HTTP %{http_code}\\n" http://localhost:32456'
      }
    }
  }
  post {
    success { echo "Deployed $IMAGE:$TAG to Kubernetes" }
    failure { echo 'Pipeline failed' }
  }
}
