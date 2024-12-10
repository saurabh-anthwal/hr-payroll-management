from django.db import models
from accounts.models import Employee, User

class Salary(models.Model):
    employee = models.ForeignKey(User, on_delete=models.CASCADE)
    ppa = models.FloatField()
    monthly_salary = models.FloatField()
    basic_da = models.FloatField()
    hra = models.FloatField()
    conveyance = models.FloatField()
    pf = models.FloatField()
    esic = models.FloatField()
    professional_tax = models.FloatField()
    net_salary = models.FloatField()

    class Meta:
        db_table = 'salary'

    def __str__(self):
        return self.employee.email


class MonthlySalary(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="monthly_salaries")
    salary = models.ForeignKey(Salary, on_delete=models.CASCADE, related_name="monthly_salaries")
    from_date = models.DateField()
    to_date = models.DateField()
    total_salary = models.FloatField() 
    paid_amount = models.FloatField(default=0)
    balance_amount = models.FloatField(default=0) 
    paid_status = models.BooleanField(default=False)  
    paid_date = models.DateField(null=True, blank=True)  
    payment_due_date = models.DateField(null=True, blank=True) 

    class Meta:
        db_table = "monthly_salary"
        verbose_name = "Monthly Salary"
        verbose_name_plural = "Monthly Salaries"

    def __str__(self):
        return f"Monthly Salary for {self.user.email}"

    def save(self, *args, **kwargs):
        self.balance_amount = self.total_salary - self.paid_amount
        self.paid_status = self.balance_amount <= 0 
        super().save(*args, **kwargs)


