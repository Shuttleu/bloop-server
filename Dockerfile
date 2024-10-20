FROM node:21
RUN mkdir /app
WORKDIR /app
ADD package* .
ENV NODE_ENV=production
RUN npm install
ADD . .
EXPOSE 12346
RUN chmod +x entrypoint.sh
ENTRYPOINT ["./entrypoint.sh"]