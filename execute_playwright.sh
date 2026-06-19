#!/usr/bin/bash

set -e


run_odoo19tests(){
    cd  /var/lib/jenkins/workspace/odoo19-playwright_main

    npm ci

    npx playwright test tests/dispatch.spec.ts --workers=2
 }

 case "$1" in 
    stage_run_tests)
      run_odoo19tests

   ;;

esac



