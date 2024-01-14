FROM node:latest


COPY package*.json ./

RUN npm install
RUN npm install -g @expo/ngrok@^4.1.0

COPY . .

# EXPO's PORT
EXPOSE 19000
# Our porter wine
EXPOSE 8888
# ngrok port
EXPOSE 80
# Web port
EXPOSE 19002

#
CMD ["npm", "start"]
