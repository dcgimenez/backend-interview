FROM node:18
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm config set registry https://registry.npmjs.org/
RUN npm config delete //registry.npmjs.org/:_authToken || true

RUN npm install --loglevel=warn --legacy-peer-deps --no-audit --no-fund --no-optional

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]
