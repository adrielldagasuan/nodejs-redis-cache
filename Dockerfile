FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app/

# Set environment for Redis connection
# IMPORTANT: Remove these two lines when
# setting of ENV is done in sudo docker run command
#CMD ENV REDIS_HOST=192.168.1.184
#CMD ENV REDIS_PORT=6379

EXPOSE 8080
CMD ["node","app.js"]