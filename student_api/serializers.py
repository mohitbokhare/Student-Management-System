from rest_framework import serializers
from .models import Class, Student, Attendance


class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = [
            "class_id",
            "name",
            "course",
            "teacher",
            "students",
            "room",
            "status",
        ]


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            "id",
            "student_id",
            "name",
            "course",
            "email",
            "phone",
            "status",
        ]


class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = [
            "id",
            "student",
            "date",
            "status",
        ]