pipeline{
    agent {
        label 'vmAagent'
    }
    
    stages{
        stage("Setup playwright tests"){
            steps{
                
                echo "stage 1 docker node test"
                sh '''
                    echo "========Setting up tests========"

                    /home/vagrant/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_setup_tests
             
                '''
            }
    
        }

        stage("Run tests"){
            steps{
                echo "stage 2 docker node test"
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
