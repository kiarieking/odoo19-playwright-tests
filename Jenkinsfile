pipeline{
    agent {
        label 'vmAagent'
    }
    
    stages{
        stage("Setup playwright tests"){
            steps{
                
                echo "Setting up tests"
                sh '''
                    echo "========Setting up tests========"

                    /home/vagrant/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_setup_tests
             
                '''
            }
    
        }

        stage("Run tests"){
            steps{
                echo "Running tests"
                sh '''
                    echo "========Running tests========"

                    /home/vagrant/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_run_tests
                '''
                 
                
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
