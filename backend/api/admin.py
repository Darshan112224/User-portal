# admin.py
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Unregister the default User model
admin.site.unregister(User)

# Customize UserAdmin (optional)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('username', 'email')

# Register the User model with the custom admin class
admin.site.register(User, CustomUserAdmin)
