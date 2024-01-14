# customer-app

#Prerequisits
Download Expo Go app or emulator of your choice, i recommend(Android Studios)

This Application needs ws-server, api-server & db up and running.

1. Set the .env variable "DEV_ADDRESS" to your host machines Ip Address.
2. If you want to use docker now build the image with your .env file
3. Get an emulator (t.ex. Android Studio) or download the Expo Go app from an appstore of your choice.
4. Run it in interactive -it to view the QR-code and Address you'll be connecting to in the expo app.
5. Once you can see the QR-code/Address you can type it in or scan it and connect to the app (it's important that you're on the same network as your host machine and have an internet connection)



oAuth is fixed using ngrok since the app is not on the appstore or has an otherwise dynamic ip address.

Troubleshooting.
The ip address is not showing when i run the image. Use this exp://customer-app-escooters.ngrok.io:80 or exp://customer-app-escooters.ngrok.io to connect

Websocket is not connecting, refresh the app through the expo app or the client on your computer by typing r

If you're getting connection problems with the tunnel then you can simply remove it from the package.json script or just run it again. The tunnel is soley used for oAuth functionality you can
still login with an existing user and get your token through there no problems.

If you've run it before changing the .env file it might be appropriate to run it with --clear
