# Dockerfile

FROM python:3.10
# setup environment variable
ENV DockerHOME=/opt/app

# copy source and install dependencies
RUN mkdir -p $DockerHOME
WORKDIR $DockerHOME
COPY requirements.txt $DockerHOME/
COPY . $DockerHOME
RUN pip install -r requirements.txt

# start server
EXPOSE 8000
# start server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]