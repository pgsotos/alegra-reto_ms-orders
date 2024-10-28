FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME=pgsotos
ENV MONGO_INITDB_ROOT_PASSWORD=alegrareto

CMD ["mongod", "--auth", "--bind_ip", "0.0.0.0"]
