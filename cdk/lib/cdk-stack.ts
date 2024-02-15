import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { aws_iam as iam } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda execution role
    const lambdaExecutionRole = new iam.Role(this, 'LambdaExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      description: 'Role for Lambda to access SageMaker and other services',
    });

    // Add SageMaker access policy
    lambdaExecutionRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      resources: ['*'], // Restrict as necessary
      actions: [
        'sagemaker:*', // Restrict as necessary based on your Lambda's needs
      ],
    }));

    const lambdaFunction = new lambda.Function(this, 'ModelAccuraccyLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'model_accuracy_lambda.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, './../src')),
      role: lambdaExecutionRole, // Assign the execution role
      environment: {
        // Environment variables (if any)
      }
    });
  }
}
