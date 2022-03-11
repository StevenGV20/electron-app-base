"use strict";

//instanciando los objetos app y BrowserWindow
const { app, BrowserWindow } = require("electron");

//imprimiendo un mensaje en la consola antes de salir
app.on("before-quit", () => {
  console.log("Saliendo...");
});

//Ejecutando ordenes cuando la aplicacion esta lista
app.on("ready", () => {
  //creando una ventana
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Hola Mundo",
    center: true,
    maximizable: false,
    show: false,
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("move", () => {
    const position = win.getPosition();
    //console.log(`la posicion de la ventana es ${position}`);
  });

  //detectando el cierre de la ventana para cerrar el aplicativo
  win.on("closed", () => {
    win = null;
    app.quit();
  });

  win.loadURL(`file://${__dirname}/renderer/index.html`);
});
