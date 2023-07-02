import getPerismaInstance from "../utils/PrismaClient.js";

export const addMessages = async (req, res, next) => {
  try {
    const prisma = getPerismaInstance();
    const { message, from, to } = req.body;
    console.log(req.body);
    const getuser = onlineUsers.get(to);
    if (message && from && to) {
      const newMessage = await prisma.messages.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          reciever: { connect: { id: parseInt(to) } },
          messageStatus: getuser ? "delivered" : "sent",
        },
        include: { sender: true, reciever: true },
      });
      return res.status(201).send({ messages: newMessage });
    }
    return res.status(400).send("Message and from and to is required");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const prisma = getPerismaInstance();
    const { from, to } = req.params;
    const messages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from),
            recieverId: parseInt(to),
          },
          {
            senderId: parseInt(to),
            recieverId: parseInt(from),
          },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });

    const unReadMeassages = [];
    messages.map((message, index) => {
      if (message.messageStatus !== "read" && message.senderId === parseInt(to)) {
        messages[index].messageStatus = "read";
        unReadMeassages.push(message.id);
      }
    });

    await prisma.messages.updateMany({
      where: {
        id: { in: unReadMeassages },
      },
      data: {
        messageStatus: "read",
      },
    });
    return res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};
