#Step 1 : Build the React app
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

#Step 2 : Serve the build with nginx
FROM nginx:alpine

#copy the build output to nginx's default html directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]