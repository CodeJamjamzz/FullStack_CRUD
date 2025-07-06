import { Fragment , useState } from "react";

interface TableListProps {
   onOpen: (str:string, client: any) => void;
    searchTerm: string;
    setTableData: (data: any[]) => void;
    handleDelete: (id: number) => Promise<void>;
    tableData: any[];
}

const TableList : React.FC<TableListProps> = ({onOpen, searchTerm, tableData, setTableData, handleDelete}) => {
  const [error, setError] = useState<string | null>(null); // dont mind for now 

  const filteredData = tableData.filter(student => {
    return student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           student.program.toLowerCase().includes(searchTerm.toLowerCase()) ||
           student.department.toLowerCase().includes(searchTerm.toLowerCase());
  })

  return (
    <Fragment>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="overflow-x-auto mt-6 mx-10">
        <table className="table table-auto border-collapse w-full">
          {/* head */}
          <thead className="px-2 py-2">
            <tr className="font-bold text-white">
              <th >#</th>
              <th>Name</th>
              <th>Program</th>
              <th>YearLevel</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student, index) => (
              <tr key={index} className="hover px-2 py-1">
                <td >{index + 1}</td>
                <td >{student.name}</td>
                <td >{student.program}</td>
                <td >{student.yearlevel} Year</td>
                <td >{student.department}</td>
                <td >
                  <button className="btn btn-sm rounded-full bg-blue-500 text-white w-20">
                    {student.isactive ? "Activate" : "Deactivate" }
                  </button>
                </td>
                <td >
                  <button className="btn btn-sm rounded-full bg-green-400 text-white " onClick={() => onOpen('edit', student)}>
                    Update
                  </button>
                </td>
                <td >
                  <button className="btn btn-sm rounded-full bg-red-500 text-white " onClick={() => handleDelete(student.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default TableList;
