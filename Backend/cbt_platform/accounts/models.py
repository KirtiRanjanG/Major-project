from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ('teacher', 'Teacher'),
        ('student', 'Student'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)

    def __str__(self):
        return self.username


class TeacherProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    teacher_id = models.CharField(max_length=50)

    university = models.CharField(max_length=200)
    college = models.CharField(max_length=200)
    department = models.CharField(max_length=200)

    def __str__(self):
        return self.user.username


class StudentProfile(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    roll_number = models.CharField(max_length=50)

    university = models.CharField(max_length=200)
    college = models.CharField(max_length=200)
    department = models.CharField(max_length=200)

    tests_attempted = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username



# Create your models here.
