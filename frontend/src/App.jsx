import EmployeePage from "./pages/EmployeePage";
import AttendancePage from "./pages/AttendancePage";
import Navbar from "./components/Navbar";

const cardStyle = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  marginBottom: "20px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

export default function App() {
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "900px", margin: "auto" }}>
        <div style={cardStyle}>
          <EmployeePage />
        </div>

        <div style={cardStyle}>
          <AttendancePage />
        </div>
      </div>
    </div>
  );
}
