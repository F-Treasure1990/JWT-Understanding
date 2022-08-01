import { Express } from "express";
import { requireUser } from "../middleware/requireUser";
import { createSessionHandler, deleteSessionHandler, getSessionHander } from "./controllers/session.controller";

function routes(app: Express) {
  //login 
  app.post("/api/session", createSessionHandler)

  app.get("/api/session", requireUser, getSessionHander)

  app.delete("/api/session",requireUser, deleteSessionHandler)


  //get the current session
  //lougout
}

export default routes;
