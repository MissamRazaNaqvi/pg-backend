import cron from "node-cron";
import { generateMonthlyFees } from "./controllers/feesController.js";

// Schedule Cron Job
export const setupCronJobs = () => {
  cron.schedule("0 0 1 * *", async () => {
    console.log("Running monthly fee record generation...");
    await generateMonthlyFees();
  });
};
// export const setupCronJobs = () => {
//   cron.schedule("*/2 * * * *", async () => {
//     console.log("Running fee record generation every 2 minutes...");
//     await generateMonthlyFees();
//   });
// };
