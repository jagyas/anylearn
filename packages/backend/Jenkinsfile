pipeline {
  agent {
    kubernetes {
      defaultContainer "shell"
      yamlFile "jenkins-pod.yaml"
    }
  }
  environment {
    SERVICE = "service"
    REGISTRY_USER = "jagyas"
  }
  stages {
    stage("Build") {
      steps {
        container(name: 'kube') {
          sh '''
          kubectl delete pod kaniko -n jenkins --ignore-not-found=true
          sed -i "s#${REGISTRY_USER}/${SERVICE}:0.0.[a-zA-Z0-9]\\+#${REGISTRY_USER}/${SERVICE}:0.0.${BUILD_NUMBER}#" kaniko-pod.yaml
          kubectl apply -f kaniko-pod.yaml
          sleep 10
          kubectl logs -l pod=kaniko -f -n jenkins
          '''
        }
      }
    }
    stage("Deploy") {
      steps {
        container(name: 'kube') {
          sh '''
          sed -i "s#${REGISTRY_USER}/${SERVICE}:0.0.[a-zA-Z0-9]\\+#${REGISTRY_USER}/${SERVICE}:0.0.${BUILD_NUMBER}#" backend-service.yaml
          kubectl apply -f backend-service.yaml
          '''
        }
      }
    }
    stage("Test") {
      when { branch "master" }
      steps {
        container("knative") {
          sh """
            kn service list -n default | grep backend
          """
        }
      }
    }
  }
}
