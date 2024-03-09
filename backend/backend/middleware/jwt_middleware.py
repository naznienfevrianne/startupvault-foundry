# project_name/middleware/jwt_middleware.py

import jwt
from django.conf import settings
from django.http import JsonResponse

class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        token = request.headers.get('Authorization')

        if not token:
            return JsonResponse({'error': 'Authorization header missing'}, status=401)

        try:
            token = token.split(' ')[1]  # Remove 'Bearer' prefix
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            # Extract user information from the payload if needed
            request.user = payload.get('user_id')  # Example: Extract user ID from payload
            return self.get_response(request)
        except jwt.ExpiredSignatureError:
            return JsonResponse({'error': 'Expired token'}, status=401)
        except jwt.InvalidTokenError:
            return JsonResponse({'error': 'Invalid token'}, status=401)
