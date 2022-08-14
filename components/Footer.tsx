const Footer = () => {
  return (
    <div className="flex justify-center py-2 w-screen text-sm sm:text-base md:text-lg border-t-px border-slate-800">
      Copyright &copy; {new Date().getFullYear()} MERN eCommerce
    </div>
  );
};

export default Footer;
