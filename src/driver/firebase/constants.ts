export class CollectionName {
  static User = "users";
  static Student = "students";
  static AuthSession = "auth_session";
  static CommonSubject = "common_subject";
  static GeneralMajor = "general_major";
  static OptionalSubject = "optional_subject";
  static RecommendGroup = "recommend_group";
  static GradeScore = "grade_score";
  static CreditScore = "credit_score";
  static GradeScoreWeight = "grade_score_weight";
  static CommonSubjectWeight = "common_subject_weight";
}

export class StorageSource {
  static GeneralMajor =
    "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/generalMajor.json?alt=media&token=d74e42a9-cace-4c18-ac4e-b1501590ee78";
  static Major =
    "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/backup%2Fmajor_20231210.json?alt=media&token=6af82b5e-2f77-463b-a221-578266a7b9ec";
  static MajorCategoryGroup =
    "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/majorCategoryGroup.json?alt=media&token=2bd327d1-4c0e-4c7c-8336-291ef09fa303";
  static OptionalSubject =
    "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/optionalSubject.json?alt=media&token=88e3798b-3f7d-4534-9b99-d5655fb89646";
  static RecommendGroup =
    "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/recommendGroup.json?alt=media&token=a0b53268-3e90-4236-b25b-a0178d289c47";
  static Univ =
    "https://firebasestorage.googleapis.com/v0/b/hais-72666.appspot.com/o/univ.json?alt=media&token=216969cb-0f37-4dec-b722-a473221cc5b1";

  static filePath = {
    majorCategoryGroup: "majorCategoryGroup.json",
    recommendGroup: "recommendGroup.json",
  };
}
