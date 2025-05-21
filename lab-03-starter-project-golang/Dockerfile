FROM golang:1.22 AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o fizzbuzz

FROM gcr.io/distroless/static:nonroot
WORKDIR /app
COPY --from=builder /app/fizzbuzz .
EXPOSE 8080
USER nonroot
ENTRYPOINT ["/app/fizzbuzz"]
CMD ["serve", "--port", "8080"]
