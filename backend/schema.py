from pydoc import resolve

import graphene
import graphql_jwt
from graphene_django import DjangoConnectionField, DjangoListField, DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql_jwt.decorators import login_required, user_passes_test
from pkg_resources import require

from backend.store.schema import OrderType
from tuneful.schema import *
from users.schema import *


class Query(graphene.ObjectType):
    get_artists = DjangoListField(ArtistType)

    get_albums = DjangoListField(AlbumType)

    get_songs = DjangoListField(SongType)

    get_playlists = DjangoListField(PlaylistType)

    get_library = graphene.Field(UserLibraryType)

    @login_required
    def resolve_get_library(self, info):
        user = info.context.user
        return user.userlibrary

    get_user = graphene.Field(UserType, username=graphene.String(required=True))

    @login_required
    def resolve_get_user(self, info, username: graphene.String(required=True)):
        return CustomUser.objects.get(username=username)

    viewer = graphene.Field(UserType)

    def resolve_viewer(self, info, **kwargs):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Authentication credentials were not provided")
        return user

    orders = graphene.List(OrderType)


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()

    update_user = UserMutation.Field()

    create_user = graphene.Field(
        UserType,
        username=graphene.String(required=True),
        email=graphene.String(required=True),
        password=graphene.String(required=True),
    )

    def resolve_create_user(
        self,
        info,
        username: graphene.String(required=True),
        email: graphene.String(required=True),
        password: graphene.String(required=True),
    ):
        user = info.context.user
        if not user.is_authenticated or user.is_staff:
            new = CustomUser.objects.create_user(
                username=username, email=email, password=password
            )
            new.save()

            lib = UserLibrary.objects.create(user=new)
            lib.save()

            return new

    add_to_library = LibraryMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
