**Article Project**
This project is a full-stack web application consisting of a Laravel backend and a React frontend, both of which are containerized using Docker. Docker Compose is used to manage the services.

**Prerequisites**
Before running the project, ensure that you have the following installed:

**1. Docker (Install Docker)**
**2. Docker Compose (Install Docker Compose)**
**3. A Git client (to clone the repository)**


**Project Structure**
Article/
├── article-backend/          # Laravel Backend
│   ├── Dockerfile            # Docker configuration for backend
│   └── ...                  # Laravel files
├── article-frontend/         # React Frontend
│   ├── Dockerfile            # Docker configuration for frontend
│   ├── tsconfig.json         # TypeScript configuration
│   └── ...                  # React & TypeScript files
├── docker-compose.yml        # Docker Compose configuration to run both services
└── README.md                 # This file


Setting Up the Project
Follow these steps to get the project up and running on your local machine:

**1. Clone the Repository**
First, clone the repository to your local machine:
git clone git@github.com:ivanchauma/articles.git
cd articles

**2. Build the Docker Containers**
Make sure that Docker and Docker Compose are installed and running. Then, build the containers for both the frontend and backend:
docker-compose build
This will read the docker-compose.yml file and build the Docker images for both the Laravel backend and React frontend.

**3. Start the Application**
Once the build is complete, you can start both services (backend and frontend) with Docker Compose:

docker-compose exec backend php artisan config:cache
docker-compose exec backend php artisan route:cache
docker-compose up -d



This will start both services, and the application will be available at:

Backend API: http://localhost:9000
Frontend: http://localhost
