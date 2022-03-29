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

#Install CodeDeploy agent
sudo yum update -y
sudo yum install ruby -y
sudo yum install wget -y

#To clean the AMI of any previous agent caching information
CODEDEPLOY_BIN="/opt/codedeploy-agent/bin/codedeploy-agent"
$CODEDEPLOY_BIN stop
yum erase codedeploy-agent -y

cd /home/ec2-user
wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
chmod +x ./install

#To install the latest version of the CodeDeploy agent
sudo ./install auto

#Install aws cli
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

#To start and check that the service is running
sudo service codedeploy-agent start
sudo service codedeploy-agent status

cd ~/webservice
#Install pm2
sudo npm install pm2@latest -g
sudo pm2 startup systemd --service-name myapp
sudo pm2 start index.js
sudo pm2 save