🌟 Advanced To-Do Manager

A modern, feature-rich To-Do application with a sleek UI and AWS backend integration. Manage tasks with due dates, priorities, notes, reminders, and progress tracking. The application uses AWS API Gateway, Lambda, and DynamoDB for persistent storage and user authentication via AWS Cognito.

Features





Task Management: Add, edit, delete, and mark tasks as done.



Advanced Features: Set due dates, priorities, notes, reminders, and track progress (0-100%).



Responsive Design: Smooth animations, gradient backgrounds, and mobile-friendly layout.



Audio Feedback: Tones for task actions (add, edit, delete, mark done).



Reminders: Notifications for tasks due within 24 hours.



Backend Integration: Securely store tasks in AWS DynamoDB with user authentication via AWS Cognito.



API-Driven: RESTful API for task CRUD operations.

Tech Stack





Frontend: HTML, CSS, JavaScript



Backend: AWS Lambda (Python), API Gateway, DynamoDB



Authentication: AWS Cognito



Deployment: AWS Cloud

Setup Instructions

Follow these steps to set up and run the project locally or deploy it to AWS.

Prerequisites





Node.js (optional, for local frontend testing)



Python 3.8+ (for backend)



AWS CLI configured with appropriate credentials



AWS Account with access to API Gateway, Lambda, DynamoDB, and Cognito

Local Development (Frontend)





Clone the repository:

git clone https://github.com/your-username/todo-app.git
cd todo-app



Serve the frontend:





Use a local server (e.g., npx serve frontend or Python's http.server):

python3 -m http.server 8000 --directory frontend



Open http://localhost:8000 in your browser.



Note: The frontend requires the backend API to function fully. Update the API_URL in frontend/scripts.js to point to your deployed API Gateway endpoint.

Backend Deployment (AWS)





DynamoDB Setup:





Create a DynamoDB table named TasksTable with id as the partition key.



Create a Global Secondary Index named UserIdIndex with userId as the partition key.



Lambda Function:





Create a Lambda function in AWS and upload backend/lambda_function.py.



Set the runtime to Python 3.8+.



Configure an IAM role with permissions for DynamoDB (AmazonDynamoDBFullAccess) and CloudWatch logs.



API Gateway:





Create a REST API in API Gateway.



Set up resources and methods (GET, POST, PUT, DELETE) for /tasks and /tasks/{id}.



Integrate with the Lambda function.



Enable CORS and deploy the API to a stage (e.g., dev).



Note the API endpoint URL (e.g., https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/tasks).



Cognito Setup:





Create a Cognito User Pool.



Configure API Gateway to use Cognito Authorizer for authentication.



Update the frontend to handle Cognito login (not implemented in the provided code; see Future Improvements).



Update frontend/scripts.js with your API Gateway endpoint:

const API_URL = "https://your-api-id.execute-api.us-east-1.amazonaws.com/dev/tasks";

Dependencies





Python:

pip install -r requirements.txt

See requirements.txt for backend dependencies.

API Documentation

See docs/api.md for detailed API endpoints and usage.

Usage





Open the application in your browser.



After a simulated login (1-second delay), the To-Do manager appears.



Add tasks with optional due dates, priorities, notes, reminders, and progress.



Edit, mark as done, or delete tasks using the icons.



Receive reminder notifications for tasks due within 24 hours.

Contributing

Contributions are welcome! Please follow these steps:





Fork the repository.



Create a feature branch (git checkout -b feature/your-feature).



Commit your changes (git commit -m "Add your feature").



Push to the branch (git push origin feature/your-feature).



Open a Pull Request.

Future Improvements





Implement full Cognito authentication in the frontend.



Add task categories or tags.



Support task sorting and filtering.



Add offline support with local storage.



Deploy the frontend to a hosting service (e.g., S3 + CloudFront).

License

This project is licensed under the MIT License. See LICENSE for details.

Contact

For questions or feedback, reach out on n8545403@gmail.com
