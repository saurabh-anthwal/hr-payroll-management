from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
import random
from django.db import models

from django.contrib.auth.hashers import make_password
from django.db import models

class User(AbstractUser):
    class Types(models.TextChoices):
        ADMIN = "ADMIN", "Admin"
        HR = "HR", "HR"
        MANAGER = "MANAGER", "Manager"
        EMPLOYEE = "EMPLOYEE", "Employee"
        PAYROLL_ADMIN = "PAYROLL_ADMIN", "Payroll Administrator"

    type = models.CharField(max_length=20, choices=Types.choices, default=Types.EMPLOYEE)

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
    
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_verified = models.BooleanField(default=False)
    
    def generate_otp(self):
        self.otp = f"{random.randint(100000, 999999)}"
        self.save()

    def save(self, *args, **kwargs):
        if self.password and not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)


def documents_path(instance, filename):
    return 'employee/emp_{id}/{filename}'.format(id=instance.emp_id, filename=filename)

class Admin(models.Model):
    GENDER = [('male', 'Male'), ('female', 'Female'), ('transgender', 'Transgender')]
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
    profilePic = models.ImageField(upload_to='admin_profile_pics/', default="admin/profile-picture.png")
    active = models.BooleanField(default=True)
    
    # One-to-One relationship with User model
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,  # This ensures the admin is deleted when the user is deleted
        related_name="admin",  # This allows you to access Admin from User instance as user.admin
        null=True,
        blank=True,
        limit_choices_to={'type': User.Types.ADMIN}  # Ensure that the related user is of type Admin
    )
    class Meta:
        db_table = 'admin'

    def __str__(self):
        return self.firstname + ' ' + self.lastname

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

class HR(models.Model):
    GENDER = [('male', 'Male'), ('female', 'Female'), ('transgender', 'Transgender')]
    
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
    profilePic = models.ImageField(upload_to='hr_profile_pics/', default="hr/profile-picture.png")
    active = models.BooleanField(default=True)
    
    # One-to-One relationship with User model
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,  # This ensures the HR is deleted when the user is deleted
        related_name="hr",  # This allows you to access HR from User instance as user.hr
        null=True,
        blank=True,
        limit_choices_to={'type': User.Types.HR}  # Ensure that the related user is of type HR
    )

    class Meta:
        db_table = 'hr'

    def __str__(self):
        return self.firstname + ' ' + self.lastname

class Manager(models.Model):
    GENDER = [('male', 'Male'), ('female', 'Female'), ('transgender', 'Transgender')]
    
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
    profilePic = models.ImageField(upload_to='manager_profile_pics/', default="manager/profile-picture.png")
    active = models.BooleanField(default=True)
    
    # One-to-One relationship with User model
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,  # This ensures the Manager is deleted when the user is deleted
        related_name="manager",  # This allows you to access Manager from User instance as user.manager
        null=True,
        blank=True,
        limit_choices_to={'type': User.Types.MANAGER}  # Ensure that the related user is of type Manager
    )

    class Meta:
        db_table = 'manager'

    def __str__(self):
        return self.firstname + ' ' + self.lastname