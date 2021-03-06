# Dev Manager

Aplicação básica desenvolvida em ReactJS + Laravel (Sistema CRUD de DEVS)

## Installation

Utilize o Docker para rodar a aplicação.

Lembre-se de alterar a variavel {containerSource} de acordo com local em que se encontra as pastas (/vol & /apache2) em seu projeto

```bash
docker build -t devmanager . && docker run -it -p 80:80 -p 8080:8080 -v {containerSource}/vol:/var/www/html -v {containerSource}/apache2:/etc/apache2 devmanager
```

## Tests

Vá para essa pasta (docker) /var/www/html/api e execute o comando abaixo para os testes do back-end

```bash
php artisan test
```

Vá para essa pasta (docker) /var/www/html/app e execute o comando abaixo para os testes de renderização do front-end

```bash
yarn test
```

## Usage

Entre na url http://localhost:8080/ para acessar a aplicação

```python
http://localhost:8080 // Front-end ReactJS
http://localhost:80 // Back-end Laravel
```

## License
[MIT](https://choosealicense.com/licenses/mit/)