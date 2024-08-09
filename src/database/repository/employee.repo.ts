import DB from "..";
import { Employee } from "../model/employee";

export default class EmployeeRepo {
  public employee = DB.Employee;

  /**
   * add/update a employee
   * @param {Models.Employee} employee The employee
   * @returns {Promise<Models.Employee>} The employee
   */
  public async addOrUpdate(employee: Employee): Promise<Employee | null> {
    const employeeExists = await this.employee.findOne({
      where: { id: employee.id },
    });
    if (!employeeExists) {
      return await this.employee.create(employee);
    } else {
      await this.employee.update(
        { ...employee },
        { where: { id: employee.id } }
      );
    }
    return employee;
  }

  /**
   * Deletes a employee by id
   * @param {string} id The employee id
   * @return {Promise<string>} The id of the deleted employee
   */
  public async remove(employee: Employee): Promise<any> {
    return await this.employee.destroy({ where: { id: employee.id } });
  }

  /**
   * Gets a employee by id
   * @param {string} id The employee id
   * @returns {Promise<Models.Employee>} The employee
   */
  public async findEmployeeById(id: string): Promise<Employee | null> {
    return await this.employee.findOne({ where: { id: id } });
  }
  /**
   * Gets a list of Employee
   * @returns {Promise<Models.Employee[]>} A list of employee
   */
  public async findAllEmployeeList(): Promise<Employee[]> {
    return this.employee.findAll({ where: { status: "Active" } });
  }
}
