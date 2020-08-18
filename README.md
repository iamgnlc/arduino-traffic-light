# Arduino Traffic Light

![version](https://img.shields.io/github/package-json/v/iamgnlc/arduino-traffic-light)
![license](https://img.shields.io/badge/dynamic/json?color=darkgrey&label=license&query=license&url=https%3A%2F%2Fraw.githubusercontent.com%2Fiamgnlc%2Farduino-traffic-light%2Fmaster%2Fpackage.json)
![last commit](https://img.shields.io/github/last-commit/iamgnlc/arduino-traffic-light)

Arduino client-server app interaction in javascript.

## Install dependencies

```sh
$ yarn install
```

## Start

Start both client and server:

```sh
$ yarn start
```

### Server

Server accepts incoming requests on port 3020.

Example requests:

```
http://localhost:3020/color/red/

http://localhost:3020/set/blink/250/

http://localhost:3020/info/
```

### Client

React app available `http://localhost:3021/`

The client will automatically send requests to the server at customizable interval.

## Authors

- **Gianluca Agnocchetti** - _Client, Server_ -
  [iamgnlc](https://github.com/iamgnlc)

---

![author](https://img.shields.io/badge/author-iamgnlc-blueviolet)
