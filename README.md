# EZ PZ Learn
Online video learning platform made with `Laravel` + `React` (and many other technologies like `ElasticSearch`, `Tailwind CSS`)

# Requirements

- PHP 8.0
- Composer 2.5
- MySql 8.0
- Elastic Search 7.17
- NodeJS 18.6

# Installation and Usage

- Clone the repository
- Intsall PHP required packages: `composer install`
- Install Node required packages: `npm install`
- Edit `.env` file with your own enviroment variables
- Create a database and run database migrations to create tables: `php artisan migrate`
- Run frontend server: `npm run dev`
- Run backend server: `php artisan serve`
- Application is running and ready to use on: `http://127.0.0.1:8000`

# Web Scrapper

Web scrapper is in webscrapper folder to use it you need:

- Python 3.11

first you need to install required packages

- `pip install selenium`
- `pip install mysql`

then set database credentials in `app.py`
then download and paste selenium chromedriver in the webscrapper folder
and to run the app just simply run: `python app.py`
