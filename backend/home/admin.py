from django.contrib import admin
from .models import Insurance, Bonus, Holiday, LeaveBalance, Leave


admin.site.register(Insurance) 
admin.site.register(Bonus) 
admin.site.register(Holiday) 
admin.site.register(LeaveBalance) 
admin.site.register(Leave) 