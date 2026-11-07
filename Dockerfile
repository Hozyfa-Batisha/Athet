# ---- 1) build: Tailwind CSS (بدل CDN اللي بيترجم في المتصفح) ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY styles ./styles
COPY public/index.html ./public/index.html
COPY public/Games ./public/Games
RUN npm run build:css

# ---- 2) runtime: Node بس، من غير أي dependencies ----
FROM node:22-alpine
ENV NODE_ENV=production PORT=3000 DATA_DIR=/data
WORKDIR /app
COPY --chown=node:node src ./src
COPY --chown=node:node public ./public
COPY --from=build --chown=node:node /app/public/css ./public/css
COPY --chown=node:node package.json ./
RUN mkdir -p /data && chown node:node /data
USER node
VOLUME /data
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s CMD wget -qO- http://127.0.0.1:3000/healthz || exit 1
CMD ["node", "src/server.js"]
