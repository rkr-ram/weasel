import getPerismaInstance from "../utils/PrismaClient.js";

export const addMessages = async (req, res, next) => {
  try {
    const prisma = getPerismaInstance();
    const { messages, from, to } = req.body;
    const getuser = onlineUsers.get(to);
    if (messages && from && to) {
      const newMessage = await prisma.messages.create({
        data: {
          messages,
          sender: { connect: { id: parseInt(from) } },
          reciever: { connect: { id: parseInt(to) } },
          messageStatus: getuser ? "delivered" : "sent",
        },
        include:{sender:true,reciever:true}
      });
      return res.status(201).send({messages:newMessage})
    }
    return res.status(400).send("Message and from and to is required")
  } catch (error) {
    next(error);
  }
};
