
import AppLayout from "../../components/layout/AppLayout";
import LoginForm from "../../components/auth/LoginForm";

export const metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <AppLayout>
      <LoginForm />
    </AppLayout>
  );
}
