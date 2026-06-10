pipeline{
    // agent {
    //     label 'vmAagent'
    // }

    // agent any
    // dynamic docker agent in built in jenkins
      agent {
        docker {
            image 'jenkins/inbound-agent'
        }
    }
    
    stages{
        // stage("Spin up docker container"){
        //     steps{
        //         echo "========Starting docker container========"
        //         sh '''

        //             /home/kkiarie/code/docker/jenkins-container/start_docker_container.sh

        //         '''
        //     }
        // }

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
