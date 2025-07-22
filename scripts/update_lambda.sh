#!/bin/bash
aws lambda update-function-code --function-name MyTodoLambda --zip-file fileb://build/lambda_function.zip
