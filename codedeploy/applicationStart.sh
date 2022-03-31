echo "After install"
cd /home/ec2-user
cd webservice
echo "npm install dependencies"
sudo npm install --production
echo "Start webservice and reload"
sudo pm2 reload all --update-env