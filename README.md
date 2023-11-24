# Description

Тестовое задание для Backend разработчика системы DEMETRA.

1. Развернуть проект на NestJS.
2. Подключиться к базе данных Postgres (Postgres должен быть развернут в DOCKER - .yml образа приложить).

3. Создать API метод POST создания пользователя.
   3.1 На вход принимает параметры name, email, password.
   3.2 Сделать проверку, если email существует, то необходимо вернуть результат с кодом ошибки:
   { statusCode: 400, message: "ERR_USER_EMAIL_EXISTS" }
   3.3 Если EMAIL свободен, записать в базу данных в таблицу users и поместить задачу в BULL которая через 10 секунд выполнится и установит в таблице users у записи этого пользователя поле status со значением true. (Значение status по умолчанию идёт false).
   3.4 Данный API должен валидироваться с использованием DTO на входе, используя class-validator.

4. Создать API метода GET где мы получаем пользователя по id. (/get-user-by-id?id=1)
   4.1 Если пользователя не существует, кинуть исключение, возврат должен выглядить так:
   { statusCode: 400, message: "ERR_USER_NOT_FOUND" }
   4.2 Если пользователь существует, положить его данные в кэш в REDIS, время жизни кэша 30 минут и вернуть пользователя.
   { statusCode: 200, message: "SUCCESS", user: ...данные пользователя}
   4.3 Если кэш пользователя существует, не лезим в базу данных, а отдаем данные из кэша.
5. Сделать функцию, которая делает запрос с помощью Axios с использованием прокси сервера.
   Прокси сервер:
   IP: 45.196.48.9
   Порт: 5435
   Логин: jtzhwqur
   Пароль: jnf0t0n2tecg

Требования:

1. Использовать TypeORM для запросов к базе.
2. BULL использует REDIS.
3. Проверка на уникальность email при создании пользователя, должен быть отдельный UNIT, который должен быть протестирован UNIT тестом.

PS: UNIT тест по желанию.

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

To test Proxy function make GET request to [http://localhost:3000/user](http://localhost:3000/user)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
