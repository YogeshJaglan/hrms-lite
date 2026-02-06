import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://hrms-lite-mwb5.onrender.com/api/employees";


export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    department: ""
  });

  // Load employees
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setEmployees(res.data);
      setError("");
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // Add employee
  const submit = async () => {
    if (!form.employeeId || !form.fullName || !form.email || !form.department) {
      alert("All fields are required");
      return;
    }

    try {
      await axios.post(API, form);
      setForm({ employeeId: "", fullName: "", email: "", department: "" });
      loadEmployees();
    } catch (err) {
      alert("Duplicate Employee ID or Email");
    }
  };

  // Delete employee
  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    await axios.delete(`${API}/${id}`);
    loadEmployees();
  };

  return (
    <div>
      <h2>Employee Management</h2>

      {/* Form */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Employee ID"
          value={form.employeeId}
          onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          style={{ marginRight: "10px" }}
        />

        <button
          onClick={submit}
          style={{
            padding: "6px 12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Add
        </button>
      </div>

      {/* States */}
      {loading && <p>Loading employees...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table */}
      {employees.length === 0 && !loading ? (
        <p>No employees added yet</p>
      ) : (
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.employeeId}</td>
                <td>{emp.fullName}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>
                  <button
                    onClick={() => deleteEmployee(emp._id)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      cursor: "pointer"
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
