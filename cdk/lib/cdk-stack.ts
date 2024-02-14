import * as cdk from 'aws-cdk-lib';
import { aws_lambda as lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

export class MlSchoolStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaFunction = new lambda.Function(this, 'ModelAccuraccyLambdaFunction', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'model_accuracy_lambda.lambda_handler',
      code: lambda.Code.fromAsset(path.join(__dirname, './../src')),
      environment: {
        // Environment variables (if any)
      }
    });
  }
}
