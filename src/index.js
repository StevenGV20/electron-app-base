"use strict";

//instanciando los objetos app y BrowserWindow
import { app, BrowserWindow } from "electron";
import devtools from "./devtools";

if (process.env.NODE_ENV == "development") {
  devtools();
}

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
    //titleBarStyle: "hidden",
    trafficLightPosition: { x: 730, y: 10 },
    titleBarOverlay: {
      color: "#2f3241",
      symbolColor: "#74b1be",
    },
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
  win.toggleDevTools();
});
