import userRoutes from "./userRoutes.js";
// import pgRoutes from "./pgRoutes.js";
// import roomRoutes from "./roomRoutes.js";
// import residentRoutes from "./residentRoutes.js";
// import paymentRoutes from "./paymentRoutes.js";
// import maintenanceRoutes from "./maintenanceRoutes.js";

// import authMiddleware from "../middlewares/authMiddleware.js";

export const initializeRoutes = (app) => {
  // Register routes
  app.use("/api/users", userRoutes); // Users routes
  // app.use("/api/pgs", authMiddleware, pgRoutes); // Register PG routes with authentication middleware
  // app.use("/api/rooms", authMiddleware, roomRoutes); // Register room-related routes with auth middleware
  // app.use("/api/residents", authMiddleware, residentRoutes); // Register resident-related routes with auth middleware
  // app.use("/api/payments", authMiddleware, paymentRoutes); // Register payment-related routes with auth middleware
  // app.use("/api/maintenance", authMiddleware, maintenanceRoutes); // Register maintenance routes with auth middleware

  // Catch-all for undefined routes
  app.use((req, res) => {
    res.status(404).json({
      message: "Route Not Found",
      path: req.path,
    });
  });
};
