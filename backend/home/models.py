from django.db import models
from accounts.models import User
from datetime import time

class LeaveBalance(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_balances')
    leave_type = models.CharField(max_length=50,default='Monthly')
    total_leaves = models.IntegerField(default=0)
    used_leaves = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.employee.username} - {self.leave_type}: {self.total_leaves} leaves available"

class Leave(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.CharField(max_length=50)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=[('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected')])
    reason = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.employee.username} - {self.leave_type}"


class Attendance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="attendance")
    date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=(("Present", "Present"), ("Absent", "Absent")))
    check_in_time = models.TimeField(null=True, blank=True)
    check_out_time = models.TimeField(null=True, blank=True)
    late = models.BooleanField(default=False)

    def calculate_late(self, work_start_time=time(9, 0)):
        if self.check_in_time and self.check_in_time > work_start_time:
            self.late = True
        else:
            self.late = False
        self.save()


class Insurance(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="insurance_details")
    policy_name = models.CharField(max_length=100)
    policy_number = models.CharField(max_length=50)
    coverage_amount = models.DecimalField(max_digits=10, decimal_places=2)
    expiration_date = models.DateField()

    def __str__(self):
        return f"{self.user.username} - {self.policy_name}"

class Bonus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bonus_records")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_awarded = models.DateField()
    description = models.TextField()

    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.date_awarded}"


class Reimbursement(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reimbursements")
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reimbursement_date = models.DateField()
    purpose = models.TextField()
    status = models.CharField(max_length=20, choices=(("Pending", "Pending"), ("Approved", "Approved"), ("Rejected", "Rejected")))

    def __str__(self):
        return f"{self.user.username} - {self.amount} - {self.status}"

        


