pipeline{
//    Docker pipeline plugin added. Added user jenkins to docker group. Local pc. 17/6/2026:5:36 PM
      agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.59.1'

            // Make container to spin up as root again

            args '-u root'
        }
    }
    
    stages{

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
