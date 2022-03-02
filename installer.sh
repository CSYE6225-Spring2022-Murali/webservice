#!/bin/bash
sleep 5

#install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

#activate nvm
. ~/.nvm/nvm.sh

#install latest version of node
nvm install node

#install mysql
sudo yum update -y
sudo wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
sudo rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
sudo yum install mysql-server -y
sudo systemctl start mysqld.service
sudo systemctl status mysqld.service

sleep 5
#updating default password and create DB
pwd=`sudo grep 'temporary password' /var/log/mysqld.log | rev | cut -d':' -f 1 | rev | xargs`
mysql -uroot -p"$pwd" --connect-expired-password -e "Alter user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Murali@123'"
mysql -uroot -pMurali@123 -e "CREATE DATABASE IF NOT EXISTS test_db"

#Install necessary dev tools
sudo yum install -y gcc gcc-c++ make openssl-devel git

#Install Node.js
curl --silent --location https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

cd ~/webservice
#Install pm2
sudo npm install pm2@latest -g
#start the application
pm2 index.js