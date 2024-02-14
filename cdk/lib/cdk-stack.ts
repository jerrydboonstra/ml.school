import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class YourProjectStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Define the Python Lambda function
    const lambdaFunction = new lambda.Function(this, 'SageMakerLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_8, // Specify the runtime environment
      handler: 'lambda_function.lambda_handler', // File and method name
      code: lambda.Code.fromAsset(path.join(__dirname, '/../src')), // Directory where your Lambda function is stored
      environment: {
        // Environment variables (if any)
      }
    });
  }
}
