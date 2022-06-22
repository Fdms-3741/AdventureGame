# So the same file can serve for multiple projects

FROM node as base 

RUN mkdir /app

WORKDIR /app/

FROM base AS development

CMD [ "/bin/bash" ]

FROM base as test

CMD ["npm","test"]

FROM base AS production

ARG PROJECT_ROOT_DIRECTORY

COPY ${PROJECT_ROOT_DIRECTORY} /app/

RUN npm i

RUN npm run build --if-present

CMD [ "npm","start" ]