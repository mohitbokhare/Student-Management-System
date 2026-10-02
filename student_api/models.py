from django.db import models


class Class(models.Model):
    class_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    teacher = models.CharField(max_length=100)
    students = models.PositiveIntegerField(default=0)
    room = models.CharField(max_length=50)
    status = models.CharField(max_length=20, default="Active")

    def __str__(self):
        return f"{self.class_id} - {self.name}"


class Student(models.Model):
    student_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    course = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    status = models.CharField(max_length=20, default="Active")

    def __str__(self):
        return f"{self.student_id} - {self.name}"


class Attendance(models.Model):
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE
    )
    date = models.DateField()
    status = models.CharField(
        max_length=20,
        default="Present"
    )

    def __str__(self):
        return f"{self.student.name} - {self.date} - {self.status}"