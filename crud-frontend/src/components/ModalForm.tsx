import { Fragment } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";

interface ModalFormProps {
  isOpen: boolean;
  mode: string;
  onClose: () => void;
  OnSubmit: (data: any) => Promise<void>;
  studentData: any;
}

const ModalForm: React.FC<ModalFormProps> = ({
  isOpen,
  mode,
  onClose,
  OnSubmit,  
  studentData, // Assuming studentData is passed for edit mode
}: ModalFormProps) => {
  const [name, setName] = useState(""); // State for Name
  const [program, setProgram] = useState(""); // State for Program
  const [yearlevel, setYearLevel] = useState(""); // State for Year Level
  const [status, setStatus] = useState(false); // State for Status
  const [department, setDepartment] = useState(""); // State for Department

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value === "Active");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const studentData = {
        name,
        program,
        yearLevel: Number(yearlevel),
        department,
        isActive: status,
      };
      await OnSubmit(studentData); // Call the onSubmit prop with the student data
      onClose(); // Close the modal after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    } 
    
    onClose();
  };

  useEffect(() => {
        if (mode === 'edit' && studentData) {
            setName(studentData.name);
            setProgram(studentData.program);
            setYearLevel(studentData.yearlevel);
            setDepartment(studentData.department);
            setStatus(studentData.isActive);
        } else {
            // Reset fields when adding a new client
            setName('');
            setProgram('');
            setYearLevel('');
            setDepartment('');
            setStatus(false);
        }
    }, [mode, studentData]);

  return (
    <Fragment>
      <>
        <dialog id="my_modal_3" className="modal bg-black/40" open={isOpen}>
          <div className="modal-box">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onClose}
            >
              ✕
            </button>
            <h3 className="font-bold text-lg py-4">
              {mode === "edit" ? "Edit Client" : "Client Details"}
            </h3>

            <form
              onSubmit={handleSubmit}
            >
              <label className="input input-bordered flex items-center my-2 gap-2 w-full">
                Name
                <input
                  type="text"
                  className="grow"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center my-4 gap-2 w-full">
                Program
                <input
                  type="text"
                  className="grow"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                />
              </label>
              <label className="input input-bordered flex items-center my-4 gap-2 w-full">
                Department
                <input
                  type="text"
                  className="grow"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
              </label>

              {/* ++ made this anumber */}
              <div className="flex mb-4 justify-between">
                <label className="input input-bordered flex mr-4 items-center gap-2">
                  Year Level
                  <input
                    type="number"
                    className="grow"
                    value={yearlevel}
                    onChange={(e) => setYearLevel(e.target.value)}
                    required
                  />
                </label>

                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleStatusChange}
                >
                  <option>Inactive</option>
                  <option>Active</option>
                </select>
              </div>

              <button type="submit" className=" btn btn-success">
                {mode === "edit" ? "Save Changes" : "Add Client"}
              </button>
            </form>
          </div>
        </dialog>
      </>
    </Fragment>
  );
};

export default ModalForm;
