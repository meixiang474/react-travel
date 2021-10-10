import { UserLayout } from "layouts";
import React from "react";
import { RegisterForm } from "./registerForm";

export const RegisterPage: React.FC = () => {
  return (
    <UserLayout>
      <RegisterForm />
    </UserLayout>
  );
};
