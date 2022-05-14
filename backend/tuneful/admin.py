from django.contrib import admin
from .models import *


class SongAdmin(admin.ModelAdmin):
    model = Song
    list_display = ("id", "title", "artists", "index_in_album", "album")
    search_fields = ("title",)
    ordering = (
        "title",
        "artist",
        "album",
    )


class ArtistAdmin(admin.ModelAdmin):
    model = Artist
    list_display = (
        "name",
        "country",
        "followers",
    )
    search_fields = (
        "name",
        "country",
    )
    ordering = (
        "name",
        "country",
        "followers",
    )


class GenreAdmin(admin.ModelAdmin):
    model = Genre
    list_display = ("name",)
    search_fields = ("name",)
    ordering = ("name",)


class AlbumAdmin(admin.ModelAdmin):
    model = Album
    list_display = (
        "title",
        "artist",
        "likes",
        "genres",
    )
    search_fields = ("title",)
    ordering = (
        "title",
        "artist",
        "likes",
    )


class PlaylistAdmin(admin.ModelAdmin):
    model = Playlist
    list_display = (
        "name",
        "owner",
        "followers",
        "public",
    )
    search_fields = (
        "name",
        # "owner",
    )
    ordering = (
        "name",
        "owner",
        "followers",
    )
    list_filter = ("public",)


admin.site.register(Artist, ArtistAdmin)
admin.site.register(Album, AlbumAdmin)
admin.site.register(Genre, GenreAdmin)
admin.site.register(Song, SongAdmin)
admin.site.register(Playlist, PlaylistAdmin)
admin.site.register(UserLibrary)
