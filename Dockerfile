FROM node:latest


COPY package*.json ./

RUN npm install

COPY . .

# EXPO's PORT
EXPOSE 19000
EXPOSE 8081

#
CMD ["npm", "start"]
