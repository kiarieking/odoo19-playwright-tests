#!/usr/bin/bash

set -e

setup_odoo19tests(){
  

 }

run_odoo19tests(){
    cd  /var/lib/jenkins/workspace/odoo19-playwright_main

    npm ci

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



