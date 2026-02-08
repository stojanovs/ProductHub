from rest_framework import permissions
from mongo_auth.methods import login_status


# Permission required for certain views
class AuthenticatedOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            flag, user_obj = login_status(request)
            request.user = None
            if flag:
                request.user = user_obj
                return True
            else:
                return False
        except Exception as e:
            return False


# Permission for Admin only
class AdminOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        try:
            flag, user_obj = login_status(request)
            request.user = None
            if flag:
                request.user = user_obj
                if user_obj.get('role') == 'admin':
                    return True
            return False
        except Exception as e:
            return False
