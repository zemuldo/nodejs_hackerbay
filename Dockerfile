FROM node:carbon

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

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8099 
CMD ["npm", "start"]