from django.shortcuts import render
from .models import Camera

# Create your views here.

def dashboard(request):
    
    return render(request, "dashboard.html", {})
