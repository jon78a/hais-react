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
      /**
        @startuml acceptAgreement
        User -> Client: [Action] 다음 버튼 클릭
        Client -> Service: [Dispatch] 약관 동의 형식 제출

        activate Service
        Service -> Service: 필수 항목 체크 검토
        alt 실패
          Service --> User: [Alert] 필수 항목을 체크해주세요
        else Pass
        end

        Service -> Service: step++
        deactivate Service
        Service -> Model: Agreement form 저장
        @enduml
      */
      acceptAgreement(form) {
        
      },
      /**
      @startuml submitStudentInfo
      User -> Client: [Action] 다음 버튼 클릭
      Client -> Service: [Dispatch] 기본 학생 정보 제출

      activate Service
      Service -> Service: 필수 입력 사항 검토
      alt 실패
        Service --> User: [Alert] 필수 항목을 입력해주세요
      else Pass
      end

      Service -> Service: step++
      deactivate Service
      Service -> Model: StudentProfile form 저장
      @enduml
      */
      submitStudentInfo(form) {
        
      },
      /**
      @startuml selectVerification

      alt 일반 회원가입 선택
      User -> Client: [Action] 일반 회원가입 선택 버튼 클릭
      Client -> Service: [Dispatch] 인증 유형 선택
      Service -> Model: 인증 유형 저장
      else 카카오 회원가입 선택
      User -> Client: [Action] 카카오 회원가입 선택 버튼 클릭
      Client -> Service: [Dispatch] 인증 유형 선택
      Service -> Model: 인증 유형 저장
      else 네이버 회원가입 선택
      User -> Client: [Action] 네이버 회원가입 선택 버튼 클릭
      Client -> Service: [Dispatch] 인증 유형 선택
      Service -> Model: 인증 유형 저장
      end

      Service -> Service: step++

      @enduml
      */
      selectVerification(authType) {
        
      },
      /**
      @startuml submitCredential

      User -> Client: [Action] 제출 버튼 클릭
      Client -> Service: [Dispatch] 권한 정보 제출 (아이디/비밀번호)
      activate Service
      Service -> Model: 권한 정보 저장
      Model -> DB: 유저 생성
      Service --> Service: signupComplete()
      Service --> Service: redirect()
      deactivate Service
      Service --> User: 홈 화면으로 이동
      @enduml
      */
      submitCredential(form) {
        
      },
      signupComplete() {
        
      },
      redirect() {
        
      },
    }}>
      {children}
    </SignupContext.Provider>
  );
}
