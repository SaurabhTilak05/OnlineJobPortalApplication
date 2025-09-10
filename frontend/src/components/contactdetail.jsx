import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import "./contactdetail.css";

export default function ContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;

  // Filters
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await AdminAuthService.getAllContacts();
        setContacts(data);
      } catch (err) {
        setError("Failed to fetch contact details");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-4">{error}</p>;

  const months = [
    { value: "01", name: "Jan" }, { value: "02", name: "Feb" }, { value: "03", name: "Mar" },
    { value: "04", name: "Apr" }, { value: "05", name: "May" }, { value: "06", name: "Jun" },
    { value: "07", name: "Jul" }, { value: "08", name: "Aug" }, { value: "09", name: "Sep" },
    { value: "10", name: "Oct" }, { value: "11", name: "Nov" }, { value: "12", name: "Dec" },
  ];

  const years = [];
  const currentYear = new Date().getFullYear();
  for (let y = currentYear; y >= 2000; y--) years.push(y.toString());

  const toMonthString = (year, month) => (year && month ? `${year}-${month}` : "");

  const fromMonthStr = toMonthString(fromYear, fromMonth);
  const toMonthStr = toMonthString(toYear, toMonth);

  // Filter contacts by selected month/year range
  const filteredContacts = contacts.filter((c) => {
    const contactMonth = new Date(c.submitted_at).toISOString().slice(0, 7);
    if (fromMonthStr && toMonthStr) return contactMonth >= fromMonthStr && contactMonth <= toMonthStr;
    if (fromMonthStr) return contactMonth >= fromMonthStr;
    if (toMonthStr) return contactMonth <= toMonthStr;
    return true;
  });

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    if (end - start < 4) start = Math.max(end - 4, 1);
    for (let i = start; i <= end; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">Contact Submissions</h2>
       
      </div>

      {/* Filters */}
      <div className="card shadow-sm mb-4 p-3">
        <div className="row align-items-center justify-content-center g-2">
            
          <div className="col-auto"><strong>From:</strong></div>
          <div className="col-auto">
            
            <select className="form-select" value={fromMonth} onChange={(e) => { setFromMonth(e.target.value); setCurrentPage(1); }}>
              <option value="">Month</option>
              {months.map((m) => <option key={m.value} value={m.value}>{m.name}</option>)}
            </select>
          </div>
          <div className="col-auto">
            <select className="form-select" value={fromYear} onChange={(e) => { setFromYear(e.target.value); setCurrentPage(1); }}>
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="col-auto"><strong>To:</strong></div>
          <div className="col-auto">
            <select className="form-select" value={toMonth} onChange={(e) => { setToMonth(e.target.value); setCurrentPage(1); }}>
              <option value="">Month</option>
              {months.map((m) => {
                const isDisabled = fromYear && fromMonth && toYear === fromYear && m.value < fromMonth;
                return <option key={m.value} value={m.value} disabled={isDisabled}>{m.name}</option>;
              })}
            </select>
          </div>
          <div className="col-auto">
            <select className="form-select" value={toYear} onChange={(e) => { setToYear(e.target.value); setCurrentPage(1); }}>
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y} disabled={fromYear && y < fromYear}>{y}</option>)}
            </select>
          </div>

          {(fromMonth || fromYear || toMonth || toYear) && (
            <div className="col-auto">
              <button className="btn btn-outline-secondary" onClick={() => {
                setFromMonth(""); setFromYear(""); setToMonth(""); setToYear(""); setCurrentPage(1);
              }}>
                Clear
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards */}
      {currentContacts.length > 0 ? (
        <div className="row g-3">
          {currentContacts.map((c) => <ContactCard key={c.id || c.contact_id} contact={c} />)}
        </div>
      ) : (
        <p className="text-center mt-4">No contact submissions available.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo; Prev</button>
            </li>
            {getPageNumbers().map((page) => (
              <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                <button className="page-link" onClick={() => handlePageChange(page)}>{page}</button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next &raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

// Contact card with Read More functionality
function ContactCard({ contact }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 80;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold">{contact.full_name}</h5>
          <p className="mb-1"><strong>Email:</strong> {contact.email}</p>
          <p className="mb-1">
            <strong>Message:</strong>{" "}
            {contact.message.length > previewLength ? (
              <>
                {isExpanded ? contact.message : contact.message.substring(0, previewLength) + "..."}
                <span
                  onClick={toggleExpand}
                  style={{ color: "#0d6efd", cursor: "pointer", marginLeft: "5px" }}
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </span>
              </>
            ) : (
              contact.message
            )}
          </p>
          
         
          <p className="mb-0 text-muted"> <b> Date &time</b> {new Date(contact.submitted_at).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
