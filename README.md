# ProductHub

Full-stack product management app with React, Django, and MongoDB.

## Tech Stack
- **Frontend:** React.js + Nginx
- **Backend:** Django REST Framework (Python 3.11)
- **Database:** MongoDB 6.0
- **Containerization:** Docker
- **Orchestration:** Kubernetes

## Quick Start

### Docker Compose
```bash
docker-compose up -d
# Frontend: http://localhost
# Backend: http://localhost:8000
```

### Local Development
```bash
# Backend
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Kubernetes
```bash
cd kubernetes
kubectl apply -f .
kubectl port-forward svc/producthub-frontend 3000:80 -n producthub
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register/` | Register user |
| POST | `/auth/login/` | Login user |
| GET | `/auth/profile/` | Get profile |
| GET | `/products/` | List products |
| POST | `/products/` | Create product |
| GET | `/health/` | Health check |

## Environment Variables

```bash
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DB_NAME=producthub
JWT_SECRET=your-secret-key
DEBUG=True
```

## Features
- User authentication with JWT
- Product CRUD operations
- Role-based access (Admin/User)
- MongoDB persistence
- Health monitoring
- Docker & Kubernetes ready
