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

export const getAllUsers = async (reeq, res, next) => {
  try {
    const prisma = getPerismaInstance();
    const users =await prisma.user.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        about: true,
      },
    });

    const usersGroupdeByInitialLetters = {};

    users.map((user) => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      !usersGroupdeByInitialLetters[initialLetter] &&
        (usersGroupdeByInitialLetters[initialLetter] = []);
      usersGroupdeByInitialLetters[initialLetter].push(user);
    });
    return res.status(200).send({ users: usersGroupdeByInitialLetters });
  } catch (error) {
    next(error);
  }
};
