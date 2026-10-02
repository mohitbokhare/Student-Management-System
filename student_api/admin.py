from django.contrib import admin
from .models import Class


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = (
        "class_id",
        "name",
        "course",
        "teacher",
        "students",
        "room",
        "status",
    )

    search_fields = (
        "class_id",
        "name",
        "course",
        "teacher",
        "room",
    )

    list_filter = (
        "course",
        "status",
    )

    ordering = ("class_id",)