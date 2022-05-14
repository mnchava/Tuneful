from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.csrf import csrf_exempt
from graphql_jwt.decorators import jwt_cookie

urlpatterns = [
    path("admin/", admin.site.urls),
    path("graphql/", jwt_cookie(csrf_exempt(GraphQLView.as_view(graphiql=True)))),
] + static(settings.MEDIA_URL, document_root=settings.STATIC_ROOT)
