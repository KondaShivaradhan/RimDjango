from django.contrib.postgres.fields import ArrayField
from django.utils.text import slugify
from django.db import models
import re
megaBack = "kondashivaradhan007@gmail.com"
class User(models.Model):
    email = models.EmailField(unique=True, blank=False, null=False)
    folderName = models.TextField(default="")
    backupMegaAcc = models.TextField(default=megaBack)
    quota = models.DecimalField(max_digits=10, decimal_places=2, default=1024.00)
    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        local_part = self.email.split('@')[0]
        letters_only = ''.join(filter(str.isalpha, local_part))
        folder_name = f"{letters_only}_{self.id}"
        self.folderName = folder_name
        super(User, self).save(*args, **kwargs)
class UserRecords(models.Model):
    id = models.AutoField(primary_key=True)
    user_email = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    tags = ArrayField(models.CharField(max_length=255))
    media = ArrayField(models.FileField(),null=True)

   