# System configuration
FROM centos:latest AS system-setup
RUN cd /etc/yum.repos.d/ \
    && sed -i 's/mirrorlist/#mirrorlist/g' /etc/yum.repos.d/CentOS-* \
    && sed -i 's|#baseurl=http://mirror.centos.org|baseurl=http://vault.centos.org|g' /etc/yum.repos.d/CentOS-*
RUN yum -y update && yum -y install curl




# Node installation
FROM system-setup AS node-setup
RUN curl -sL https://rpm.nodesource.com/setup_16.x | bash -
RUN yum -y install nodejs httpd

# # Application build
FROM node-setup AS app-build
WORKDIR /crud-app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

# Setup application
FROM node-setup AS app-setup
WORKDIR /var/www/html
COPY --from=app-build /crud-app/dist/angular_nest_postgres_crud/ .
CMD apachectl -DFOREGROUND
