import math
import graphene
from graphene_django import DjangoObjectType
from library.models import Author, Book
from graphql_jwt.decorators import login_required
import graphql_jwt


# =========================
# TYPES
# =========================

class AuthorType(DjangoObjectType):
    class Meta:
        model = Author
        fields = "__all__"


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = "__all__"


# =========================
# PAGINATION TYPE
# =========================

class BookPaginationType(graphene.ObjectType):

    books = graphene.List(BookType)

    total = graphene.Int()

    page = graphene.Int()

    pages = graphene.Int()


# =========================
# QUERY
# =========================

class Query(graphene.ObjectType):

    all_authors = graphene.List(AuthorType)

    all_books = graphene.Field(
        BookPaginationType,
        page=graphene.Int(),
        limit=graphene.Int(),
        search=graphene.String(),
        author_id=graphene.Int(),
        order_by=graphene.String()
    )

    book_by_id = graphene.Field(BookType, id=graphene.Int(required=True))


    def resolve_all_authors(root, info):
        return Author.objects.all()


    def resolve_book_by_id(root, info, id):
        return Book.objects.get(pk=id)


    def resolve_all_books(
        root,
        info,
        page=1,
        limit=8,
        search=None,
        author_id=None,
        order_by=None
    ):

        qs = Book.objects.select_related("author").all()

        # 🔎 SEARCH
        if search:
            qs = qs.filter(title__icontains=search)

        # 👤 FILTER BY AUTHOR
        if author_id is not None:
            qs = qs.filter(author_id=author_id)

        # 🔀 SORT
        if order_by:
            qs = qs.order_by(order_by)

        total = qs.count()

        pages = math.ceil(total / limit)

        start = (page - 1) * limit
        end = start + limit

        books = qs[start:end]

        return BookPaginationType(
            books=books,
            total=total,
            page=page,
            pages=pages
        )


# =========================
# MUTATIONS
# =========================

class CreateAuthor(graphene.Mutation):

    class Arguments:
        name = graphene.String(required=True)
        status = graphene.String(required=True)

    author = graphene.Field(AuthorType)

    @login_required
    def mutate(self, info, name, status):

        author = Author.objects.create(
            name=name,
            status=status
        )

        return CreateAuthor(author=author)


class CreateBook(graphene.Mutation):

    class Arguments:
        title = graphene.String(required=True)
        author_id = graphene.Int(required=True)
        published_date = graphene.Date(required=True)
        isbn = graphene.String(required=True)
        summary = graphene.String()

    book = graphene.Field(BookType)

    def mutate(self, info, title, author_id, published_date, isbn, summary=None):

        author = Author.objects.get(pk=author_id)

        book = Book.objects.create(
            title=title,
            author=author,
            published_date=published_date,
            isbn=isbn,
            summary=summary
        )

        return CreateBook(book=book)


class UpdateBook(graphene.Mutation):

    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String()
        summary = graphene.String()

    book = graphene.Field(BookType)

    def mutate(self, info, id, title=None, summary=None):

        book = Book.objects.get(pk=id)

        if title:
            book.title = title

        if summary:
            book.summary = summary

        book.save()

        return UpdateBook(book=book)


class DeleteBook(graphene.Mutation):

    class Arguments:
        id = graphene.Int(required=True)

    ok = graphene.Boolean()

    def mutate(self, info, id):

        book = Book.objects.get(pk=id)

        book.delete()

        return DeleteBook(ok=True)


# =========================
# ROOT MUTATION
# =========================

class Mutation(graphene.ObjectType):

    token_auth = graphql_jwt.ObtainJSONWebToken.Field()

    verify_token = graphql_jwt.Verify.Field()

    create_author = CreateAuthor.Field()

    create_book = CreateBook.Field()

    update_book = UpdateBook.Field()

    delete_book = DeleteBook.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
