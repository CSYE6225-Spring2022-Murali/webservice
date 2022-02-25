#!/bin/bash
sleep 5

#Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

#activate nvm
. ~/.nvm/nvm.sh

#install latest version of node
nvm install node

#verify node installation
node -v
npm -v

#Install Git
sudo yum update -y
sudo yum install git -y

#verify git installation
git --version

#create folder structure
mkdir app-folder
cd app-folder

#clone the app repo
git clone git@github.com:Muralikrishna-Shanmuganathan/webservice.git
git checkout assignment04
cd webservice

#install dependencies
npm install

#run app 
npm run dev