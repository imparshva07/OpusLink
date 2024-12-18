import { Client } from "@elastic/elasticsearch";

const client = new Client({
  node: process.env.ELASTICSEARCH_HOST || "http://localhost:9200", 
  auth: {
    username: "elastic",
    password: "PsyttKer",
  },
});

export default client;
