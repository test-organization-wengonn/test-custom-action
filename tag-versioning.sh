#!/bin/bash

set -e

msg=$1

if [[ ! -z ${msg} ]]
then
    git add .
    git commit -m "Clickup Integration - ${msg}"  --allow-empty
    git tag -a -m "Clickup Integration - ${msg}" ${msg}
    git push origin master --follow-tags
else
    echo "Please pass in the tag version as a variable"
fi 

