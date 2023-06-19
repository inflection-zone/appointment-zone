FROM node:18-alpine3.16 

ADD . /app

WORKDIR /app 

RUN apk add bash

COPY package*.json /app/

COPY tsconfig.json /app/

COPY src ./src/

RUN npm install 

RUN npx prisma generate

# RUN npm run build

COPY . .


# RUN npm run build


EXPOSE 3000

CMD ["npm", "run", "start:migrate"] 