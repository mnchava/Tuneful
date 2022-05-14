import graphene
from graphene_django import DjangoObjectType
from .models import CustomUser
from graphql_jwt.decorators import login_required


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        exclude = ["password"]


class UserMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        username = graphene.String(required=True)
        email = graphene.String(required=True)
        id = graphene.ID()

    # The class attributes define the response of the mutation
    User = graphene.Field(UserType)

    @classmethod
    @login_required
    def mutate(cls, root, info, username, email, id):
        user = CustomUser.objects.get(pk=id)
        user.username = username
        user.email = email
        user.save()
        # Notice we return an instance of this mutation
        return UserMutation(User=user)
