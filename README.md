---
# DevOps Practice with Terraform

This repository contains a basic web application demonstrating DevOps practices utilizing Infrastructure as Code (IaC) with Terraform.

## Overview

The project aims to showcase essential Terraform commands to manage infrastructure effectively:

- **Validation**: Check if the Terraform configuration is valid.
  ```bash
  terraform validate
  ```

- **Planning**: View the entire infrastructure plan before deployment.
  ```bash
  terraform plan
  ```

- **Code Formatting**: Keep your Terraform code consistent and formatted.
  ```bash
  terraform fmt
  ```

- **Deployment**: Deploy the infrastructure using Terraform.
  ```bash
  terraform apply
  ```

## AWS Authentication

Before running the `terraform plan` or `terraform apply` commands, make sure to authenticate with AWS:

```bash
export AWS_ACCESS_KEY_ID=<key id>
export AWS_SECRET_ACCESS_KEY=<secret>
```

Replace `<key id>` and `<secret>` with your AWS access key ID and secret access key. This ensures that Terraform has the necessary permissions to create and manage resources on AWS.

## Project Details

This Terraform project accomplishes the following:

- **Infrastructure Deployed**: Creates an ECS cluster with Fargate launch type.
- **Containerized Application**: Runs a Docker container with a simple web app Docker image from Amazon ECR.
- **Load Balancer Configuration**: Places the container behind a load balancer for traffic distribution.

### Note on Project Configuration

For simplicity, the project is set up within the default Amazon VPC. However, it's strongly advised to configure and use your own VPC to implement specific security measures and network isolation best practices.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository.
2. Ensure Terraform is installed on your machine.
3. Set up AWS authentication as mentioned above.
4. Run the commands mentioned in the Overview section to validate, plan, format, and deploy the infrastructure.

## Additional Notes

- Modify the Terraform configurations (`*.tf`) according to your infrastructure requirements.
- Always review the Terraform plan before applying changes to your infrastructure.
- Ensure proper credentials and permissions are set for deploying infrastructure.

Feel free to contribute by suggesting improvements, reporting issues, or adding new features!
---
