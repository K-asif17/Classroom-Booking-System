import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import CRDetails from "../crdetails/crdetails";
import SignupRequests from "../signuprequest/signuprequest";
import ClassroomPanel from "../classroom/classroom";

const AdminDashboardMain = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [approvedCRs, setApprovedCRs] = useState([]);
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [replies, setReplies] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const fetchApprovedCRs = async () => {
    try {
      const response = await fetch("http://localhost:5000/approved-crs");
      if (!response.ok) throw new Error("Failed to fetch CRs");
      const data = await response.json();
      if (data.success) {
        setApprovedCRs(data.crs);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching CRs:", error);
    }
  };

  const fetchIssues = async () => {
    try {
      const response = await fetch("http://localhost:5000/issues");
      if (!response.ok) throw new Error("Failed to fetch issues");
      const data = await response.json();
      if (data.success) {
        setIssues(data.issues);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const handleReplyChange = (issueId, value) => {
    setReplies((prev) => ({
      ...prev,
      [issueId]: value,
    }));
  };

  const handleReply = async (issueId) => {
    const issue = issues.find((i) => i.id === issueId);
    if (!issue) return;

    const replyMessage = replies[issueId];
    if (!replyMessage) {
      alert("Please enter a reply message.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/reply-to-issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          issue_id: issueId,
          cr_email: issue.cr_email,
          message: replyMessage,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setIssues(issues.filter((i) => i.id !== issueId));
        setReplies((prev) => ({
          ...prev,
          [issueId]: "",
        }));
        alert("Reply sent successfully");
      } else {
        alert("Error sending reply");
      }
    } catch (error) {
      console.error("Error replying to issue:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/"); // Proper SPA redirection
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchApprovedCRs(), fetchIssues()]);
      setIsLoading(false);
    };
    fetchData();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
            <h2 className="dashboard-subtitle">Admin Dashboard</h2>
            {isLoading ? (
              <p>Loading data...</p>
            ) : (
              <>
                <div className="summary-cards">
                  <div className="card">
                    <h3>Registered CRs</h3>
                    <p>{approvedCRs.length}</p>
                  </div>
                  <div className="card">
                    <h3>Total Classrooms</h3>
                    <p>15</p>
                  </div>
                  <div className="card">
                    <h3>Signup Requests</h3>
                    <p>7</p>
                  </div>
                  <div className="card">
                    <h3>Issues Raised</h3>
                    <p>{issues.length}</p>
                  </div>
                </div>

                <div className="issues-section">
                  <h2>Issues Raised by CRs</h2>
                  {issues.length === 0 ? (
                    <p>No issues to display.</p>
                  ) : (
                    issues.map((issue) => (
                      <div className="issue-card" key={issue.id}>
                        <h4>
                          {issue.cr_name} ({issue.cr_email})
                        </h4>
                        <p><strong>Subject:</strong> {issue.subject}</p>
                        <p><strong>Description:</strong> {issue.description}</p>
                        <textarea
                          placeholder="Reply to this issue..."
                          value={replies[issue.id] || ""}
                          onChange={(e) =>
                            handleReplyChange(issue.id, e.target.value)
                          }
                        />
                        <button onClick={() => handleReply(issue.id)}>
                          Send Reply
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </>
        );

      case "crDetails":
        return <CRDetails approvedCRs={approvedCRs} onRefresh={handleRefresh} />;

      case "signupRequests":
        return <SignupRequests onApprove={handleRefresh} />;

      case "classrooms":
        return <ClassroomPanel />;

      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      <div className="admin-navbar">Classroom Booking System</div>
      <div className="admin-dashboard-layout">
        <aside className="admin-sidebar">
          <h2>Admin Page</h2>
          <ul className="sidebar-nav">
            <li onClick={() => setActiveSection("dashboard")}>Dashboard</li>
            <li onClick={() => setActiveSection("crDetails")}>CR Details</li>
            <li onClick={() => setActiveSection("signupRequests")}>
              Signup Requests
            </li>
            <li onClick={() => setActiveSection("classrooms")}>Classrooms</li>
          </ul>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </aside>

        <main className="admin-main-content">{renderSection()}</main>
      </div>
    </div>
  );
};

export default AdminDashboardMain;
