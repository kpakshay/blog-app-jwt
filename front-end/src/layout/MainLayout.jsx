import Navbar from "../Components/NavBar.jsx";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}
