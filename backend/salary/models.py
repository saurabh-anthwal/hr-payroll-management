from django.db import models
from accounts.models import Employee

class Salary(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
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
        return self.employee.firstname + " " + self.employee.lastname


class MonthlySalary(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    from_date = models.DateField()
    to_date = models.DateField()
    paid_status = models.BooleanField(default=False)
    paid_date = models.DateField(null=True)

    class Meta:
        db_table = 'monthly_salary'

    def __str__(self):
        return self.employee.firstname + " " + self.employee.lastname
