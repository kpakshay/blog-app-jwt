import { useState } from "react";
import Modal from "./Modal";
import { LoginModal } from "../pages/Login";
import { useNavigate } from "react-router-dom";

export function LoginGate({ redirectTo }) {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  return (
    <Modal isOpen={open} onClose={() => navigate("/")}>
      <LoginModal
        onClose={() => navigate("/")}
        onSuccess={() => navigate(redirectTo || "/")}
      />
    </Modal>
  );
}
