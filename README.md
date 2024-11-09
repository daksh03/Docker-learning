# Important Docker Commands

## Basic Commands

- **Check Docker version**:  
  `docker --version`

- **List running containers**:  
  `docker ps`

- **List all containers (including stopped ones)**:  
  `docker ps -a`

- **List Docker images**:  
  `docker images`

- **Pull an image from Docker Hub**:  
  `docker pull <image_name>`

- **Build an image from a Dockerfile**:  
  `docker build -t <image_name>:<tag> .`

- **Build an image from a Dockerfile with Arguments**:  
  `docker build -t <image_name>:<tag> --build-arg <argument>`

- **Run a container**:  
  `docker run <options> <image_name>`

  - **Run a container with Bind Mount**:  
    `docker run -v /path/on/host:/path/in/container <image_name>`

  - **Run a container with Multiple Bind Mounts**:  
    `docker run -v /path/on/host1:/path/in/container1 -v /path/on/host2:/path/in/container2 <image_name>`

  - **Run a container with Named Volume**:  
    `docker run -v <volume_name>:/path/in/container <image_name>`

  - **Run a container with environment variables**:  
    `docker run --env-file ./.env <image_name>`

- **To go inside the container**:  
  `docker exec -it <container_name> bash`

- **Stop a running container**:  
  `docker stop <container_id>`

- **Remove a container**:  
  `docker rm <container_id>`

- **Remove an image**:  
  `docker rmi <image_name>`

## Managing Volumes

- **Create a volume**:  
  `docker volume create <volume_name>`

- **List volumes**:  
  `docker volume ls`

- **Remove a volume**:  
  `docker volume rm <volume_name>`

## Networking

**Containers in the same Network can connect with each other**

- **List networks**:  
  `docker network ls`

- **Create a network**:  
  `docker network create <network_name>`

- **Connect a container to a network**:  
  `docker network connect <network_name> <container_id>`

## Miscellaneous

- **View container logs**:  
  `docker logs <container_id>`

- **Execute a command in a running container**:  
  `docker exec -it <container_id> <command>`

- **Remove all stopped containers**:  
  `docker container prune`

- **Remove all unused images**:  
  `docker image prune`

- **Display system-wide information**:  
  `docker info`

## Helpful Tips

- **Use `-d` to run containers in detached mode**:  
  `docker run -d <image_name>`

- **Use `-v` to bind mount a host directory**:  
  `docker run -v /path/on/host:/path/in/container <image_name>`

- **Use `-p` to publish container ports**:  
  `docker run -p <host_port>:<container_port> <image_name>`

---

# Important Kubectl Commands

## Basic Commands

- **Check cluster information**:  
  `kubectl cluster-info`

- **Get nodes in the cluster**:  
  `kubectl get nodes`

- **Get all pods in a namespace**:  
  `kubectl get pods -n <namespace>`

- **Get services**:  
  `kubectl get svc`

- **Describe a pod**:  
  `kubectl describe pod <pod_name>`

- **View logs of a pod**:  
  `kubectl logs <pod_name>`

- **Execute a command in a running pod**:  
  `kubectl exec -it <pod_name> -- <command>`

- **Delete a pod**:  
  `kubectl delete pod <pod_name>`

## Managing Deployments

- **Create a deployment**:  
  `kubectl create deployment <deployment_name> --image=<image_name>`

- **Get deployments**:  
  `kubectl get deployments`

- **Scale a deployment**:  
  `kubectl scale deployment <deployment_name> --replicas=<num_replicas>`

- **Update deployment image**:  
  `kubectl set image deployment/<deployment_name> <container_name>=<new_image>`

- **Delete a deployment**:  
  `kubectl delete deployment <deployment_name>`

## Managing Services

- **Expose a deployment as a service**:  
  `kubectl expose deployment <deployment_name> --type=<service_type> --port=<port>`

- **Get services**:  
  `kubectl get services`

- **Delete a service**:  
  `kubectl delete svc <service_name>`

## Namespaces

- **List namespaces**:  
  `kubectl get namespaces`

- **Create a namespace**:  
  `kubectl create namespace <namespace_name>`

- **Delete a namespace**:  
  `kubectl delete namespace <namespace_name>`

## ConfigMaps and Secrets

- **Create a ConfigMap**:  
  `kubectl create configmap <configmap_name> --from-literal=<key>=<value>`

- **Create a Secret**:  
  `kubectl create secret generic <secret_name> --from-literal=<key>=<value>`

- **Get ConfigMaps**:  
  `kubectl get configmaps`

- **Get Secrets**:  
  `kubectl get secrets`

- **Describe a ConfigMap**:  
  `kubectl describe configmap <configmap_name>`

- **Describe a Secret**:  
  `kubectl describe secret <secret_name>`

- **Delete a ConfigMap**:  
  `kubectl delete configmap <configmap_name>`

- **Delete a Secret**:  
  `kubectl delete secret <secret_name>`
