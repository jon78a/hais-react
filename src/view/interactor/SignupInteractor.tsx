import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSignupService } from "../../service/signup";
import { SignupMain } from "../presenter/signup.ui/SignupMain";
import {
  schoolListState,
  signupRequestState,
  studentProfileState,
} from "../../schema/states/Signup";
import { StudentProfileStep } from "../presenter/signup.ui/StudentProfileStep";
import type { StudentCategoryCode } from "../../policy/school";
import { studentState } from "../../domain/subject/school.impl";
import { debounce } from "lodash";

const SignupInteractor: React.FC = () => {
  const service = useSignupService();
  const [searchParams, __setSearchParams] = useSearchParams();

  const [signupRequest, setSignupRequest] = useRecoilState(signupRequestState);
  const [studentProfile, setStudentProfile] =
    useRecoilState(studentProfileState);
  const setSelectedSchool = useSetRecoilState(schoolListState);
  const studentSnapshot = useRecoilValue(studentState);
  const [schoolName, setSchoolName] = useState("");

  const getSchoolWithFilter = debounce((nameKeyword: string) => {
    service
      .getSchoolList({
        pageSize: 100,
        ...(nameKeyword && { filter: { nameKeyword: nameKeyword } }),
      })
      .then((data) => {
        setSelectedSchool(data.data);
      });
  }, 1000);

  useEffect(() => {
    getSchoolWithFilter(schoolName);
  }, [getSchoolWithFilter, schoolName]);

  useEffect(() => {
    if (studentSnapshot.loading) {
      service.signupComplete();
    }
  }, [studentSnapshot, service]);

  switch (searchParams.get("step") || "1") {
    case "1":
      return (
        <SignupMain
          clickMarketingAgreementToggle={() => {
            setSignupRequest({
              ...signupRequest,
              isAgreeMarketing: !signupRequest.isAgreeMarketing,
            });
          }}
          inputEmail={(value) => {
            setSignupRequest({
              ...signupRequest,
              email: value,
            });
            return service.checkEmail(value);
          }}
          inputPassword={(value) => {
            setSignupRequest({
              ...signupRequest,
              password: value,
            });
            return service.checkPassword(value);
          }}
          inputPasswordConfirm={(value) => {
            setSignupRequest({
              ...signupRequest,
              passwordConfirm: value,
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
              name: value,
            });
            return service.checkName(value);
          }}
          selectSchoolYear={(value) => {
            setStudentProfile({
              ...studentProfile,
              schoolYear: value,
            });
          }}
          selectSubjectCategory={(value) => {
            setStudentProfile({
              ...studentProfile,
              subjectCategory: value as StudentCategoryCode,
            });
          }}
          inputTargetMajors={(values) => {}}
          clickSignupDone={() => {
            service.submitStudentInfo(studentProfile);
          }}
          back={() => {
            service.resetRequest();
          }}
          selectSchool={(value) => {
            setStudentProfile({
              ...studentProfile,
              schoolId: value,
            });
          }}
          onChangeSchoolName={(value) => {
            setSchoolName(value);
          }}
        />
      );
    default:
      throw new Error("step invalid");
  }
};

export default SignupInteractor;
