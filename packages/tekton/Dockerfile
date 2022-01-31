FROM golang as builder
ENV TKN_VERSION v0.21.0
WORKDIR /tkncli
RUN apk add git
RUN apk add make
RUN apk add build-base
RUN git clone https://github.com/tektoncd/cli . && \
    git checkout release-$TKN_VERSION && \
    GO111MODULE=on make bin/tkn 


FROM gcr.io/distroless/base
COPY --from=builder /tkncli/bin/tkn /
CMD ["/tkn"]
