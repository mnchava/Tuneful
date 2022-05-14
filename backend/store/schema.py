import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import *


class OrderItemType(DjangoObjectType):
    class Meta:
        model = OrderItem
        # interfaces = (relay.Node,)
        # filter_fields = {
        #     "id": [
        #         "exact",
        #     ],
        #     "item": [
        #         "exact",
        #     ],
        # }
        fields = "__all__"


class OrderType(DjangoObjectType):
    class Meta:
        model = Order
        # interfaces = (relay.Node,)
        # filter_fields = {
        #     "id": [
        #         "exact",
        #     ],
        #     "user": [
        #         "exact",
        #     ],
        #     "status": [
        #         "exact",
        #     ],
        # }
        exclude = ["user"]
        # fields = "__all__"
