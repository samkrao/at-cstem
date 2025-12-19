#!/bin/bash

mkdir -p src/main/resources/META-INF/resources

openssl genrsa -out src/main/resources/META-INF/resources/privateKey.pem 2048
openssl rsa -in src/main/resources/META-INF/resources/privateKey.pem -pubout -out src/main/resources/META-INF/resources/publicKey.pem

echo "JWT keys generated successfully!"
