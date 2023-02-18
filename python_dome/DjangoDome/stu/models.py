from django.db import models

# Create your models here.
from django.db.models import Model


class Student(models.Model):
    sname = models.CharField(max_length=30,unique=True)
    spwd = models.CharField(max_length=30)

    # 指定表名
    # class Meta:
    #     db_table = "Person"
    # def __unicode__(self):
    #     return self.sname