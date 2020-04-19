# Arduino LED Control

Arduino client-server interaction in javascript.

## Install dependencies

```
$ yarn install
```

## Start

```
$ yarn start
```

### Server

Server accepts incoming requests on port 3020.

Example requests:

```
http://localhost:3020/danger/on/

http://localhost:3020/warning/off/

http://localhost:3020/success/blink/250/

http://localhost:3020/success/stop/
```

### Client

React app available `http://localhost:3021/`

## Authors

- **Gianluca Agnocchetti** - _Client, Server_ -
  [iamgnlc](https://github.com/iamgnlc)
