#!/bin/bash

echo $HTPASSWD_CONTENT > htpasswd

cat htpasswd

./bin/run