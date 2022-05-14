from django.db import models
import graphene
from users.models import CustomUser
from django_countries.fields import CountryField


class Artist(models.Model):
    name = models.TextField(max_length=128)
    country = CountryField()
    followers = models.PositiveIntegerField(default=0)
    external_image_url = models.CharField(blank=True, null=True, max_length=512)
    image = models.ImageField(
        blank=True, null=True, upload_to="image/artists", default=None
    )

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.TextField()

    def __str__(self):
        return self.name


class Album(models.Model):
    title = models.TextField(max_length=256)
    artist = models.ForeignKey(Artist, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(
        blank=True, null=True, default=None, upload_to="image/albums"
    )
    external_image_url = models.CharField(blank=True, null=True, max_length=512)
    release_date = models.DateField(help_text="YYYY-MM-DD")
    likes = models.PositiveIntegerField(default=0)
    genre = models.ManyToManyField(Genre, verbose_name="Genres for this album")

    def __str__(self) -> str:
        return f"{self.title} - {self.artist}"

    def genres(self):
        return ", ".join([g.name for g in self.genre.all()])


class Song(models.Model):
    album = models.ForeignKey(
        Album, null=True, default=None, on_delete=models.SET_DEFAULT
    )
    artist = models.ManyToManyField(Artist, verbose_name="Artist for this song.")
    audio_file = models.FileField(
        upload_to="media/audio/", blank=True, help_text=("Allowed type - .mp3")
    )
    duration = models.DurationField(help_text="MM:SS", blank=False, default="00:00")
    index_in_album = models.PositiveSmallIntegerField(blank=True, default=1)
    likes = models.PositiveIntegerField(default=0)
    price = models.FloatField(default=0.0)
    title = models.TextField(max_length=256)

    def __str__(self):
        return f"{self.title} - {', '.join([a.name for a in self.artist.all()])}"

    def artists(self):
        return ", ".join([a.name for a in self.artist.all()])


class Playlist(models.Model):
    name = models.TextField(max_length=256)
    owner = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING)
    songs = models.ManyToManyField(Song, verbose_name="Songs in this playlist.")
    followers = models.PositiveIntegerField(default=0)
    public = models.BooleanField(default=False)
    encoded_image = models.TextField(default="")

    def __str__(self) -> str:
        return f"{self.name} by {self.owner}"


class UserLibrary(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, null=True)
    songs = models.ManyToManyField(Song, blank=True, related_name="+")

    def __str__(self) -> str:
        return "{}'s library".format(self.user)
