#!/usr/bin/bash

set -e

setup_odoo19tests(){
    pwd

    apt update

    apt install -y nodejs npm 

    cd /home/jenkins/workspace/odoo19-playwright_main

    pwd

    sudo apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
    sudo apt-get install -y nodejs
    nsolid -v

    npm install

    npx playwright install 

 }

run_odoo19tests(){
    cd  /var/lib/jenkins/workspace/odoo19-playwright_main

    npx playwright test tests/dispatch.spec.ts
 }

 case "$1" in 
    stage_setup_tests)
      setup_odoo19tests

   ;;

    stage_run_tests)
      run_odoo19tests

   ;;

esac



