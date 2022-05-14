from django.db import models
from django.db.models import Sum
from tuneful.models import Song
from users.models import CustomUser

ORDER_STATUS = (
    ("new", "new"),
    ("cancelled", "cancelled"),
    ("completed", "completed"),
    ("processing", "processing"),
)


class OrderItem(models.Model):
    item = models.ForeignKey(Song, on_delete=models.CASCADE, related_name="+")

    def __str__(self) -> str:
        return "Item {}".format(self.id)


class Order(models.Model):
    user = models.ForeignKey(
        CustomUser, on_delete=models.CASCADE, related_name="orders"
    )
    items = models.ManyToManyField(OrderItem, related_name="+")
    created = models.DateTimeField(auto_now_add=True)
    ordered = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices=ORDER_STATUS, default="new", max_length=20)
    delivery_address = models.CharField(max_length=256, blank=True)

    def total_cost(self):
        return self.items.all().aggregate(Sum("price"))["price__sum"]

    def __str__(self) -> str:
        return "Order {} by {}".format(self.id, self.user.username)
