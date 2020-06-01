# OU-Period-Progressive-Report

This is a port++ of an older Java module (Progressive Reports) used in India local  DHIS2 implementations for reporting purposes.

Basic Features :
 - Time wise and Facility wise analysis of aggregated data 
 - Configurable mapping
 - XLSX templating onto which data is written and made avilable for download

This app based on [ https://github.com/hispindia/OU-Period-Progressive-Report.git ]

this app is used for app based organisationunit and Period wise Progressive Report.

# Installation
npm install

npm install --global webpack // not if already install
npm install --save-dev webpack // not if already install
npm install --save-dev webpack-cli // not if already install

npm link webpack-cli // not if already install

# Building

webpack index.js or only 
webpack
