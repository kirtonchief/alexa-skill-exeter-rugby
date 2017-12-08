#!/bin/bash -xe

# A quick sanity check of my code to make sure it has valid syntax.
./syntax-check.sh

cd src/

npm install

# Create the package.
zip -r /tmp/lambda-upload.zip index.js node_modules/ lib/

# Upload the package and publish it immediately.
aws lambda update-function-code \
  --region eu-west-1 \
  --profile personal \
  --function-name ExeterRugbyAlexaSkill \
  --zip-file fileb:///tmp/lambda-upload.zip \
  --publish

# Clean up.
rm -f /tmp/lambda-upload.zip
