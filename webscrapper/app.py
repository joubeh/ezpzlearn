from selenium import webdriver
from selenium.webdriver.common.by import By
import mysql.connector
import time


links = []
mydb = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="",
  database="ezpzlearn"
)
mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM courses WHERE publisher = 'Udemy'")
myresult = mycursor.fetchall()
for x in myresult:
    links.append((x[0], x[11]))


driver = webdriver.Chrome('./chromedriver.exe')
for l in links:
    driver.get(l[1])
    driver.implicitly_wait(30)
    rating = driver.find_element(by=By.CLASS_NAME, value='star-rating-module--rating-number--2xeHu')
    mycursor.execute("UPDATE courses SET stars = "+rating.text+" WHERE id = "+str(l[0]))
    mydb.commit()
    time.sleep(10)