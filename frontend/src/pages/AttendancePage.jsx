import { useEffect, useState } from "react";
import axios from "axios";

const EMP_API = "http://localhost:5000/api/employees";
const ATT_API = "http://localhost:5000/api/attendance";

export default function AttendancePage() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load employees
  useEffect(() => {
    axios.get(EMP_API).then(res => setEmployees(res.data));
  }, []);

  // Load attendance for employee
  const loadAttendance = async (id) => {
    try {
      setEmployeeId(id);
      setLoading(true);
      const res = await axios.get(`${ATT_API}/${id}`);
      setRecords(res.data);
      setError("");
    } catch {
      setError("Failed to load attendance");
    } finally {
      setLoading(false);
    }
  };

  // Mark attendance
  const markAttendance = async () => {
    if (!employeeId || !date) {
      alert("Please select employee and date");
      return;
    }

    try {
      await axios.post(ATT_API, { employeeId, date, status });
      alert("Attendance marked successfully");
      loadAttendance(employeeId);
    } catch {
      alert("Attendance already marked for this date");
    }
  };

  return (
    <div>
      <h2>Attendance Management</h2>

      {/* Attendance Form */}
      <div style={{ marginBottom: "15px" }}>
        <select
          value={employeeId}
          onChange={(e) => loadAttendance(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp._id} value={emp.employeeId}>
              {emp.fullName} ({emp.employeeId})
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ marginRight: "10px" }}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          onClick={markAttendance}
          style={{
            padding: "6px 12px",
            background: "#16a34a",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Mark
        </button>
      </div>

      {/* States */}
      {loading && <p>Loading attendance...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Attendance Table */}
      {records.length === 0 && !loading ? (
        <p>No attendance records found</p>
      ) : (
        <table width="100%" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map(rec => (
              <tr key={rec._id}>
                <td>{rec.date}</td>
                <td
                  style={{
                    color: rec.status === "Present" ? "green" : "red",
                    fontWeight: "bold"
                  }}
                >
                  {rec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Bonus summary */}
      {records.length > 0 && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Total Present Days:{" "}
          {records.filter(r => r.status === "Present").length}
        </p>
      )}
    </div>
  );
}
