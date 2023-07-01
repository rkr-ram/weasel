import getPerismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ msg: "Email is required", status: false });
    }
    const prisma = getPerismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User Found", status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, image: profilePicture, about } = req.body;
    if (!email || !name) {
      return res.send("Email,namea are important");
    }
    const prisma = getPerismaInstance();
    const user = await prisma.user.create({
      data: { name, email, profilePicture, about, createdAt: new Date() },
    });
    return res.json({ msg: "Success", status: true, data: user });
  } catch (error) {
    next(error);
  }
};
