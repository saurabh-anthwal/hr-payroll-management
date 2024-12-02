from django.contrib import admin
from .models import Leave, Attendance, Insurance, Bonus, Reimbursement, LeaveBalance, Holiday

admin.site.register(LeaveBalance) 
admin.site.register(Leave) 
admin.site.register(Attendance) 
admin.site.register(Insurance) 
admin.site.register(Bonus) 
admin.site.register(Reimbursement) 
admin.site.register(Holiday) 