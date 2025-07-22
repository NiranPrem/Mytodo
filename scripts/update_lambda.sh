#!/bin/bash
aws lambda update-function-code --function-name MyTodoLambda --zip-file fileb://lambda_function.zip
