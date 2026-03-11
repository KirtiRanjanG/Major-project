from rest_framework import serializers
from .models import User, TeacherProfile, StudentProfile
from academics.models import University, College, Department

class RegisterSerializer(serializers.Serializer):

    name = serializers.CharField()
    role = serializers.CharField()

    university = serializers.CharField()
    college = serializers.CharField()
    department = serializers.CharField()

    user_id = serializers.CharField()
    password = serializers.CharField()

    def create(self, validated_data):

        university_name = validated_data["university"]
        college_name = validated_data["college"]
        department_name = validated_data["department"]

        university, _ = University.objects.get_or_create(
            name=university_name
        )

        college, _ = College.objects.get_or_create(
            name=college_name,
            university=university
        )

        department, _ = Department.objects.get_or_create(
            name=department_name,
            college=college
        )

        user = User.objects.create_user(
            user_id=validated_data["user_id"],
            name=validated_data["name"],
            password=validated_data["password"],
            role=validated_data["role"]
        )

        if user.role == "teacher":

            TeacherProfile.objects.create(
                user=user,
                teacher_id=validated_data["user_id"],
                department=department
            )

        else:

            StudentProfile.objects.create(
                user=user,
                roll_number=validated_data["user_id"],
                department=department
            )

        return user