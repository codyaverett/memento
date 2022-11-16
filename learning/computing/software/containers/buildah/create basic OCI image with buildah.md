---
name: Create Basic OCI Image with Buildah
created: 2022-10-21T14:59:22-05:00
updated: 2022-11-16T16:52:05-06:00
aliases: 
tags: 
---
# Create Basic OCI Image with Buildah

If you're looking to build Open Container Initiative (OCI) container images without a full container runtime or daemon installed, [Buildah](https://buildah.io/) is the perfect solution. Now, Buildah is an open source, Linux-based tool that can build Docker- and [Kubernetes](https://developers.redhat.com/topics/kubernetes)-compatible images, and is easy to incorporate into scripts and build pipelines. In addition, Buildah has overlap functionality with [Podman](https://podman.io/), [Skopeo](https://github.com/containers/skopeo), and [CRI-O](https://cri-o.io/).

Buildah has the ability to create a working [container](https://developers.redhat.com/topics/containers/) from scratch, but also from a pre-existing Dockerfile. Plus, with it not needing a daemon, you'll never have to worry about Docker daemon issues when building container images.

Let's cover some real-world examples to show how easy it is to get started with Buildah, and how easy it is to create a container image.

## Installing Buildah

If you're running [Red Hat Enterprise Linux](https://developers.redhat.com/products/rhel/overview) (RHEL) 8, follow the steps below. For Fedora users, be sure to replace `yum` with `dnf`:

$ yum -y install buildah

However, if you don't have Linux available, you can use [Buildah online with Katacoda](https://www.katacoda.com/courses/containers-without-docker/building-container-images-with-buildah).

## Basic Commands

To get to know Buildah, let's play around with some basic commands. The command `buildah --version` will output the current version of our Buildah install, and `buildah --help` will help if you get stuck.

For example, in order to pull a container image from a repository, use the `from` variable. For example, if your favorite Linux distribution is CentOS:

$ buildah from centos

After pulling the image and storing it on the host, list our current images by running `buildah images`. This behavior is similar to Podman and Docker, as many commands are cross-compatible. To get a list of our running containers, which are provisioned as soon as the image pull is completed, use `buildah containers`. For an example, see Figure 1.

[![The output of the command &quot;buildah containers&quot;, showing CONTAINER ID, BUILDER, IMAGE ID, IMAGE NAME, and CONTAINER #](https://developers.redhat.com/sites/default/files/styles/article_floated/public/blog/2020/08/Buildah-containers.png?itok=THXFKs3c "Buildah containers")](https://developers.redhat.com/sites/default/files/blog/2020/08/Buildah-containers.png)

Finally, since we've pulled and displayed a container, let's clean up and remove our running containers with `buildah rm -all`. Be sure to exercise caution, however, as Buildah has the ability to remove a running container while Docker does not.

## Building a Container

Time to get hands-on with Buildah and build an Apache web server that will run inside a container. To get things started, let's pull a CentOS base image and start working:

```shell
$ buildah from centos
```

You'll see the default image name as output in the console like `centos-working-container`, giving us the ability to run commands within the specified container. For our case, we'll be installing an [httpd](https://httpd.apache.org/docs/current/programs/httpd.html) package, which can be done using the following command:

```shell
$ buildah run centos-working-container yum install httpd -y
```

Once we've installed `httpd`, we can take our attention to creating a main page to be directed to on our web server, commonly known as an `index.html` file. To create a simple file without having to worry about formatting, use the `echo` command below:

```shell
$ echo "Hello from Red Hat" > index.html
```

In addition, after creating this new file, let's copy it into our current working container with the Buildah `copy` function. The default location for publicly accessible files is also included:

```shell
$ buildah copy centos-working-container index.html /var/www/html/index.html
```

To start this container, we must configure an entry point for a container, which is used to start `httpd` as the container begins and keep it in the foreground:

```shell
$ buildah config --entrypoint "/usr/sbin/httpd -DFOREGROUND" centos-working-container
```

Finally, let's `commit` our changes to the container, and prepare it to be pushed to any container registry you'd like (ex. [Docker and Quay.io](https://developers.redhat.com/blog/2019/02/21/podman-and-buildah-for-docker-users/)):

```shell
$ buildah commit centos-working-container redhat-website
```

Your `redhat-website` image is ready to [run with Podman](https://developers.redhat.com/blog/2019/08/14/best-practices-for-running-buildah-in-a-container/), or push to your registry of choice.

## Building with a Dockerfile

Another significant part of Buildah is the ability to build images using a Dockerfile, and the `build-using-dockerfile`, or `bud` command can do just that. Let's take an example Dockerfile as input, and output an OCI image:

```dockerfile
# **CoreOS Base**
FROM fedora:latest
# **Install httpd**
RUN echo "Installing httpd"; yum -y install httpd
# **Expose the default httpd port 80**
EXPOSE 80
# **Run httpd**
CMD ["/usr/sbin/httpd", "-DFOREGROUND"]
```

Once we save this file as `Dockerfile` in our local directory, we can use the `bud` command to build the image:

```shell
$ buildah bud -t fedora-httpd
```

To double-check our progress, let's run `buildah images` and ensure we can see our new `fedora-httpd` image resting in our localhost repository. Now, feel free to again [run the image with Podman](https://developers.redhat.com/blog/2019/08/14/best-practices-for-running-buildah-in-a-container/), or push it to your favorite registry.
