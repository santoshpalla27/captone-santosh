# Microservices Demo Application

A full-stack, low-code microservices demo app with:
- Node.js + React frontend (Vite)
- Node.js, Python, Java, Go services
- MySQL, MongoDB, and Redis cluster

## Services

- **Frontend** (`frontend`): React UI
- **User Service** (`user-service`): Node.js + MySQL
- **Order Service** (`order-service`): Python Flask + MongoDB
- **Payment Service** (`payment-service`): Java Spring Boot + MySQL
- **Notification Service** (`notification-service`): Go + Redis

## Running the App

1. Clone the repo and `cd` into the root.
2. Build and start all services:

    ```bash
    docker-compose up --build
    ```

3. Access the frontend at: [http://localhost:3000](http://localhost:3000)

## Environment Variables

Each service uses its own `.env` file.

---