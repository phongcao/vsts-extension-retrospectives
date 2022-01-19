#!/usr/bin/bash
## This script logs in to Azure 
## Usage: ./env_login.sh
## Example: ./env_login.sh
##
(
    if [ -f .env ]
    then
        set -o allexport; source .env; set +o allexport
    fi

    cd "$(dirname "$0")/.." || exit
    set -euo pipefail

    # Login interactively
    echo "#### Attempting az login interactively ####"
    az login
    
    # # OR Login to Azure via Service Principal

    ## Set service principal information
    # echo "#### Exporting SP as environment variables ####"
    # subscription_id="${SUBSCRIPTION_ID}"
    # tenant_id="${TENANT_ID}"
    # service_principal_id="${SERVICE_PRINCIPAL_ID}"
    # service_principal_secret="${SERVICE_PRINCIPAL_SECRET}"
    # echo "#### Attempting az login via service principal ####"
    # az login \
    #     --service-principal \
    #     --username="$service_principal_id" \
    #     --password="$service_principal_secret" \
    #     --tenant="$tenant_id" >/dev/null

    az account set -s "$subscription_id"
    echo "#### az login done ####"
)