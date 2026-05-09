#!/usr/bin/bash

set -e

setup_odoo19tests(){
    sudo apt update

    sudo apt install nodejs npm

    cd /tmp/test_playwright

    npm install

    npx playwright install 

 }

run_odoo19tests(){
    cd $PATH

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



