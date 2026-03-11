from django.contrib.auth.models import AbstractUser
from django.db import models
from academics.models import Department


class User(AbstractUser):

    ROLE_CHOICES = (
        ("student", "Student"),
        ("teacher", "Teacher"),
    )

    username = None
    user_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    USERNAME_FIELD = "user_id"
    REQUIRED_FIELDS = []






class TeacherProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    teacher_id = models.CharField(max_length=50)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.user.name


class StudentProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    roll_number = models.CharField(max_length=50)

    department = models.ForeignKey(
        Department,
        on_delete=models.CASCADE
    )

    tests_attempted = models.IntegerField(default=0)

    def __str__(self):
        return self.user.name




# Create your models here.
