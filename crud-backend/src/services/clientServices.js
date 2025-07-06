// the logic of the backend 
import { query } from "../db.js"

export const getStudent = async () => {
    const {rows} = await query("Select * from tblStudent")
    return rows;
}

export const createStudent = async (student) => {
    const {name, program, yearLevel, department, isActive} = student;
    const {rows} = await query (`
        Insert into tblStudent (name, program, yearLevel, department, isActive)
        values ($1, $2, $3, $4, $5) returning *` , 
        [name, program, yearLevel, department, isActive])
    
    return rows[0];
}

export const updateStudent = async (student, studentId) => {
    const {name, program, yearLevel, department, isActive} = student;
    const {rows} = await query(`
        Update tblStudent set name = $1, program = $2, yearLevel = $3, department = $4, 
        isActive = $5 where id = $6 returning *` , 
        [name, program, yearLevel, department, isActive, studentId] )

    return rows[0];
}

export const deleteStudent = async (studentId) => {
    const {rowCount} = await query(`
        Delete from tblStudent where id = $1 returning *` , 
        [studentId] )
    console.log("Deleted rows:", rowCount);
    return rowCount > 0;
}

export const searchClients = async (searchTerm) => {
    const { rows } = await query(
      `SELECT * FROM tblStudent WHERE name ILIKE $1 OR program ILIKE $1`,
      [`%${searchTerm}%`]
    );
    return rows;
};