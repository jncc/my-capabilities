
my-capabilities
===============

An overly-simple WMS GetCapabilities server. 

To run as a Docker image:

    docker build -t my-capabilities . 
    docker run -t -p 8888:80 my-capabilities

Deployment to Elastic Beanstalk
-------------------------------

Configure the following environment variables:

    NODE_ENV = production 
    
    
