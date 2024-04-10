export interface RouteExp {
  path: string;
  re: RegExp;
  detail?: (key: string) => string;
}

interface AdminRoutesType {
  adminHome: RouteExp;
  adminSchool: RouteExp;
  adminUniversity: RouteExp;
  adminPremium: RouteExp;
}

export const adminRoutes: AdminRoutesType = {
  adminHome: {
    path: "/admin",
    re: new RegExp("^/admin"),
  },
  adminSchool: {
    path: "/admin/school",
    re: new RegExp("^/admin/school"),
  },
  adminUniversity: {
    path: "/admin/university",
    re: new RegExp("^/admin/university"),
  },
  adminPremium: {
    path: "/admin/premium",
    re: new RegExp("^/admin/premium"),
  },
};

interface PublicRoutesType {
  home: RouteExp;
  premium: RouteExp;
  login: RouteExp;
  signup: RouteExp;
  findCredentialId: RouteExp;
  findCredentialPw: RouteExp;
  oauth: RouteExp;
  subjectSearch: RouteExp;
  subjectRecommend: RouteExp;
  people: RouteExp;
}

export const publicRoutes: PublicRoutesType = {
  home: {
    path: "/",
    re: new RegExp("^/$"),
  },
  premium: {
    path: "/premium",
    re: new RegExp("^/premium"),
  },
  login: {
    path: "/login",
    re: new RegExp("^/login"),
  },
  signup: {
    path: "/signup",
    re: new RegExp("^/signup"),
  },
  findCredentialId: {
    path: "/login?find=id",
    re: new RegExp("^/login?find=id"),
  },
  findCredentialPw: {
    path: "/login?find=pw",
    re: new RegExp("^/login?find=pw"),
  },
  oauth: {
    path: "/oauth",
    re: new RegExp("^/oauth"),
    detail: (key: string) => `/oauth/${key.toLowerCase()}`,
  },
  subjectSearch: {
    path: "/subject/search",
    re: new RegExp("^/subject/search"),
  },
  subjectRecommend: {
    path: "/subject/recommend",
    re: new RegExp("^/subject/recommend"),
  },
  people: {
    path: "/people",
    re: new RegExp("^/people"),
  },
};

interface AuthPermissionRoutesType {
  my: RouteExp;
  myPremium: RouteExp;
  myScore: RouteExp;
}

export const authPermissionRoutes: AuthPermissionRoutesType = {
  my: {
    path: "/my",
    re: new RegExp("^/my"),
  },
  myPremium: {
    path: "/my/premium",
    re: new RegExp("^/my/premium"),
  },
  myScore: {
    path: "/my/score",
    re: new RegExp("^/my/score$"),
  },
};

interface RoutesType
  extends PublicRoutesType,
    AuthPermissionRoutesType,
    AdminRoutesType {}

export const routes: RoutesType = {
  ...publicRoutes,
  ...authPermissionRoutes,
  ...adminRoutes,
};
