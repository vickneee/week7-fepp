const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Job Search</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/add-job">Add Job</a>
        <a href="/login">Log In</a>
        <a href="/signup">Sign Up</a>
      </div>
    </nav>
  );
}

export default Navbar;
