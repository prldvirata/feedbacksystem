from django.contrib.auth.views import LogoutView
from django.urls import path
from . import views
from .views import CustomLoginView
from .views import dashboard

urlpatterns = [
    path('feedback/', views.submit_feedback, name='submit_feedback'),
    path('thank-you/', views.thank_you, name='thank_you'),
    path('feedbacks/', views.feedback_list, name='feedback_list'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(next_page='login'), name='logout'),
    path('dashboard/', dashboard, name='dashboard'),
]