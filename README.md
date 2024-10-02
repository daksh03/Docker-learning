# Important Docker Commands

## Basic Commands

- **Check Docker version**:
  docker --version

- **List running containers**:
  docker ps

- **List all containers (including stopped ones)**:
  docker ps -a

- **List Docker images**:
  docker images

- **Pull an image from Docker Hub**:
  docker pull <image_name>

- **Build an image from a Dockerfile**:
  docker build -t <image_name>:<tag> .

- **Build an image from a Dockerfile with Arguments**:
  docker build -t <image_name>:<tag> --build-arg <argument (For ex.PORT=50>

- **Run a container**:
  docker run <options> <image_name>

  - **Run a container with Bind Mount**:
  docker run -v /path/on/host:/path/in/container <image_name>

  - **Run a container with Multiple Bind Mount**:
docker run -v /path/on/host1:/path/in/container1 -v /path/on/host2:/path/in/container2 <image_name>

 - **Run a container with Named Volume**:
docker run -v <volume_name>:/path/in/container <image_name>

 - **Run a container with environment variables**:
docker run --env-file ./.env <image_name>

- **Stop a running container**:
  docker stop <container_id>

- **Remove a container**:
  docker rm <container_id>

- **Remove an image**:
  docker rmi <image_name>

## Managing Volumes

- **Create a volume**:
  docker volume create <volume_name>

- **List volumes**:
  docker volume ls

- **Remove a volume**:
  docker volume rm <volume_name>

## Networking

- **List networks**:
  docker network ls

- **Create a network**:
  docker network create <network_name>

- **Connect a container to a network**:
  docker network connect <network_name> <container_id>

## Miscellaneous

- **View container logs**:
  docker logs <container_id>

- **Execute a command in a running container**:
  docker exec -it <container_id> <command>

- **Remove all stopped containers**:
  docker container prune

- **Remove all unused images**:
  docker image prune

- **Display system-wide information**:
  docker info

## Helpful Tips

- **Use `-d` to run containers in detached mode**:
  docker run -d <image_name>

- **Use `-v` to bind mount a host directory**:
  docker run -v /path/on/host:/path/in/container <image_name>

- **Use `-p` to publish container ports**:
  docker run -p <host_port>:<container_port> <image_name>
