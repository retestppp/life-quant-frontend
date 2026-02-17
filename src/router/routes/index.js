import dashboard from "./dashboard.routes";
import health from "./health.routes";
import self from "./self.routes";
import reading from "./reading.routes";
import investment from "./investment.routes";
import profile from "./profile.routes";
import auth from "./auth.routes";

export default [
  ...dashboard,
  ...health,
  ...self,
  ...reading,
  ...investment,
  ...profile,
  ...auth,
];
