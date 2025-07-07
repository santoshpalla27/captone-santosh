FROM golang:1.22-alpine

WORKDIR /app
COPY . .
RUN go build -o notification-service

EXPOSE 6000
CMD ["./notification-service"]