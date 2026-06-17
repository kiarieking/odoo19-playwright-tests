#! /bin/bash
set -e

sudo systemctl start docker

docker stop jenkins-agent

docker rm jenkins-agent

docker run -d --name jenkins-agent --network host debian-jenkins-agent

TIMEOUT=60
ELAPSED=0

while [ $ELAPSED -lt $TIMEOUT ]; do
    if docker logs jenkins-agent 2>&1 | grep -q "INFO: Connected"; then
        echo "SUCCESS: Jenkins agent connected"
        exit 0
    fi

    sleep 2
    ELAPSED=$((ELAPSED + 2))
done

echo "ERROR: Jenkins agent failed to connect within ${TIMEOUT} seconds"

docker logs jenkins-agent

exit 1