import React, { useEffect, useState } from "react";
import AdminAuthService from "../service/AdminAuthService";
import "./adminpanel.css";

export default function ContactDetails() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;
  const [fromMonth, setFromMonth] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [toMonth, setToMonth] = useState("");
  const [toYear, setToYear] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await AdminAuthService.getAllContacts();
        setContacts(data);
      } catch {
        setError("Failed to fetch contact details");
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

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

  if (loading) return <div className="admin-page"><p className="admin-empty">Loading...</p></div>;
  if (error) return <div className="admin-page"><p className="admin-empty text-danger">{error}</p></div>;

  return (
    <div className="admin-page">
      <section className="admin-page-header">
        <div>
          <span className="admin-section-kicker">Messages</span>
          <h1 className="admin-page-title">Contact submissions</h1>
          <p className="admin-page-subtitle">
            Review messages sent through the platform and filter them by month and year range.
          </p>
        </div>
      </section>

      <section className="admin-surface">
        <div className="admin-table-toolbar">
          <div className="d-flex align-items-center gap-2 flex-wrap">
            <strong>From:</strong>
            <select className="form-select" value={fromMonth} onChange={(e) => { setFromMonth(e.target.value); setCurrentPage(1); }}>
              <option value="">Month</option>
              {months.map((m) => <option key={m.value} value={m.value}>{m.name}</option>)}
            </select>
            <select className="form-select" value={fromYear} onChange={(e) => { setFromYear(e.target.value); setCurrentPage(1); }}>
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            <strong>To:</strong>
            <select className="form-select" value={toMonth} onChange={(e) => { setToMonth(e.target.value); setCurrentPage(1); }}>
              <option value="">Month</option>
              {months.map((m) => <option key={m.value} value={m.value}>{m.name}</option>)}
            </select>
            <select className="form-select" value={toYear} onChange={(e) => { setToYear(e.target.value); setCurrentPage(1); }}>
              <option value="">Year</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
            {(fromMonth || fromYear || toMonth || toYear) && (
              <button className="btn admin-btn-secondary" onClick={() => {
                setFromMonth(""); setFromYear(""); setToMonth(""); setToYear(""); setCurrentPage(1);
              }}>
                Clear
              </button>
            )}
          </div>
        </div>

        {currentContacts.length > 0 ? (
          <>
            <div className="admin-card-grid">
              {currentContacts.map((contact) => (
                <ContactCard key={contact.id || contact.contact_id} contact={contact} />
              ))}
            </div>
            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center admin-pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}>Prev</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}>Next</button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        ) : (
          <p className="admin-empty">No contact submissions available.</p>
        )}
      </section>
    </div>
  );
}

function ContactCard({ contact }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const previewLength = 80;

  return (
    <article className="admin-contact-card">
      <h3>{contact.full_name}</h3>
      <p><strong>Email:</strong> {contact.email}</p>
      <p>
        <strong>Message:</strong>{" "}
        {contact.message.length > previewLength ? (
          <>
            {isExpanded ? contact.message : `${contact.message.substring(0, previewLength)}...`}
            <button className="btn btn-link p-0 ms-2 text-decoration-none" onClick={() => setIsExpanded((prev) => !prev)}>
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          </>
        ) : (
          contact.message
        )}
      </p>
      <p><strong>Date & Time:</strong> {new Date(contact.submitted_at).toLocaleString()}</p>
    </article>
  );
}
