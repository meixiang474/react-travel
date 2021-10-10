import { UserLayout } from "layouts";
import React from "react";
import { SignInForm } from "./signInForm";

export const SignInPage: React.FC = () => {
  return (
    <UserLayout>
      <SignInForm />
    </UserLayout>
  );
};
