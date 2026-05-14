pipeline{
    agent {
        label : 'vmAagent'
    }
    
    stages{
        stage("Setup playwright tests"){
            steps{
                
                echo "stage 1 vmnode"
                // sh '''
                //     echo "========Setting up tests========"

                //     /var/lib/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_setup_tests
             
                // '''
            }
    
        }

        stage("Run tests"){
            steps{
                echo "stage 2 vmnode"
                // sh '''
                //     echo "========Running tests========"

                //     /var/lib/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_run_tests
                // '''
                 
                
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