# from django_filters.rest_framework import DjangoFilterBackend
# from rest_framework import generics, viewsets
# from erp.new_models import Employee
# from erp.models import Pagyeon
# from erp.serializers import EmployeeSerializer, PagyeonSerializer
#
#
# class EmployeeListView(generics.ListAPIView):
#     # permission_classes = [permissions.IsAuthenticated, ]
#     queryset = Employee.objects.all()
#     serializer_class = EmployeeSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['user']
#
#     def get_queryset(self):
#         queryset = Employee.objects.all()
#         return queryset
#
# class PagyeonListViewSet(viewsets.ModelViewSet):
#     queryset = Pagyeon.objects.all()
#     serializer_class = PagyeonSerializer
