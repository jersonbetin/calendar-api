import { UserRoute } from "./user.route";
import { AuthRoute } from "./auth.route";
import { EventRoute } from "./event.route";

export default [new UserRoute(), new AuthRoute(), new EventRoute()]