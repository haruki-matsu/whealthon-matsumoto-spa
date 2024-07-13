FROM node:18
WORKDIR /app
COPY vue/package*.json ./
RUN npm install 
COPY vue ./
RUN chmod -R 755 /app
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]





