#!/usr/bin/bash

set -e

setup_odoo19tests(){
   pwd

    sudo apt update

    sudo apt install -y nodejs npm 

    cd /home/jenkins/workspace/odoo19-playwright_main

    pwd

    npm install

    npx playwright install 

 }

run_odoo19tests(){
    cd /home/jenkins/workspace/odoo19-playwright_main

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



