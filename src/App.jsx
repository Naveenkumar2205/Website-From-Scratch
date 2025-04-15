import "./styles.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        {/* Use a FontAwesome icon as logo */}
        <i class="fas fa-puzzle-piece logo-icon"></i>
        <span>BookMyTicket</span>
      </div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/services">Services</a>
        <a href="/contact">Contact</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 MyWebsite. All rights reserved.</p>
        <div className="socials">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <h2>Welcome to MyWebsite!</h2>
        <p>This is where the magic happens.</p>
      </main>
      <Footer />
    </div>
  );
}
