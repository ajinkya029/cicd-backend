# 🚀 MERN CI/CD Backend Deployment Pipeline

![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Containerization-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?style=for-the-badge&logo=jest&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

A production-oriented backend project demonstrating how to build, test, containerize, and deploy a REST API using the MERN ecosystem and an automated CI/CD pipeline.

The project uses **Node.js, Express.js, MongoDB, Docker, and GitHub Actions** to automate testing and container image publishing, with an optional deployment webhook for a hosting provider.

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Docker Deployment](#-docker-deployment)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Production Deployment](#-production-deployment)
- [Security and Improvements](#-security-and-improvements)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

## 🎯 Overview

This project demonstrates an automated software delivery workflow for a backend application.

Whenever code is pushed to GitHub or a pull request is opened, GitHub Actions can install dependencies, run automated tests, and build a Docker image. When changes are pushed to the `main` branch, a separate workflow builds and publishes the image to GitHub Container Registry (GHCR).

An optional deployment job can trigger a hosting provider's deployment webhook after the image has been published.

## ✨ Features

- **REST API:** CRUD operations for task management.
- **Database integration:** MongoDB with Mongoose schemas and validation.
- **Health monitoring:** API and database connectivity status.
- **Automated testing:** Jest and Supertest.
- **Continuous Integration:** Automated dependency installation, testing, and Docker builds.
- **Continuous Delivery:** Publish versioned Docker images to GitHub Container Registry.
- **Docker support:** Multi-stage Dockerfile and Docker Compose configuration.
- **Environment configuration:** Configurable settings using environment variables.
- **Error handling:** Centralized error middleware and JSON error responses.
- **Security basics:** Helmet security headers and configurable CORS.
- **Deployment automation:** Optional hosting-provider webhook integration.

## 🛠 Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modeling |
| JavaScript | Application development |
| Jest | Automated testing |
| Supertest | HTTP endpoint testing |
| Docker | Application containerization |
| Docker Compose | Local multi-container environment |
| GitHub Actions | CI/CD automation |
| GitHub Container Registry | Docker image storage |
| Helmet | HTTP security headers |
| Morgan | HTTP request logging |
| dotenv | Environment variable management |

## 🏗 Architecture

```text
                Developer
                    |
                    v
              Git Push / PR
                    |
                    v
             GitHub Repository
                    |
                    v
             GitHub Actions CI
                    |
          +---------+---------+
          |         |         |
          v         v         v
       Install    Run Tests  Docker Build
          |         |         |
          +---------+---------+
                    |
                    v
             CI Pipeline Passes
                    |
          Push to main branch
                    |
                    v
           GitHub Actions CD
                    |
                    v
            Build Docker Image
                    |
                    v
        GitHub Container Registry
                    |
                    v
          Optional Deploy Webhook
                    |
                    v
              Hosting Provider
                    |
                    v
             Running REST API
                    |
                    v
                 MongoDB
```

### Pipeline workflows

- **CI workflow:** `.github/workflows/ci.yml`
- **CD workflow:** `.github/workflows/deploy.yml`

The CI workflow runs on pushes to `main` and `develop`, as well as pull requests targeting `main`.

The CD workflow publishes a Docker image on pushes to `main` and can optionally invoke a deployment webhook.

## 📁 Project Structure

```text
cicd-backend/
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── src/
│   ├── controllers/
│   │   └── task.controller.js
│   ├── middleware/
│   │   └── error.middleware.js
│   ├── models/
│   │   └── task.model.js
│   ├── routes/
│   │   ├── health.routes.js
│   │   └── task.routes.js
│   ├── app.js
│   └── server.js
│
├── tests/
│   └── app.test.js
│
├── .dockerignore
├── .env.example
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── jest.config.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install the following tools:

- [Node.js 20 or later](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine
- A GitHub account for CI/CD configuration

### 1. Clone the repository

Replace the placeholder URL with your actual GitHub repository URL.

```bash
git clone https://github.com/ajinkya029/cicd-backend.git
cd cicd-backend
```

### 2. Configure environment variables

Create a local environment file by copying the example.

**Windows PowerShell:**

```powershell
Copy-Item .env.example .env
```

**Linux/macOS:**

```bash
cp .env.example .env
```

### 3. Start the application

The easiest way to start the backend and MongoDB together is Docker Compose.

```bash
docker compose up --build
```

The API will be available at:

- Base URL: `http://localhost:5000`
- Health endpoint: `http://localhost:5000/api/health`

To stop the containers:

```bash
docker compose down
```

To stop the containers while preserving the MongoDB volume, use the command above. To remove the stored database volume as well, run `docker compose down -v`; this permanently deletes that local database volume.

### 4. Run without Docker

Start MongoDB separately and make sure the connection URI in `.env` is correct.

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Start the production-mode Node.js process:

```bash
npm start
```

## ⚙️ Environment Variables

Configure these values in your `.env` file.

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | API server port | `5000` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/mern_cicd` |
| `CORS_ORIGIN` | Allowed frontend origin(s) | `http://localhost:5173` |

When running through Docker Compose, the API connects to MongoDB using the Docker service hostname `mongo`.

**Important:** Never commit your `.env` file, database credentials, or deployment secrets to GitHub.

## 📡 API Documentation

Base URL:

```text
http://localhost:5000
```

### Available endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get service information |
| GET | `/api/health` | Check API and database health |
| GET | `/api/tasks` | Retrieve all tasks |
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks/:id` | Retrieve a task by ID |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Create a task

**Request:**

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Build CI/CD pipeline",
  "description": "Automate backend testing and deployment",
  "completed": false
}
```

**Example using cURL:**

```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Build CI/CD pipeline","description":"Automate deployment"}'
```

A successful request returns HTTP `201 Created` with the newly created task.

### Retrieve all tasks

```bash
curl http://localhost:5000/api/tasks
```

### Update a task

Replace `TASK_ID` with an existing MongoDB document ID.

```bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Delete a task

```bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
```

A successful deletion returns HTTP `204 No Content`.

### Error responses

The API uses standard HTTP status codes, including:

- `400 Bad Request` — Invalid input or resource ID.
- `404 Not Found` — Unknown endpoint or missing task.
- `500 Internal Server Error` — Unexpected server error.
- `503 Service Unavailable` — Database connectivity is unavailable at the health endpoint.

## 🧪 Testing

This project uses Jest and Supertest to test API behavior.

Run the tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run ESLint:

```bash
npm run lint
```

Build the Docker image locally:

```bash
docker build -t mern-cicd-backend:local .
```

The included tests cover the root endpoint, unknown routes, and task-title validation without requiring a live database for those test cases.

## 🐳 Docker Deployment

The Dockerfile uses a multi-stage build to separate dependency installation from the final runtime image.

Build the image:

```bash
docker build -t mern-cicd-backend:latest .
```

Run the container:

```bash
docker run --rm -p 5000:5000 \
  -e MONGODB_URI="YOUR_MONGODB_CONNECTION_STRING" \
  -e PORT=5000 \
  mern-cicd-backend:latest
```

The database URI must point to a MongoDB instance accessible from the container.

For local development, Docker Compose starts both the API and MongoDB, configures their connection, and persists database files in a named volume.

## 🔄 CI/CD Pipeline

### Continuous Integration (CI)

Workflow file: `.github/workflows/ci.yml`

The CI workflow performs the following steps:

1. Checks out the source code.
2. Sets up Node.js 20.
3. Installs project dependencies.
4. Executes automated tests.
5. Builds the Docker image.

If a required step fails, the workflow reports a failure so the issue can be fixed before merging or releasing changes.

### Continuous Delivery (CD)

Workflow file: `.github/workflows/deploy.yml`

When code is pushed to `main`, the workflow:

1. Checks out the repository.
2. Sets up Docker Buildx.
3. Authenticates to GitHub Container Registry.
4. Builds the production Docker image.
5. Publishes the image with `latest` and commit-SHA tags.
6. Optionally triggers a hosting-provider deployment webhook.

The resulting image names follow this format:

```text
ghcr.io/YOUR_USERNAME/mern-cicd-backend:latest
ghcr.io/YOUR_USERNAME/mern-cicd-backend:COMMIT_SHA
```

The repository owner and image name are derived from the GitHub repository configuration.

### Enable GitHub Actions

1. Push the project to a GitHub repository.
2. Ensure Actions are enabled for the repository.
3. Check **Settings → Actions → General** and confirm the workflow has permission to publish packages.
4. Push code to `main` to trigger the image publishing workflow.
5. Open the Actions tab to inspect execution logs and build status.
6. Check your GitHub Packages page to confirm the image was published.

### Optional automatic deployment

The included deployment workflow supports a generic webhook rather than assuming a particular cloud provider.

To enable it:

1. Open your repository's **Settings → Secrets and variables → Actions**.
2. Create the repository secret `DEPLOY_WEBHOOK_URL` with the deployment webhook URL supplied by your hosting provider.
3. Create the repository variable `ENABLE_DEPLOY_WEBHOOK` with the value `true`.
4. Push a new commit to `main` or manually run the workflow.

The webhook is called only after the image publishing job succeeds. Your hosting provider must support a compatible webhook and be configured to deploy the published image.

For a provider that requires SSH, a cloud CLI, or a provider-specific deployment action, adapt the workflow to its documented deployment procedure.

**Note:** Building and publishing a Docker image is not the same as deploying a running application. A live deployment requires a configured hosting provider, database, environment variables, networking, and application health monitoring.

## 🔐 Security and Improvements

Before exposing this API publicly:

- Add authentication and authorization to task endpoints.
- Add request rate limiting and stricter input validation.
- Restrict CORS to trusted frontend origins.
- Use a managed MongoDB service with appropriate network restrictions.
- Store credentials in GitHub Actions secrets or your hosting provider's secret manager.
- Configure production logging, monitoring, and alerting.
- Configure container health checks and deployment rollback.
- Pin third-party GitHub Actions to reviewed commit SHAs for stronger supply-chain security.
- Add integration tests using a disposable MongoDB instance in CI.

## 🚧 Future Enhancements

Potential improvements for future versions include:

- JWT authentication and role-based access control.
- Frontend dashboard built with React.
- Integration tests using MongoDB in the CI pipeline.
- Docker image vulnerability scanning.
- Automated deployments to AWS, Azure, Render, or another hosting provider.
- Deployment approval gates and rollback automation.
- Code coverage reporting and quality gates.
- API documentation using Swagger/OpenAPI.
- Monitoring and notifications for failed deployments.

## 👨‍💻 Author

**Ajinkya Dhatrak**

GitHub: [@ajinkya029](https://github.com/ajinkya029)

---

⭐ If you find this project useful, consider giving the repository a star.

**Built to demonstrate backend development, automated testing, containerization, and CI/CD deployment practices.**
