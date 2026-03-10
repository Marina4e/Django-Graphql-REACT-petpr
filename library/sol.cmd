🚀 Теперь работаем в GraphQL

Открывай:

http://127.0.0.1:8000/graphql/

Ты видишь GraphiQL интерфейс — это отлично.

Теперь делаем всё по шагам.

🔐 1️⃣ Получаем JWT токен

Если у тебя есть superuser (которого ты создавала), выполняй:

mutation {
  tokenAuth(username: "admin", password: "ТВОЙ_ПАРОЛЬ") {
    token
  }
}

👉 Нажми ▶

Ты получишь:

{
  "data": {
    "tokenAuth": {
      "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    }
  }
}

Скопируй токен.

🔑 2️⃣ Передаём токен

В GraphiQL сверху есть вкладка Headers.

Добавь туда:

{
  "Authorization": "JWT ТВОЙ_ТОКЕН"
}

Важно:

JWT + пробел + сам токен

👩‍💼 3️⃣ Создаём автора (только авторизованный!)

Теперь выполняй:

mutation {
  createAuthor(name: "Stephen King", status: "active") {
    author {
      id
      name
      status
    }
  }
}

Если токен передан правильно — автор создастся.

Если убрать токен — будет ошибка "Authentication credentials were not provided".

Вот это и есть защита через:

@login_required
📚 4️⃣ Создаём книгу

Это mutation доступна без авторизации.

mutation {
  createBook(
    title: "The Shining"
    authorId: 1
    publishedDate: "1977-01-28"
    isbn: "1234567890123"
    summary: "Horror novel"
  ) {
    book {
      id
      title
      author {
        name
      }
    }
  }
}

Обрати внимание:

Graphene автоматически преобразует:

author_id

в

authorId

Это особенность Graphene.

✏️ 5️⃣ Обновляем книгу
mutation {
  updateBook(
    id: 1
    title: "The Shining (Updated)"
    summary: "Updated summary"
  ) {
    book {
      id
      title
      summary
    }
  }
}
❌ 6️⃣ Удаляем книгу
mutation {
  deleteBook(id: 1) {
    ok
  }
}

Если вернёт:

{
  "data": {
    "deleteBook": {
      "ok": true
    }
  }
}

значит удалено.

📖 7️⃣ Список авторов
{
  allAuthors {
    id
    name
    status
    books {
      title
    }
  }
}

Вот тут работает related fetch 👆

📚 8️⃣ Список книг
{
  allBooks {
    id
    title
    publishedDate
    author {
      name
      status
    }
  }
}

Это nested relationship.