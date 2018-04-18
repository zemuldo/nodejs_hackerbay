[![Build Status](https://travis-ci.org/zemuldo/nodejs_hackerbay.svg?branch=master)](https://travis-ci.org/zemuldo/nodejs_hackerbay)

# nodejs_hackerbay

This Nodejs Web Application - Implemenets image optimization, json webtoken authentication, sha512 password hashing, istanbull-mocha test reporting, dockerizing nodejs web app and travis ci integration

## Usage

Clone the applocation

```unix
git clone git@github.com:zemuldo/nodejs_hackerbay.git

```

The endpoints available in this application are 

/signup
/login
/jsonpatch
/image-thumbnail/:width/:height/:url(*)

POST Signup
```javascript
    /signup
```
HEADERS
```javascript
    Content-Typeapplication/json
```
BODY

```javascript
    {
        "userName":"hackerbay",
        "password":"abc123"
    }

```

