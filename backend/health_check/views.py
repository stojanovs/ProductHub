import datetime
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from mongo_auth.utils import usersCol
from pymongo.errors import ServerSelectionTimeoutError


class HealthCheck(APIView):
    """
    Health Check Endpoint
    Returns status of all services
    """
    
    def get(self, request):
        """
        GET /health/ - Check health of all services
        """
        health_status = {
            "status": "healthy",
            "timestamp": datetime.datetime.utcnow().isoformat(),
            "services": {}
        }
        
        try:
            health_status["services"]["backend"] = {
                "status": "healthy",
                "port": 8000
            }
            
            try:
                usersCol.count_documents({})
                health_status["services"]["mongodb"] = {
                    "status": "healthy",
                    "database": "mydb"
                }
            except ServerSelectionTimeoutError:
                health_status["services"]["mongodb"] = {
                    "status": "unhealthy",
                    "error": "MongoDB connection timeout"
                }
                health_status["status"] = "degraded"
            except Exception as e:
                health_status["services"]["mongodb"] = {
                    "status": "unhealthy",
                    "error": str(e)
                }
                health_status["status"] = "degraded"
            

            health_status["services"]["frontend"] = {
                "status": "unknown",
                "note": "Check via HTTP request to /"
            }
            
            response_status = status.HTTP_200_OK if health_status["status"] == "healthy" else status.HTTP_503_SERVICE_UNAVAILABLE
            return Response(health_status, status=response_status)
            
        except Exception as e:
            print(f'Exception in health check: {e}')
            health_status["status"] = "unhealthy"
            health_status["error"] = str(e)
            return Response(health_status, status=status.HTTP_503_SERVICE_UNAVAILABLE)
