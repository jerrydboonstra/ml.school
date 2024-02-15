import boto3
import json

def lambda_handler(event, context):
    # Initialize Boto3 clients
    sagemaker_client = boto3.client('sagemaker')
    
    # Specify your Model Package Group Name
    model_package_group_name = "penguins"

    # Get the list of model packages
    response = sagemaker_client.list_model_packages(
        ModelPackageGroupName=model_package_group_name, 
        SortBy='CreationTime', 
        SortOrder='Descending', 
        MaxResults=1
    )

    # Allow setting a default value to bootstrap the system
    #  Extract best_model_accuracy_default from the event object
    best_model_accuracy_default = float(event.get('best_model_accuracy_default', 0.0))
    
    if not response['ModelPackageSummaryList']:
        if best_model_accuracy_default > 0.0:
            return {
                'statusCode': 200,
                'body': json.dumps({'best_model_accuracy': best_model_accuracy_default})
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps('No model packages found in the specified group.')
            }
    
    # Assuming the latest model package is the first one in the sorted list
    latest_model_package_arn = response['ModelPackageSummaryList'][0]['ModelPackageArn']
    
    # Describe the latest model package to retrieve metrics
    model_package_description = sagemaker_client.describe_model_package(ModelPackageName=latest_model_package_arn)
    
    # Extract the accuracy metric from the model package description
    # Note: Adjust the path to accuracy metric based on how it's stored
    try:
        metrics = model_package_description['ModelMetrics']['ModelQuality']['Statistics']['Metrics']
        accuracy_metric = next(item for item in metrics if item['Name'] == 'accuracy')
        accuracy_value = accuracy_metric['Value']
    except (KeyError, StopIteration):
        return {
            'statusCode': 500,
            'body': json.dumps('Failed to retrieve accuracy metric from the latest model package.')
        }
    
    # Return the accuracy value
    return {
        'statusCode': 200,
        'body': json.dumps({'best_model_accuracy': accuracy_value})
    }
