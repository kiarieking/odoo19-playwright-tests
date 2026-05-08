pipeline{
    agent any
    
    stages{
        stage("A"){
            steps{
                echo "========executing A========"
                sh '''
                    echo "Im here,again.."
                    echo "Test"
                '''
            }
    
        }
    }
    post{
        always{
            echo "========always========"
        }
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}