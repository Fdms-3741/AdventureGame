# So the same file can serve for multiple projects

FROM node as base 

RUN mkdir /app

WORKDIR /app/

FROM base AS development

ARG PROJECT_ROOT_DIRECTORY

CMD [ "/bin/bash" ]

FROM base as test

ARG PROJECT_ROOT_DIRECTORY

COPY ${PROJECT_ROOT_DIRECTORY} /app/


RUN npm i

CMD ["npm","test"]
