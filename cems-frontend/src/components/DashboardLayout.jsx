const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex min-vh-100 bg-dark text-light">
      {children}
    </div>
  );
};

export default DashboardLayout;
