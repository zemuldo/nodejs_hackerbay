FROM node:carbon

# Install system requirements Graphics magic and Mongodb
RUN apt-get update -y
RUN apt-get install mongodb graphicsmagick -y
RUN mkdir -p /data/db/
RUN chown `id -u` /data/db
RUN /etc/init.d/mongodb start

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# BUNDLE THE CODE
COPY . .

EXPOSE 8099 
CMD ["npm", "start"]