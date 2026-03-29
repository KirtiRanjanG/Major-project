from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone


# ─────────────────────────────────────────────
#  Custom User Manager
# ─────────────────────────────────────────────

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", CustomUser.ADMIN)
        return self.create_user(username, email, password, **extra_fields)


# ─────────────────────────────────────────────
#  Custom User Model  (Registration fields only)
# ─────────────────────────────────────────────

class CustomUser(AbstractBaseUser, PermissionsMixin):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN   = "admin"

    ROLE_CHOICES = [
        (STUDENT, "Student"),
        (TEACHER, "Teacher"),
        (ADMIN,   "Admin"),
    ]

    # ── Registration fields (required at sign-up) ──────────────────────
    role      = models.CharField(max_length=10, choices=ROLE_CHOICES)
    username  = models.CharField(max_length=150, unique=True)
    email     = models.EmailField(unique=True)
    # password is handled by AbstractBaseUser

    # ── Account status ─────────────────────────────────────────────────
    is_active       = models.BooleanField(default=True)
    is_staff        = models.BooleanField(default=False)
    date_joined     = models.DateTimeField(default=timezone.now)

    # ── Profile completion flag ────────────────────────────────────────
    is_profile_complete = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD  = "username"
    REQUIRED_FIELDS = ["email", "role"]

    class Meta:
        verbose_name      = "User"
        verbose_name_plural = "Users"
        ordering = ["-date_joined"]

    def __str__(self):
        return f"{self.username} ({self.role})"

    # ── Convenience helpers ────────────────────────────────────────────
    @property
    def is_student(self):
        return self.role == self.STUDENT

    @property
    def is_teacher(self):
        return self.role == self.TEACHER

    def get_dashboard_url(self):
        """Return the dashboard redirect URL based on role."""
        from django.urls import reverse
        if self.is_student:
            return reverse("student_dashboard")
        elif self.is_teacher:
            return reverse("teacher_dashboard")
        return reverse("admin:index")


# ─────────────────────────────────────────────
#  Shared Institution Info (used by both roles)
# ─────────────────────────────────────────────

class InstitutionProfile(models.Model):
    """
    Stores university / college / department details.
    Both StudentProfile and TeacherProfile link here, enabling
    the teacher-can-see-only-own-department access control.
    """
    university_name = models.CharField(max_length=255)
    college_name    = models.CharField(max_length=255)
    department_name = models.CharField(max_length=255)

    class Meta:
        verbose_name        = "Institution Profile"
        verbose_name_plural = "Institution Profiles"
        # Composite uniqueness: same university + college + department = 1 record
        unique_together = ("university_name", "college_name", "department_name")
        ordering = ["university_name", "college_name", "department_name"]

    def __str__(self):
        return f"{self.university_name} → {self.college_name} → {self.department_name}"


# ─────────────────────────────────────────────
#  Teacher Profile  (filled after first login)
# ─────────────────────────────────────────────

class TeacherProfile(models.Model):
    user        = models.OneToOneField(
                    CustomUser,
                    on_delete=models.CASCADE,
                    related_name="teacher_profile",
                    limit_choices_to={"role": CustomUser.TEACHER},
                  )
    institution = models.ForeignKey(
                    InstitutionProfile,
                    on_delete=models.SET_NULL,
                    null=True, blank=True,
                    related_name="teachers",
                  )
    teacher_id  = models.CharField(max_length=50, unique=True)

    # Optional extras
    full_name        = models.CharField(max_length=255, blank=True)
    designation      = models.CharField(max_length=100, blank=True,
                         help_text="e.g. Assistant Professor, HOD")
    profile_photo    = models.ImageField(
                         upload_to="teacher_photos/", null=True, blank=True
                       )
    created_at       = models.DateTimeField(auto_now_add=True)
    updated_at       = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "Teacher Profile"
        verbose_name_plural = "Teacher Profiles"

    def __str__(self):
        return f"Teacher: {self.user.username} | ID: {self.teacher_id}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Mark parent user profile as complete if all required fields are filled
        if self.institution and self.teacher_id:
            self.user.is_profile_complete = True
            self.user.save(update_fields=["is_profile_complete"])


# ─────────────────────────────────────────────
#  Student Profile  (filled after first login)
# ─────────────────────────────────────────────

class StudentProfile(models.Model):
    user        = models.OneToOneField(
                    CustomUser,
                    on_delete=models.CASCADE,
                    related_name="student_profile",
                    limit_choices_to={"role": CustomUser.STUDENT},
                  )
    institution = models.ForeignKey(
                    InstitutionProfile,
                    on_delete=models.SET_NULL,
                    null=True, blank=True,
                    related_name="students",
                  )
    roll_number = models.CharField(max_length=50)
    session     = models.CharField(
                    max_length=20,
                    help_text='Academic session, e.g. "2021-2024"'
                  )

    # Optional extras
    full_name     = models.CharField(max_length=255, blank=True)
    profile_photo = models.ImageField(
                      upload_to="student_photos/", null=True, blank=True
                    )
    created_at    = models.DateTimeField(auto_now_add=True)
    updated_at    = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name        = "Student Profile"
        verbose_name_plural = "Student Profiles"
        # Roll number must be unique within the same institution
        unique_together = ("institution", "roll_number")

    def __str__(self):
        return f"Student: {self.user.username} | Roll: {self.roll_number} | {self.session}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Mark parent user profile as complete if all required fields are filled
        if self.institution and self.roll_number and self.session:
            self.user.is_profile_complete = True
            self.user.save(update_fields=["is_profile_complete"])


# ─────────────────────────────────────────────
#  Access-Control Helper (Manager / QuerySet)
# ─────────────────────────────────────────────

class StudentQuerySet(models.QuerySet):
    def for_teacher(self, teacher_profile):
        """
        Returns only the students that belong to the same
        university + college + department as the given teacher.
        """
        if teacher_profile.institution is None:
            return self.none()
        return self.filter(institution=teacher_profile.institution)


class StudentProfileManager(models.Manager):
    def get_queryset(self):
        return StudentQuerySet(self.model, using=self._db)

    def for_teacher(self, teacher_profile):
        return self.get_queryset().for_teacher(teacher_profile)


# Attach the custom manager to StudentProfile
StudentProfile.add_to_class("objects", StudentProfileManager())

# Create your models here.
