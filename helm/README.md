# OnlineCodeAnalyzer Helm Chart
 
This Helm chart deploys the OnlineCodeAnalyzer application to a Kubernetes cluster.
 
## Prerequisites
 
- Kubernetes 1.8+
- Helm 2.8+
 
## Installation
 
To install the OnlineCodeAnalyzer application, run the following command:
 
```sh
$ helm install my-onlinecodeanalyzer onlinecodeanalyzer
```

This will deploy the OnlineCodeAnalyzer application to your Kubernetes cluster.
 
## Configuration
The following table lists the configurable parameters of the OnlineCodeAnalyzer chart and their default values.
 
Parameter	Description	Default
replicaCount	Number of replicas to deploy	1
image.repository	Image repository to use	ksverchkov/onlinecodeanalyzer
image.tag	Image tag to use	latest
image.pullPolicy	Image pull policy	IfNotPresent
service.type	Type of service	ClusterIP
service.port	Port for the service	80
ingress.enabled	Whether to enable ingress	false
ingress.annotations	Annotations to be added to the ingress	{}
ingress.hosts[0].host	Hostname for the ingress	example.com
ingress.hosts[0].paths	Paths for the ingress	[]
resources.limits.cpu	CPU limit for the container	100m
resources.limits.memory	Memory limit for the container	128Mi
resources.requests.cpu	CPU request for the container	100m
resources.requests.memory	Memory request for the container	128Mi
serviceAccount.create	Create a new service account	true
serviceAccount.name	Name of the service account to use or create	default
podAnnotations	Annotations to be added to the pod	{}
nodeSelector	Node labels for pod assignment	{}
tolerations	Tolerations for pod assignment	[]
affinity	Affinity settings for pod assignment	{}
Specify each parameter using the --set key=value[,key=value] argument to helm install.
 
For example, to set the service type and port, use the following command:
 
```console
$ helm install onlinecodeanalyzer --set service.type=NodePort,service.port=8080 .
```
Or, you can use a values.yaml file to set the configuration values. An example values.yaml file is included in the chart's values.yaml file.
 
Deployment to Kubernetes and OpenShift
To deploy OnlineCodeAnalyzer on a Kubernetes or OpenShift cluster using the Helm chart, follow these steps:
 
Install Helm on your cluster, if it's not already installed. For more information, see the Helm documentation: https://helm.sh/docs/intro/install/
Clone the OnlineCodeAnalyzer repository: git clone https://github.com/ksverchkov/OnlineCodeAnalyzer
Change to the OnlineCodeAnalyzer directory: cd OnlineCodeAnalyzer
Edit the values.yaml file to customize the deployment settings, as needed.
Install the chart using the helm install command:
```console
$ helm install onlinecodeanalyzer .
```

Access the OnlineCodeAnalyzer application using the service's IP address or hostname.
By default, the chart deploys a single replica of the OnlineCodeAnalyzer application. If you need to scale the application, use the helm upgrade command to change the replicaCount parameter. 