import AppLayout from "../..//components/layout/AppLayout";
import RegisterForm from "../../components/auth/RegisterForm";

export const metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <AppLayout>
      <RegisterForm />
    </AppLayout>
  );
}
