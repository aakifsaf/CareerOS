from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))

        return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
    ROLE_CHOICES = (
        ('student', _('Student')),
        ('parent', _('Parent')),
    )

    username = None  # We don't want/need a username
    email = models.EmailField(_('email address'), unique=True, db_index=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='student')
    location = models.CharField(max_length=100, blank=True, null=True)
    # first_name and last_name are inherited from AbstractUser

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # No other fields required for createsuperuser besides email and password

    objects = UserManager()

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        elif self.last_name:
            return self.last_name
        return self.email


class Assessment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assessments')
    interests = models.TextField(blank=True, help_text=_("User's stated interests"))
    career_aspiration = models.CharField(max_length=255, blank=True, help_text=_("User's primary career goal"))
    skill_ratings = models.JSONField(default=dict, blank=True, help_text=_("Self-rated skills, e.g., {'python': 4}"))
    answers_json = models.JSONField(default=dict, help_text=_("Raw answers from the assessment form"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Assessment for {self.user.email} on {self.created_at.strftime('%Y-%m-%d')}"

class Career(models.Model):
    TREND_CHOICES = (
        ('rising', _('Rising')),
        ('stable', _('Stable')),
        ('declining', _('Declining')),
    )
    title = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    automation_risk = models.FloatField(default=0.0, help_text=_("Estimated risk of automation (0.0 to 1.0)"))
    market_demand = models.IntegerField(default=0, help_text=_("Current market demand score (e.g., 1-10 or job openings)"))
    future_trend = models.CharField(max_length=10, choices=TREND_CHOICES, default='stable')
    suggested_skills_text = models.TextField(blank=True, help_text=_("Comma-separated list of suggested skills"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Roadmap(models.Model):
    career = models.ForeignKey(Career, on_delete=models.SET_NULL, null=True, blank=True, related_name='suggested_roadmaps')
    user_assessment = models.OneToOneField(Assessment, on_delete=models.CASCADE, null=True, blank=True, related_name='personalized_roadmap')
    title = models.CharField(max_length=255, default=_("Personalized Career Roadmap"))
    milestones_json = models.JSONField(default=list, help_text=_("List of milestones with details, e.g., [{'milestone': 'Learn X', ...}]"))
    total_duration_estimate_months = models.IntegerField(default=0, help_text=_("Overall estimated duration in months"))
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user_assessment:
            return f"Roadmap for {self.user_assessment.user.email} ({self.title})"
        elif self.career:
            return f"Roadmap for {self.career.title} ({self.title})"
        return self.title
