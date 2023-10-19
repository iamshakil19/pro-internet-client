import Navbar from "../Navbar/Navbar";

const PublicHeader = () => {
  const items = [
    { key: "1", label: "Home", href: "/" },
    { key: "2", label: "Package", href: "/package" },
    { key: "3", label: "Blog", href: "/blog" },
    { key: "6", label: "FAQ", href: "/faq" },
  ];
  return (
    <>
      <Navbar items={items} />
    </>
  );
};

export default PublicHeader;
