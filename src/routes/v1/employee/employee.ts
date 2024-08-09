import express from "express";
import employeeRepo from "../../../database/repository/employee.repo";
import logger from "../../../core/logger";
import { Employee } from "../../../database/model/employee";

const router = express.Router();
const employee = new employeeRepo();

router.get("/", async (req: any, res: any) => {
  const { id } = req.query;
  try {
    const response = await employee.findEmployeeById(id);
    if (!response) {
      return res
        .status(404)
        .send({ message: `Employee not found for id - ${id}`, data: [] });
    }
    return res.send({
      message: "Employee retrieved successfully",
      ...response,
    });
  } catch (err) {
    logger.error("Error retrieving employee:", err);
    return res
      .status(500)
      .send({ error: "An error occurred while retrieving the employee" });
  }
});

router.post("/", async (req: any, res: any) => {
  const employeeData = req.body as unknown as Employee;
  try {
    const response = await employee.addOrUpdate(employeeData);
    return res.json({
      message: "Employee updated successfully",
      data: response,
    });
  } catch (err: any) {
    logger.error(
      `Error while update/insert employee for this id - ${employeeData.id}`
    );
    return res.status(500).send({
      error: `An error occurred while updating the employee: ${err.message}`,
    });
  }
});

router.delete("/", async (req: any, res: any) => {
  const { id } = req.query;
  const responseFormat = {
    message: "",
    data: [],
  };
  try {
    const response = await employee.remove(id);
    if (!response) {
      responseFormat.message = `Employee not found for id - ${id}`;
      responseFormat.data = [];
    }
    responseFormat.message = `Employee deleted successfully`;
    responseFormat.data = response;
    return res.json({
      message: responseFormat.message,
      data: responseFormat.data,
    });
  } catch (err: any) {
    logger.error(`Error while deleting employee for this id - ${id}`);
    return res.status(500).send({
      error: `An error occurred while deleting the employee: ${err.message}`,
    });
  }
});

export default router;
