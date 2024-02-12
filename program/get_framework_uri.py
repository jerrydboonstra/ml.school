from sagemaker.image_uris import retrieve

# Define your configuration for us-east-2 region and ml.m5.xlarge instance type
config = {
    "session": {
        "boto_region_name": "us-east-2"  # Updated to us-east-2 region
    },
    "instance_type": "ml.m5.xlarge"  # Updated to ml.m5.xlarge instance type
}

# Call the retrieve function for scikit-learn framework in us-east-2 region
framework_uri = retrieve(
    framework='sklearn',  # Use 'sklearn' for scikit-learn
    version='1.2-1',  # Specify the scikit-learn version you want to use
    region=config["session"]["boto_region_name"]  # This will use "us-east-2"
)

print(f"Retrieved framework_uri for us-east-2: {framework_uri}")

