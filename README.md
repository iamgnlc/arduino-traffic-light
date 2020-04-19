# Arduino Traffic Ligh Control

Arduino client-server interaction in javascript.

## Install dependencies

```
$ yarn install
```

## Start

Start both client and server:

```
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
