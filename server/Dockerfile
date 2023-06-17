FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ENV NODE_PATH=.

RUN npm install -g nodemon
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE $PORT

RUN mv /usr/src/app/node_modules /node_modules
CMD ["npm", "run", "dev"]
