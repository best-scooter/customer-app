# Develop Branch of native app

#Prerequisits
Download Expo Go app or emulator of your choice, i recommend(Android Studios)

1. docker-compose up
2. Open Expo Go app
3. You'll be shown several options for connecting ignore them there is no emulator inside the container.
4. Get your host computer ip address with ifconfig or your terminals equivalent
5. Change .env to fit your machine. set this for now DEV_ADDRESS=http://xxx.xxx.x.xx, only thing that wont work for now is Auth redirect which is being worked on
6. connect your mobile device to your host Ip through the Expo Go App, example address: exp://(192.123.0.10):8081.

Login doesn't support dynamic ip atm, it's a problem that solves it self upon deployment.
# customer-app
