from django.urls import path
from . import views

urlpatterns = [
    path('auth/', views.AuthSmsSendView.as_view()),
    # path('info/', views.InfoSmsSendView.as_view()),
]