from backend.tuneful.utils import format_duration
import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from .models import *
from django.db.models import Sum
from graphql_jwt.decorators import login_required


class SongType(DjangoObjectType):
    class Meta:
        model = Song
        exclude = ["playlist_set"]

    duration = graphene.String()

    def resolve_duration(self, info):
        return format_duration(self.duration.total_seconds())


class ArtistType(DjangoObjectType):
    class Meta:
        model = Artist
        fields = "__all__"

    top_songs = graphene.List(SongType)

    def resolve_top_songs(self, info):
        songs = Song.objects.filter(artist=self).order_by("likes")

        return songs


class AlbumType(DjangoObjectType):
    class Meta:
        model = Album
        fields = "__all__"

    album_duration = graphene.String()

    def resolve_album_duration(self, info):
        if self.song_set.count() > 0:
            return format_duration(
                Song.objects.filter(album=self)
                .aggregate(Sum("duration"))["duration__sum"]
                .total_seconds()
            )
        else:
            return ""

    price = graphene.Float()

    def resolve_price(self, info):
        return self.song_set.aggregate(Sum("price"))["price__sum"]

    track_number = graphene.Int()

    def resolve_track_number(self, info):
        return Song.objects.filter(album=self).count()


class GenreType(DjangoObjectType):
    class Meta:
        model = Genre
        fields = "__all__"


class PlaylistType(DjangoObjectType):
    class Meta:
        model = Playlist
        exclude = ["owner"]


class UserLibraryType(DjangoObjectType):
    class Meta:
        model = UserLibrary
        fields = "__all__"


class LibraryMutation(graphene.Mutation):
    class Arguments:
        song_ids = graphene.List(graphene.ID, required=True)

    added = graphene.Int()

    @classmethod
    @login_required
    def mutate(cls, root, info, song_ids: list):
        library = UserLibrary.objects.get(pk=info.context.user.id)
        # library = info.context.user.user_library
        songs = []

        for sId in song_ids:
            songs.append(Song.objects.get(pk=int(sId)))

        for song in songs:
            library.songs.add(song)

        library.save()
        return LibraryMutation(added=len(songs))
