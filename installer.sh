#!/bin/bash
sleep 5

#install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

#activate nvm
. ~/.nvm/nvm.sh

#install latest version of node
nvm install node

#install mysql client
sudo yum update -y
sudo wget https://dev.mysql.com/get/mysql80-community-release-el7-3.noarch.rpm
sudo rpm --import https://repo.mysql.com/RPM-GPG-KEY-mysql-2022
sudo rpm -Uvh mysql80-community-release-el7-3.noarch.rpm
sudo amazon-linux-extras install epel -y
sudo yum install mysql -y

sleep 5

#Install necessary dev tools
sudo yum install -y gcc gcc-c++ make openssl-devel git


#Install Node.js
curl --silent --location https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

cd ~/webservice
#Install pm2
sudo npm install pm2@latest -g
#start the application using pm2
#pm2 start index.js
#pm2 startup systemd
#pm2 save
#pm2 list