from django.contrib import admin
from .models import Admin, Employee, User, HR, Manager

# Register your models here.
admin.site.register(Admin) 
admin.site.register(Employee)
admin.site.register(User)
admin.site.register(HR)
admin.site.register(Manager)