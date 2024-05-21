import Auth from "@/components/auth/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <main>
      <ToastContainer autoClose={3000} />
      <Auth />
    </main>
  );
}
