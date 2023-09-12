import { SignupContext } from "../../context/signup";
import { UserRepository } from "../../domain/account/user.interface";

export default function SignupContainer({
  children,
  repositories
}: {
  children: React.ReactNode,
  repositories: {
    userRepository: UserRepository
  }
}) {
  const { userRepository } = repositories;

  return (
    <SignupContext.Provider value={{
      acceptAgreement(form) {
        
      },
      submitBaseInfo(form) {
        
      },
      selectVerification(authType) {
        
      },
      submitCredential(form) {
        
      },
      redirect() {
        
      },
    }}>
      {children}
    </SignupContext.Provider>
  );
}
