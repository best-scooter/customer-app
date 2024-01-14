FROM node:latest


COPY package*.json ./

RUN npm install

COPY . .

# EXPO's PORT
EXPOSE 19000
# Our porter wine
EXPOSE 8888
# Web port
EXPOSE 19002

#
CMD ["npm", "start"]
