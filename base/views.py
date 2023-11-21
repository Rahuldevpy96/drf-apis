from django.shortcuts import render
from django.conf import settings
import os,json

def index(request):
    manifestPath = os.path.join(settings.REACT_BUILD_PATH, "asset-manifest.json")
    json_data = open(manifestPath)
    jsonData = json.load(json_data)
    entrypoints = jsonData["entrypoints"]
    context = {'entrypoints': entrypoints, "staticPath": settings.STATIC_URL}

    return render(request, 'app/index.html', context)