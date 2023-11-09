from django.urls import path
from . import views
#this is fixed we have to use urlpatterns because python looks for it
urlpatterns = [
    path('',views.hello),
    path('stuff/',views.add_stuff),
    path('fetchAll/',views.fetch_user_data_with_tags),
    path('fetchFile/',views.fetch_media),
    path('delete/',views.deleteRecord),
]