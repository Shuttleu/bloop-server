FROM node:21
RUN mkdir /app
WORKDIR /app
ADD . .
ENV NODE_ENV=production
RUN npm install
EXPOSE 12345
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]