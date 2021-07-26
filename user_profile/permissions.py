from rest_framework import permissions


class IsOwnerOnly(permissions.BasePermission):
    """
    객체의 소유자만 접근 가능 ( 수정 必 )
    """
    def has_object_permission(self, request, view, obj):
        print('obj.user', obj.user)
        print('request.user', request.user)
        return obj.user == request.user