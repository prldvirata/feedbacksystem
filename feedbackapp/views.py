from django.shortcuts import render, redirect
from datetime import date
from .models import Feedback


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