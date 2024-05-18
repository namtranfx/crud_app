FROM postgres:latest
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD natragent
ENV POSTGRES_DB postgres
EXPOSE 5432
ADD /db/init.sql /docker-entrypoint-initdb.d/