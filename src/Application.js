import express from 'express';
import PersonController from './Controller/PersonController';

class expressApplication {
  constructor(express, port) {
    this.express = express();
    this.server = this.express.listen(port);
  }

  get serverAddress() {
    return this.server.address().address
  }

  get serverPort() {
    return this.server.address().port
  }

  showAddress = () => {
    console.log("server start at:", this.serverAddress, this.serverPort)
  }

  startCrossOrigin = () => {
    this.express.all("*", (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Methods', '*');
      res.header('Content-Type', 'application/json;charset=utf-8');
      next();
    })
  }

  init() {
    this.startCrossOrigin();
    this.showAddress();
    new PersonController(this.express).init(); //激活服务
  }

}

new expressApplication(express, 8081).init(); //绑定主机

