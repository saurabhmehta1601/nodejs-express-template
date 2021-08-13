import crypto from "crypto";
export default () => crypto.randomBytes(40).toString("hex");
