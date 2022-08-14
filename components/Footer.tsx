const Footer = () => {
  return (
    <div className="flex justify-center py-2 w-screen text-lg border-t-2 border-slate-800">
      Copyright &copy; {new Date().getFullYear()} MERN eCommerce
    </div>
  );
};

export default Footer;
