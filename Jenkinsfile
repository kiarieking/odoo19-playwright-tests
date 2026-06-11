pipeline{
//    Docker pipeline plugin added. Added user jenkins to docker group. Local pc. 11/10/13
      agent {
        docker {
            image '26.3.0-trixie'
        }
    }
    
    stages{
        stage("Setup playwright tests"){
            steps{
                
                echo "Setting up tests"
                sh '''
                    echo "========Setting up tests========"

                    /home/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_setup_tests
             
                '''
            }
    
        }

        stage("Run tests"){
            steps{
                echo "Running tests"
                sh '''
                    echo "========Running tests.========"

                    /home/jenkins/workspace/odoo19-playwright_main/execute_playwright.sh stage_run_tests
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
