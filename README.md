# Grey Market Labs

## Quick Start

### Prerequisites 

- Docker/docker-compose 

### Running the application

From the root directory:

```bash
$ docker-compose -f "docker-compose.prod.yml" up -d 
```

The server will be available at `localhost:3000`

## API Spec

### POST -> /create

See [./src/app/core/profile/profile.schema.js](./src/app/core/profile/profile.schema.js) for body spec.

#### Example

```bash
$ curl -X POST http://localhost:3000/api/create \
   -H 'Content-Type: application/json' \
   -d '{"personaID":1,"first":"john", "last":"smith", "interests" : ["golf"], "location" : {"latitude" : 39.7456, "longitude" : -97.0892} }'

```

### GET -> /find/:personaID

#### Example

```bash
curl -X POST http://localhost:3000/api/find/1
```