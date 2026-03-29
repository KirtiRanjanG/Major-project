from django.contrib import admin
from .models import CustomUser, CustomUserManager, AbstractBaseUser, PermissionsMixin,
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "role", "is_active", "is_staff", "date_joined")
    list_filter = ("role", "is_active", "is_staff")
    search_fields = ("username", "email")


# Register your models here.
