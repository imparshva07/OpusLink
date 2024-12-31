OpusLink

Empowering freelancers and clients worldwide with seamless project collaboration.

Setup Requirements

Ensure the following are installed on your system before proceeding:


1. Node.js
2. Mongoose
3. Redis
4. Docker
5. Elasticsearch

Setup Instructions:

1. Start the Redis Server
Run the command redis-stack-server in a terminal to start the Redis server.

2. Start Elasticsearch
If you prefer using cURL, download and run Elasticsearch locally by executing:
curl -fsSL https://elastic.co/start-local | sh


If the above method does not work, follow these steps:


Create a setup folder using mkdir elasticsearch-setup and navigate into it with cd elasticsearch-setup.

Create a docker-compose.yml file with the following content:

    version: '3.8'
    services:
      elasticsearch:
        image: docker.elastic.co/elasticsearch/elasticsearch:8.12.0
        container_name: elasticsearch
        environment:
          - discovery.type=single-node
          - xpack.security.enabled=false
          - ES_JAVA_OPTS=-Xms1g -Xmx1g
        ports:
          - '9200:9200'
          - '9300:9300'
        volumes:
          - esdata:/usr/share/elasticsearch/data
    
      kibana:
        image: docker.elastic.co/kibana/kibana:8.12.0
        container_name: kibana
        environment:
          - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
        ports:
          - '5601:5601'
        depends_on:
          - elasticsearch
    
    volumes:
      esdata:
        driver: local
Verify the docker-compose.yml file using cat docker-compose.yml.


Start Elasticsearch and Kibana by running docker-compose up -d.


Open your browser and verify Elasticsearch at http://localhost:9200 and Kibana at http://localhost:5601.


After use, stop and clean up with docker-compose down.


*Getting Started*


Open two terminals in the root directory of the project.


In the first terminal, navigate to the frontend folder using cd frontend, then run npm install followed by npm run dev.

In the second terminal, navigate to the backend folder using cd backend, then run npm install followed by npm start.

Access the application in your browser at http://localhost:5173/.
