#!/bin/sh

# NAME_APP -- ENV = Variable in docker or dockerfile
echo "Start Entry Point App: ${NAME_APP}"

echo "if [ ! -e ${ENTRY_POINT_SERVER} ]; then"
if [ ! -e ${ENTRY_POINT_SERVER} ]; then
    # Create folder and go inside
    mkdir /build-dir && echo "mkdir /build-dir"
    cd /build-dir && echo "cd /build-dir"
    
    echo "npx express-generator-typescript ${NAME_APP}"
    npx express-generator-typescript ${NAME_APP};
    
    # Copy app
    echo "cp -r /build-dir/${NAME_APP}/* ${FULL_PATH}/"
    cp -r /build-dir/${NAME_APP}/* ${FULL_PATH}/
fi

# Goto app and start it
cd ${FULL_PATH}/ && echo "cd ${FULL_PATH}/"

# If you need to rebuild node_modules otherwise you can comment these 2 lines
echo "yarn --check-files"
yarn --check-files

echo "DEBUG=${NAME_APP}:* yarn start:dev"
DEBUG=${NAME_APP}:* yarn start:dev
