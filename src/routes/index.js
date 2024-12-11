import userRoutes from "./userRoutes.js";
import pgRoutes from "./pgRoutes.js";
import roomRoutes from "./roomRoutes.js";
import residentRoutes from "./residentRoutes.js";
// import paymentRoutes from "./paymentRoutes.js";
// import maintenanceRoutes from "./maintenanceRoutes.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

export const initializeRoutes = (app) => {
  app.use("/api/auth", userRoutes);
  app.use("/api/pgs", authMiddleware, pgRoutes);
  app.use("/api/rooms", authMiddleware, roomRoutes);
  app.use("/api/residents", authMiddleware, residentRoutes);
  // app.use("/api/payments", authMiddleware, paymentRoutes);
  // app.use("/api/maintenance", authMiddleware, maintenanceRoutes);

  // Catch-all for undefined routes
  app.use((req, res) => {
    res.status(404).json({
      message: "Route Not Found",
      path: req.path,
    });
  });
};
