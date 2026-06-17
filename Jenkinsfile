pipeline{
//    Docker pipeline plugin added. Added user jenkins to docker group. Local pc. 17/6/2026:5:36 PM
      agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.59.1'

            // Make container to spin up as root again

            args '-u root'
        }
    }

    environment {
        MSTEAMS_HOOK = "https://defaulta96a137b5bac4d288f5b9ded43babd.cf.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/c5ed4be0f932414b88897c8144243c00/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CTOJ7SbGjUeebDp1ygRr2O5sIei5bXD6pK535C9NHu8"
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
            echo "========Build is Complete========"
        }
        success{
            echo "========pipeline executed successfully ========"
            office365ConnectorSend(
                status: "Build Status",
                webhookUrl: "${MSTEAMS_HOOK}",
                message: "Build successful",
                color: "#AAFF00",
            )
        }
        failure{
            echo "========pipeline execution failed========"
            office365ConnectorSend(
                status: "Build Status",
                webhookUrl: "${MSTEAMS_HOOK}",
                message: "Build Failed",
                color: "#ff3333",
            )
        }
    }
}
