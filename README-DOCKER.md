# Docker

run the dockerfile with docker run -it -p 8081:8081 davee3/customer-app:1.0
Im currently working on the compose file so untill then use above

If you have an emulator in your path you can from there run android/ios etc im adding expos webpack so that should be runnable? perhaps
Otherwise you can use Android Stuido to connect to the app or your phone use your host ip address they'll tell you to use localhost but cause of container obv wont work
do ipconfig/ifconfig or your terminals equivalent to get your address and use that to connect exp://192.162...:8081 on mobile OS.
as you've surmised this is a huge pain in the ass, trust me i know and i tried making it easier but to no avail.
and while running a mobile emulator as client shouldn't be to hard it's incredibly memory intesive and did infact crash my computer altogether when i tried.