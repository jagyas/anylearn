stage('Build') {
  agent {
    kubernetes {
      label 'jenkinsrun'
      defaultContainer 'builder'
      yaml """
apiVersion: v1
kind: Pod
metadata:
  name: kaniko
spec:
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    args: ["--dockerfile=./packages/webapp/Dockerfile",
            "--context=git://github.com/jagyas/anylearn1",
            "--destination=jagyas/test",
            "--cache=true",
            "--cache-copy-layers",
            "--cache-repo=jagyas/cache"]
    env:
      - name: GIT_TOKEN
        valueFrom:
          secretKeyRef:
            name: git-token
            key: GIT_TOKEN
    volumeMounts:
    - name: kaniko-cache
      mountPath: /cache
    - name: docker-config
      mountPath: /kaniko/.docker/
  restartPolicy: Never
  volumes:
  - name: docker-config
    secret:
      secretName: docker-regcred
      items:
          - key: .dockerconfigjson
            path: config.json
  - name: kaniko-cache
    persistentVolumeClaim:
            claimName: kaniko-cache-claim
"""
    }
  }
} //stage(build)
