import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface Employee {
  id: string;
  email: string;
  confirmStatus: string;
  department: string;
  designation: string;
  capablity: string;
  employeeId: string;
  firstname: string;
  lastname: string;
  status: string;
  reportingTo: string;
  joiningDate: string;
  confirmationDate: string;
  relievingDate?: string;
}

export type EmployeeCreationAttributes = Optional<Employee, "id">;
// These are all the attributes in the User model

export class EmployeeModel
  extends Model<Employee, EmployeeCreationAttributes>
  implements Employee
{
  public id: string;
  public email: string;
  public confirmStatus: string;
  public department: string;
  public designation: string;
  public capablity: string;
  public employeeId: string;
  public firstname: string;
  public lastname: string;
  public status: string;
  public reportingTo: string;
  public joiningDate: string;
  public confirmationDate: string;
  public relievingDate: string;
}

export default function (sequelize: Sequelize): typeof EmployeeModel {
  EmployeeModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey: true,
      },
      firstname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      confirmStatus: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      department: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      designation: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      capablity: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      employeeId: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      reportingTo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      joiningDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      confirmationDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      relievingDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "employees",
      indexes: [
        {
          unique: true,
          fields: ["email"],
        },
      ],
      sequelize,
    }
  );

  return EmployeeModel;
}
