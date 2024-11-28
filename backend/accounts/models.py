from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.db import models


class AdminUser(models.Model):
    username = models.CharField(max_length=50, unique=True, null=True, blank=True)
    password = models.CharField(max_length=128, null=True, blank=True)
    status = models.BooleanField(default=True)

    class Meta:
        db_table = 'admin'

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

class User(AbstractUser):
    class Types(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        HR = "HR", "HR"
        MANAGER = "MANAGER", "Manager"
        EMPLOYEE = "EMPLOYEE", "Employee"
        PAYROLL_ADMIN = "PAYROLL_ADMIN", "Payroll Administrator"

    type = models.CharField(
        max_length=20, choices=Types.choices, default=Types.EMPLOYEE
    )

    email = models.EmailField(unique=True, max_length=50)
    username = models.CharField(unique=True, max_length=20)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    groups = models.ManyToManyField(
        'auth.Group', related_name='custom_user_set', blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='custom_user_permissions_set', blank=True
    )

    def __str__(self):
        return self.email

    @property
    def employee(self):
        return getattr(self, 'employee', None)

    def save(self, *args, **kwargs):
        # Hash the password if it's not already hashed
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


def documents_path(instance, filename):
    return 'employee/emp_{id}/{filename}'.format(id=instance.emp_id, filename=filename)


class Employee(models.Model):
    GENDER = [('male', 'Male'), ('female', 'Female'),('transgender', 'Transgender')]
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    contact = models.IntegerField()
    gender = models.CharField(max_length=50, choices=GENDER)
    dob = models.DateField()
    address = models.CharField(max_length=255)
    department = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)
    dateOfHired = models.DateField()
    dateOfJoined = models.DateField()
    profilePic = models.ImageField(
        upload_to=documents_path, default="employee/profile-picture.png")
    active = models.BooleanField(default=True)
    
    # One-to-One relationship with User model
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE,  # This ensures the employee is deleted when the user is deleted
        related_name="employee",  # This allows you to access Employee from User instance as user.employee
        null=True, 
        blank=True,
        limit_choices_to={'type':User.Types.EMPLOYEE}
    )

    class Meta:
        db_table = 'employee'

    def __str__(self):
        return self.firstname + ' ' + self.lastname
