import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaFilter,
  FaInbox,
  FaRegCommentDots,
  FaUser,
} from "react-icons/fa";
import AdminAuthService from "../service/AdminAuthService";
import "./adminpanel.css";
import "./contactdetail.css";

const formatDateTime = (value) =>
  new Date(value).toLocaleString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

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

  const filteredContacts = contacts.filter((contact) => {
    const contactMonth = new Date(contact.submitted_at).toISOString().slice(0, 7);
    if (fromMonthStr && toMonthStr) return contactMonth >= fromMonthStr && contactMonth <= toMonthStr;
    if (fromMonthStr) return contactMonth >= fromMonthStr;
    if (toMonthStr) return contactMonth <= toMonthStr;
    return true;
  });

  const totalPages = Math.ceil(filteredContacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstContact, indexOfLastContact);
  const latestContact = contacts.length
    ? [...contacts].sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))[0]
    : null;
  const activeFilters = [fromMonth, fromYear, toMonth, toYear].filter(Boolean).length;
  const uniqueSenders = new Set(contacts.map((contact) => contact.email).filter(Boolean)).size;

  if (loading) {
    return <div className="admin-page"><p className="admin-empty">Loading...</p></div>;
  }

  if (error) {
    return <div className="admin-page"><p className="admin-empty text-danger">{error}</p></div>;
  }

  return (
    <div className="admin-page">
      <section className="admin-page-header contact-page-hero">
        <div className="contact-page-hero-copy">
          <span className="admin-section-kicker">Messages</span>
          <h1 className="admin-page-title">Contact inbox</h1>
          <p className="admin-page-subtitle">
            Review platform inquiries in a clean admin workspace, filter by date range, and keep every
            message easy to read and follow up.
          </p>
        </div>
        <aside className="contact-page-hero-panel">
          <span className="contact-page-hero-label">Latest message</span>
          <strong>{latestContact ? latestContact.full_name : "No submissions yet"}</strong>
          <p>{latestContact ? latestContact.email : "Incoming messages will appear here."}</p>
          {latestContact && <span className="contact-page-hero-date">{formatDateTime(latestContact.submitted_at)}</span>}
        </aside>
      </section>

      <section className="contact-page-stats">
        <article className="contact-page-stat-card">
          <span className="contact-page-stat-icon"><FaInbox /></span>
          <div>
            <strong>{contacts.length}</strong>
            <p>Total messages</p>
          </div>
        </article>
        <article className="contact-page-stat-card">
          <span className="contact-page-stat-icon"><FaEnvelope /></span>
          <div>
            <strong>{uniqueSenders}</strong>
            <p>Unique senders</p>
          </div>
        </article>
        <article className="contact-page-stat-card">
          <span className="contact-page-stat-icon"><FaFilter /></span>
          <div>
            <strong>{activeFilters}</strong>
            <p>Active filters</p>
          </div>
        </article>
        <article className="contact-page-stat-card">
          <span className="contact-page-stat-icon"><FaRegCommentDots /></span>
          <div>
            <strong>{filteredContacts.length}</strong>
            <p>Visible results</p>
          </div>
        </article>
      </section>

      <section className="admin-surface contact-page-surface">
        <div className="contact-page-toolbar">
          <div>
            <h2>Filter messages</h2>
            <p>Choose a month and year range to narrow the inbox.</p>
          </div>
          <div className="contact-page-toolbar-chip">
            <FaCalendarAlt />
            <span>Page {Math.min(currentPage, Math.max(totalPages, 1))} of {Math.max(totalPages, 1)}</span>
          </div>
        </div>

        <div className="contact-page-filter-grid">
          <div className="contact-page-filter-field">
            <label>From month</label>
            <select className="form-select contact-page-select" value={fromMonth} onChange={(e) => { setFromMonth(e.target.value); setCurrentPage(1); }}>
              <option value="">Month</option>
              {months.map((month) => <option key={month.value} value={month.value}>{month.name}</option>)}
            </select>
          </div>
          <div className="contact-page-filter-field">
            <label>From year</label>
            <select className="form-select contact-page-select" value={fromYear} onChange={(e) => { setFromYear(e.target.value); setCurrentPage(1); }}>
              <option value="">Year</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="contact-page-filter-field">
            <label>To month</label>
            <select className="form-select contact-page-select" value={toMonth} onChange={(e) => { setToMonth(e.target.value); setCurrentPage(1); }}>
              <option value="">Month</option>
              {months.map((month) => <option key={month.value} value={month.value}>{month.name}</option>)}
            </select>
          </div>
          <div className="contact-page-filter-field">
            <label>To year</label>
            <select className="form-select contact-page-select" value={toYear} onChange={(e) => { setToYear(e.target.value); setCurrentPage(1); }}>
              <option value="">Year</option>
              {years.map((year) => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div className="contact-page-filter-action">
            <button
              className="btn admin-btn-secondary contact-page-clear-btn"
              onClick={() => {
                setFromMonth("");
                setFromYear("");
                setToMonth("");
                setToYear("");
                setCurrentPage(1);
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {currentContacts.length > 0 ? (
          <>
            <div className="admin-card-grid contact-page-card-grid">
              {currentContacts.map((contact) => (
                <ContactCard key={contact.id || contact.contact_id} contact={contact} />
              ))}
            </div>
            {totalPages > 1 && (
              <nav className="mt-4">
                <ul className="pagination justify-content-center admin-pagination">
                  <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}>Prev</button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
                      <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                    <button className="page-link" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}>Next</button>
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
  const previewLength = 140;
  const message = contact.message || "";
  const isLongMessage = message.length > previewLength;

  return (
    <article className="admin-contact-card contact-page-card">
      <div className="contact-page-card-head">
        <div className="contact-page-card-user">
          <span className="contact-page-avatar">{contact.full_name?.charAt(0)?.toUpperCase() || "U"}</span>
          <div className="contact-page-card-user-copy">
            <h3>{contact.full_name}</h3>
            <p>{contact.email}</p>
          </div>
        </div>
        <div className="contact-page-card-date-row">
          <span className="contact-page-date-chip">{formatDateTime(contact.submitted_at)}</span>
        </div>
      </div>

      <div className="contact-page-card-meta">
        <p><FaUser /> <span>{contact.full_name}</span></p>
        <p><FaEnvelope /> <span>{contact.email}</span></p>
      </div>

      <div className="contact-page-message">
        <strong>Message</strong>
        <p>
          {isLongMessage ? (
            <>
              {isExpanded ? message : `${message.substring(0, previewLength)}...`}
              <button
                className="btn btn-link p-0 ms-2 text-decoration-none contact-page-readmore"
                onClick={() => setIsExpanded((prev) => !prev)}
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </>
          ) : (
            message
          )}
        </p>
      </div>
    </article>
  );
}
