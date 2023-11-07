pipeline {
    agent any

    stages {
        stage('Clonar repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/MmsGrillo/Aula14-Teste_API_Rest_Automatizado.git'
            }
        }
        stage('Instalar dependências') {
            steps {
                bat 'npm install -f'
            }
        }
        stage('Executar testes') {
            steps {
                bat 'npx cypress run'
            }
        }
    }
}
