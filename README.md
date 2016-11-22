
my-capabilities
===============

A web app to make spatial data products available to GIS users.

Local development
-----------------

    npm install
    npm run dev

A browser window should open at http://localhost:8080

To run as a Docker image
------------------------

For some reason or other.

    docker build -t my-capabilities . 
    docker run -t -p 8888:80 my-capabilities

Deployment to Elastic Beanstalk
-------------------------------

Configure the following environment variables:

    NODE_ENV = production 
    
    
