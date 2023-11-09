from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rimmind.models import User
from rimmind.models import UserRecords
from django.http import JsonResponse
import os
from django.http import FileResponse
@csrf_exempt 
def hello(request):
     print("Here for Init User")
     if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            email = json_data.get('email')
            print(json_data)
            message = ""
            existing_user = User.objects.filter(email=email).first()
            if existing_user is None:
                # User does not exist, create and save a new user profile
                user_profile = User(email=email)
                user_profile.save()
                message = "User profile added to the database"
            else:
                # User with the same email already exists
                message = "User with the same email already exists"
                user = User.objects.get(email=email)

                
            return HttpResponse({"message":message})
        except json.JSONDecodeError:
            pass
        return HttpResponse("Done")
     else:
         return HttpResponse("Please use Post Method")
        
@csrf_exempt 
def add_stuff(request):
     if request.method == 'POST':
        try:
            # json_data = json.loads(request.body)
            # email = json_data.get('user')
            # user, temp = User.objects.get_or_create(email=email)
            # title = json_data.get('title')
            # description = json_data.get('desp')
            # tag_names = json_data.get('TagArray')
            # uploaded_file = request.FILES['media']
            uploaded_file = request.FILES['media']
            title = request.POST.get('title')
            email = request.POST.get('user')
            user, temp = User.objects.get_or_create(email=email)
            description = request.POST.get('desp')
            tag_names = request.POST.get('TagArray')
            tag_names = tag_names.split(',')
            if not os.path.exists('media/'+user.folderName):
                os.makedirs('media/'+user.folderName)
            
            user_stuff = UserRecords.objects.create(
                user_email=user,
                title=title,
                description=description,
                tags = tag_names,
            )
            user_stuff.save()
            file_path = 'media/'+user.folderName +"/"+str(user_stuff.id)+"_"+uploaded_file.name
            with open(file_path, 'wb') as destination:
                for chunk in uploaded_file.chunks():
                    destination.write(chunk)
                destination.close()
            MediaPath=file_path
            print(user.folderName)
            try:
                user_stuff.media = [MediaPath]
                user_stuff.save()
                return JsonResponse({"message": "Data added successfully"})
            except :
                return JsonResponse({"message": "Data with the same title already exists"}, status=400)
        except json.JSONDecodeError:
            pass
        return HttpResponse("Done")
     else:
         return HttpResponse("Please use Post Method")


@csrf_exempt 
def fetch_user_data_with_tags(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            user_email = json_data.get('user')
           
            user = User.objects.get(email=user_email)
            
            
            user_data_with_tags = UserRecords.objects.filter(user_email=user)
            
           
            user_data_list = []
            
            for user_data in user_data_with_tags:
                user_data_dict = {
                    'id':user_data.id,
                    "title": user_data.title,
                    "description": user_data.description,
                    "tags": user_data.tags,
                    "media":user_data.media
                }
                user_data_list.append(user_data_dict)
          
            response_data = {
                "user_data": user_data_list,
            }
            print(response_data)
            return JsonResponse(response_data)
        
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        
    else:
        return JsonResponse({"error": "Please use the GET method"}, status=405)
    

@csrf_exempt 
def deleteRecord(request):
    if request.method == 'POST':
        try:
            json_data = json.loads(request.body)
            id = json_data.get('id')
            user_data_to_delete = UserRecords.objects.filter(id=id)
            if user_data_to_delete.exists():
                # Delete the record
                user_data_to_delete.delete()
                print("Record deleted successfully.")
            else:
                print("Record with the specified ID does not exist.")
            response_data = {
                "message": "Record Deleted",
            }
            print(response_data)
            return JsonResponse(response_data)
        
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        
    else:
        return JsonResponse({"error": "Please use the GET method"}, status=405)
    
@csrf_exempt
def fetch_media(request):
    if request.method == 'POST':
        try:
            file_path = json.loads(request.body).get('file')
            print(f"came here to fetch this file - {file_path}")
            
            if os.path.exists(file_path):
                # Open the file for reading and return it as a FileResponse
                f = open(file_path)
                with open(f) as file:
                    data = f.read()
                    print(data)
                    response = FileResponse(file)
                return response
            else:
                # Return a 404 Not Found response if the file doesn't exist
                return HttpResponse(status=404)
        except Exception as e:
            return HttpResponse(status=500)  # Handle other exceptions
    else:
        return HttpResponse("Please use the POST method", status=405)