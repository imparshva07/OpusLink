Opuslink

Empowering freelancers and clients worldwide with seamless project collaboration.

Setup:

Please make sure you have Node.js, Mongoose, Redis, Docker & Elasticsearch installed.

Before running the project,

Please run below commands in separate terminals:

To run the redis server,
1. redis-stack-server

To download and run Elasticsearch locally open Docker Desktop on your machine and run below in the terminal, (Please refer here: https://www.elastic.co/downloads/elasticsearch)
2. curl -fsSL https://elastic.co/start-local | sh

If elasticsearch with curl doesn't work, please follow below steps:
''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
Step 1:
mkdir elasticsearch-setup
cd elasticsearch-setup

Step 2:
echo "version: '3.8'
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
    driver: local" > docker-compose.yml


Step 3:
Verify:
cat docker-compose.yml


Step 4:
docker-compose up -d


Step 5:
Verify in browser:
Elastic Search:
http://localhost:9200

Kibana:
http://localhost:5601


Step 6:
After done stop and clean:
docker-compose down

''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''


Getting Started

1. Open two new separate terminals in the root folder of the project and go to path "cd frontend" and "cd backend"
2. In frontend path, Please run "npm install" and then "npm run dev"
3. In backend path, Please run "npm install" and then "npm start"

open http://localhost:5173/ in your browser.