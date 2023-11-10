FROM nginx:latest
LABEL authors="Wellington Vieira"

COPY ./dist/siscarb-app /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
