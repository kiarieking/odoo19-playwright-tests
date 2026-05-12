pipeline{
    agent any
    
    stages{
        stage("Setup playwright tests"){
            steps{
                
                sh '''
                    echo "========Setting up tests========"

                    /var/lib/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_setup_tests
             
                '''
            }
    
        }

        stage("Run tests"){
            steps{
                
                withCredentials([
                    string(credentialsId: 'kiarieking', variable: 'GITHUB_USER'),
                    string(credentialsId: 'github_password', variable: 'GITHUB_PASSWORD')

                 ]){

                sh '''
                    echo "========Running tests========"

                    /var/lib/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_run_tests
                '''
                 }
                
            }
        }
    }


    post{
        always{
            echo "========Have MS teams here========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}