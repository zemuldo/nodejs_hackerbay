[![Build Status](https://travis-ci.org/zemuldo/nodejs_hackerbay.svg?branch=master)](https://travis-ci.org/zemuldo/nodejs_hackerbay)

# nodejs_hackerbay

This Nodejs Web Application - Implemenets image optimization, json webtoken authentication, sha512 password hashing, istanbull-mocha test reporting, dockerizing nodejs web app and travis ci integration

## Usage

Clone the applocation

```unix
git clone git@github.com:zemuldo/nodejs_hackerbay.git

```

## *Please look at /conf/index.js to see what environmental varaibles are needed by this app*

The endpoints available in this application are 

/signup
/login
/jsonpatch
/image-thumbnail/:width/:height/:url(*)

## POST Signup
```javascript
    /signup
```
HEADERS
```javascript
    Content-Typea pplication/json
```
BODY

```javascript
    {
        "userName":"hackerbay",
        "password":"abc123"
    }

```

Response 

```javascript
{
    "n": 1,
    "ok": 1
}
```

## POST Login

```javascript
        /login
```

HEADERS

```javascript
    Content-Typea pplication/json
```

BODY

```

        {
        "userName":"hackerbay",
        "password":"abc123"
        }
```

Response

```javascript
        {
            "state": "success",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImhhY2tlcmJheSIsImlhdCI6MTUyNDA3NTMyNX0.1Pf1gywMnWsJ10OR8SFK1oxj4MizhBM_vtNCNL4SwCc"
        }

```

The token obtained in login has to be used to access the all other secure endpints below.
The token can be sent in headers as ether x-access-token,bearer-token,auth-token or in request body as token

## POST Create a JSON Doc

```javascript
    /jsonpatch
```

HEADERS

```javascript
    auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVyZXJlcmVyIiwiaWF0IjoxNTIzOTIzNDYyfQ.wVTwpAbpS2SGqEmH-e2ExmIK5p9V0Rfs0x6VjuEscMY
```

```javascript
    Content-Typea pplication/json
```
BODY

```javascript

Public
 {
    "document": {
        "name": "Test User",
        "userName": "test",
        "age": 20,
        "frameworks": {
            "javascript": {
                
                    "nodejs": {
                        "project": [
                            "project 1",
                            "project 2",
                            "project 3",
                            "project 4",
                            "project 5",
                            "project 6"
                        ],
                        "experience": "2 year"
                    }
                ,
                
                    "reactjs": {
                        "project": [
                            "project 1",
                            "project 2",
                            "project 3"
                        ],
                        "experience": "1 year"
                    }
                
            },
            "python": 
                {
                    "django": {
                        "project": [
                            "project 1"
                        ],
                        "experience": "3 months"
                    }
                }
            
        },
        "hobbies": [
            "chess",
            "code"
        ]
    },
    "patch": [
        {
            "op": "replace",
            "path": "/name",
            "value": "Hackerbay IO"
        },
        {
            "op": "add",
            "path": "/frameworks/javascript/reactjs/stars",
            "value": 500
        },
        {
            "op": "remove",
            "path": "/frameworks/python/django"
        }
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVyZXJlcmVyIiwiaWF0IjoxNTIzOTI1MTU4fQ.V4GoyBt9H3Amz0jgn15HVo3nX5HVtGlH_vKUQ8nDDE4"
}
```

## GET Get Thumnail

This endpont takes an image url, width and height, downnloads the image and resizes the sends back the optimized image

```javascript
    /image-thumbnail/50/50/https://upload.wikimedia.org/wikipedia/commons/d/d9/HackerBay_Logo.png
```

HEADERS

```javascript
    auth-token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImVyZXJlcmVyIiwiaWF0IjoxNTIzOTIzNDYyfQ.wVTwpAbpS2SGqEmH-e2ExmIK5p9V0Rfs0x6VjuEscMY
```

This endpoint returns an image optimized to the what is sent

## All secured endpoints will return 401 when accessed without an signed token

# Docker, Docker Compose

This repo has a dockerfile and a docker compose yml that build with all required assets for the app to deploy.
Please refer to docker or docker compose docs for usage.