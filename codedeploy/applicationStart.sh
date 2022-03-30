echo "Application Start script"
cd /home/ec2-user
cd webservice
echo "npm clean install dependencies"
sudo npm ci
echo "Start webservice and reload"
sudo pm2 reload all --update-env