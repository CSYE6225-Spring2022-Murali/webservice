echo "Start application"
echo "Start webservice and reload"
#systemctl start webservice
sudo pm2 reload all --update-env