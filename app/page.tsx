import Image from "next/image";
import connectDb from "./lib/db";
import User from "./models/user.model";
import { auth } from "./auth";
import { redirect } from "next/navigation";
import EditRoleMobile from "./components/EditRoleMobile";

export default async function Home() {
  await connectDb();
  const session = await auth();
  const user = await User.findById(session?.user?.id);
  if (!user) {
    redirect("/login");
  }

  const InComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");
  if (InComplete) {
    return <EditRoleMobile />;
  }

  return <div></div>;
}
