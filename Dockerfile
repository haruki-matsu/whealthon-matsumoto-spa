FROM node:16
WORKDIR /app
RUN npm install -g @vue/cli
COPY . .
WORKDIR /app/vue
RUN npm install
EXPOSE 8080
CMD ["npm", "run", "serve"]






