---
name: Ubi Images
created: 2023-05-27T05:49:55-05:00
updated: 2023-06-08T19:03:43-05:00
aliases: 
tags: 
---
# Ubi Images

## Example Minimal Node 20

```dockerfile
# Use Red Hat UBI Minimal as the base image
FROM registry.access.redhat.com/ubi8/ubi-minimal AS builder

# Install dependencies
RUN microdnf install -y curl bash ca-certificates tar gzip && \
    microdnf clean all

# Install nvm
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=v20.2.0

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash && \
    source "${NVM_DIR}/nvm.sh" && \
    nvm install ${NODE_VERSION} && \
    nvm alias default ${NODE_VERSION} && \
    nvm use default

# Set the working directory
WORKDIR /app

# Copy the application code
#COPY ./package.json /app/package.json

# Run npm install to install dependencies
#RUN npm install

# Specify the default command to run when the container starts
#CMD [ "sh" ]

# Stage 2: Create the smaller final image
FROM registry.access.redhat.com/ubi8/ubi-minimal

# Set the working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder "/root/.nvm/versions/node/v20.2.0/bin/node" /usr/bin/node

# Specify the default command to run when the container starts
CMD ["bash", "-c", "source /root/.bashrc && sh"]
```

## Example Minimal Python 3.11

```dockerfile
# Stage 1: Build CPython
FROM registry.access.redhat.com/ubi9/ubi-minimal AS builder

ARG PYTHON_VERSION=3.11

# Install build dependencies
RUN microdnf install -y git gcc make openssl-devel bzip2-devel libffi-devel zlib-devel xz-devel findutils

# Clone CPython source code
RUN git clone --depth 1 --branch ${PYTHON_VERSION} https://github.com/python/cpython.git


# Build CPython
RUN cd cpython && \
    ./configure --enable-optimizations --prefix=/opt/python3 && \
    make -j4 && \
    make install

# Stage 2: Create minimal CPython image
FROM registry.access.redhat.com/ubi9/ubi-micro

# Set the working directory
WORKDIR /app

# Copy built CPython binaries from the builder stage
COPY --from=builder /opt/python3/bin/python3 /usr/bin/
COPY --from=builder /opt/python3 /opt/python3

# Specify the default command to run when the container starts
CMD ["python3"]
```