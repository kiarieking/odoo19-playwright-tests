pipeline{
//    Docker pipeline plugin added. Added user jenkins to docker group. Local pc. 16/6/2026
      agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.59.1'

            // Make container to spin up as root again

            args '-u root'
        }
    }
    
    stages{
        stage("Setup playwright tests"){
            steps{
                
                echo "Setting up tests"
                sh '''
                    echo "========Setting up tests========"

                    pwd

                    ls

                    ./execute_playwright.sh stage_setup_tests
             
                '''
            }
    
        }

        stage("Run tests"){
            steps{
                echo "Running tests"
                sh '''
                    echo "========Running tests.========"

                    ./execute_playwright.sh stage_run_tests
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
