from django.db import models


class Author(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('retired', 'Retired'),
        ('deceased', 'Deceased'),
    ]

    name = models.CharField(max_length=100)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name="books"
    )
    published_date = models.DateField()
    isbn = models.CharField(max_length=20, unique=False, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

