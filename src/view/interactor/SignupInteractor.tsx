import { useRecoilState, useRecoilValue } from "recoil";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

import { useSignupService } from "../../service/signup";
import { SignupMain } from "../presenter/signup.ui/SignupMain";
import { signupRequestState, studentProfileState } from "../../schema/states/Signup";
import { StudentProfileStep } from "../presenter/signup.ui/StudentProfileStep";
import type { StudentCategoryCode } from "../../policy/school";
import { studentState } from "../../domain/subject/school.impl";

const SignupInteractor: React.FC = () => {
  const service = useSignupService();
  const [searchParams, __setSearchParams] = useSearchParams();

  const [signupRequest, setSignupRequest] = useRecoilState(signupRequestState);
  const [studentProfile, setStudentProfile] = useRecoilState(studentProfileState);

  const studentSnapshot = useRecoilValue(studentState);

  useEffect(() => {
    if (studentSnapshot.loading) {
      service.signupComplete();
    }
  }, [studentSnapshot, service]);

  switch(searchParams.get("step") || "1") {
    case "1":
      return (
        <SignupMain
          clickMarketingAgreementToggle={() => {
            setSignupRequest({
              ...signupRequest,
              isAgreeMarketing: !signupRequest.isAgreeMarketing
            })
          }}
          inputEmail={(value) => {
            setSignupRequest({
              ...signupRequest,
              email: value
            });
            return service.checkEmail(value);
          }}
          inputPassword={(value) => {
            setSignupRequest({
              ...signupRequest,
              password: value
            });
            return service.checkPassword(value);
          }}
          inputPasswordConfirm={(value) => {
            setSignupRequest({
              ...signupRequest,
              passwordConfirm: value
            });
            return service.checkPasswordConfirm(signupRequest.password, value);
          }}
          clickSignup={() => {
            service.requestSignup(signupRequest);
          }}
          clickSocialSignup={(type) => {
            service.requestSocialSignup(type);
          }}
        />
      );
    case "2":
      return (
        <StudentProfileStep
          inputName={(value) => {
            setStudentProfile({
              ...studentProfile,
              name: value
            });
            return service.checkName(value);
          }}
          selectSchoolYear={(value) => {
            setStudentProfile({
              ...studentProfile,
              schoolYear: value
            });
          }}
          selectSubjectCategory={(value) => {
            setStudentProfile({
              ...studentProfile,
              subjectCategory: value as StudentCategoryCode
            })
          }}
          inputTargetMajors={(values) => {

          }}
          clickSignupDone={() => { service.submitStudentInfo(studentProfile) }}
          back={() => {
            service.resetRequest();
          }}
        />
      )
    default:
      throw new Error("step invalid");
  }
}

export default SignupInteractor;
