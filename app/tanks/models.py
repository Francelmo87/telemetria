from django.db import models

class WaterLevel(models.Model):
    value = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.value} - {self.created_at}"

