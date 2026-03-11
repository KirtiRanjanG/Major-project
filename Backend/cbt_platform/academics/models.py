from django.db import models

class University(models.Model):

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class College(models.Model):

    name = models.CharField(max_length=255)
    university = models.ForeignKey(
        University,
        on_delete=models.CASCADE,
        related_name="colleges"
    )

    def __str__(self):
        return self.name


class Department(models.Model):

    name = models.CharField(max_length=100)
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name="departments"
    )

    def __str__(self):
        return f"{self.name} - {self.college.name}"
# Create your models here.
