FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod ./
COPY go.sum* ./
RUN go mod download

COPY . .
RUN go build -buildvcs=false -o wcms-api-server .

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/wcms-api-server .
COPY --from=builder /app/.env .

EXPOSE 8080
CMD ["./wcms-api-server"]
