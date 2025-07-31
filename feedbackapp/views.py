from django.shortcuts import render, redirect
from datetime import date
from .models import Feedback
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.contrib.auth.views import LoginView, LogoutView
from django.db.models import Avg, Count, Q
from django.shortcuts import render
from .models import Feedback
import json

def submit_feedback(request):
    if request.method == 'POST':
        Feedback.objects.create(
            name=request.POST.get('name'),
            email=request.POST.get('email'),
            visit_date=request.POST.get('visit_date') or date.today(),
            visit_time=request.POST.get('visit_time') or 'Lunch',
            food_rating=request.POST.get('food_rating'),
            cleanliness_rating=request.POST.get('cleanliness_rating'),
            ambience_rating=request.POST.get('ambience_rating'),
            service_rating=request.POST.get('service_rating'),
            overall_rating=request.POST.get('overall_rating'),
            comment=request.POST.get('comment'),
            suggestions=request.POST.get('suggestions'),
            recommendation=request.POST.get('recommendation')
        )
        return redirect('thank_you')
    return render(request, 'form.html', {'today': date.today().isoformat()})


def thank_you(request):
    return render(request, 'thank_you.html')


@login_required
def feedback_list(request):
    feedbacks = Feedback.objects.all().order_by('-visit_date')
    return render(request, 'feedbackapp/feedback_list.html', {'feedbacks': feedbacks})


class CustomLoginView(LoginView):
    template_name = 'auth/login.html'


def dashboard(request):
    feedbacks = Feedback.objects.all()
    recent_feedbacks = feedbacks.order_by('-visit_date')[:10]

    total_reviews = feedbacks.count()
    avg_rating = round(feedbacks.aggregate(Avg('overall_rating'))['overall_rating__avg'] or 0, 1)
    recommendation_rate = round((feedbacks.filter(recommendation='Yes').count() / total_reviews) * 100, 1) if total_reviews else 0

    def avg_rating_by_time(field):
        return {
            'Lunch': round(feedbacks.filter(visit_time='Lunch').aggregate(Avg(field))[f'{field}__avg'] or 0, 1),
            'Dinner': round(feedbacks.filter(visit_time='Dinner').aggregate(Avg(field))[f'{field}__avg'] or 0, 1),
        }

    categories = ['food_rating', 'cleanliness_rating', 'service_rating', 'ambience_rating', 'overall_rating']
    labels = ['Food', 'Cleanliness', 'Service', 'Ambience', 'Overall Rating']

    chart_data = {
        "labels": labels,
        "datasets": [
            {
                "label": "Lunch",
                "backgroundColor": "#FFC107",
                "data": [avg_rating_by_time(cat)['Lunch'] for cat in categories]
            },
            {
                "label": "Dinner",
                "backgroundColor": "#8B1A1A",
                "data": [avg_rating_by_time(cat)['Dinner'] for cat in categories]
            }
        ]
    }

    return render(request, 'feedbackapp/dashboard.html', {
        'total_reviews': total_reviews,
        'avg_rating': avg_rating,
        'recommendation_rate': recommendation_rate,
        'recent_feedbacks': recent_feedbacks,
        'chart_data_json': json.dumps(chart_data)
    })

def custom_404_redirect(request, exception=None):
    return redirect('/feedback') 
