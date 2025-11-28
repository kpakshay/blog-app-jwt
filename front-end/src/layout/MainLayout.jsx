import Navbar from "../Components/NavBar.jsx";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ padding: "20px" }}>
        {children}
      </main>
    </>
  );
}
