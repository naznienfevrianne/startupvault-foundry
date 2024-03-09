from django.shortcuts import render

# Create your views here.

class Verification():
    def put(self, request, user_id):
        user = get_object_or_404(User, pk=user_id)
        status = request.PUT.get('status')  # Assuming status is sent in the request data
        user.status = status
        user.save()
        return JsonResponse({'message': 'User status updated successfully'})