#!/bin/bash
sleep 5

#install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

#activate nvm
. ~/.nvm/nvm.sh

#install latest version of node
nvm install node

#install mysql
sudo yum update
sudo wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
sudo rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
sudo yum install mysql-server -y
sudo systemctl start mysqld.service
sudo systemctl status mysqld.service

sleep 5
#updating default password
pwd=`sudo grep 'temporary password' /var/log/mysqld.log | rev | cut -d':' -f 1 | rev | xargs`
mysql -uroot -p"$pwd" --connect-expired-password -e "Alter user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Murali@123'"

#using pm2 
cd ~
sudo npm install pm2
sudo chmod 755 webservice
cd ~/webservice
sudo pm2 start index.js
sudo pm2 startup systemd
sudo pm2 save
sudo pm2 list