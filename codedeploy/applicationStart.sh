echo "After install"
cd /home/ec2-user/webservice
sudo rm -rf node_modules
sudo npm install
echo "Start webservice and reload"
sudo pm2 reload all --update-env