import User from "../models/user.model.js";
import Message from "../models/message.model.js";


export const getUsersForSidebar=async(req,res)=>{
    try {
        
        const loggedInUserId=req.user._id;
    
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in get users for sidebar controller",error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
    
}


export const getMessages=async(req,res)=>{
    try {
        const {id:userTochatId}=req.params
        const myId=req.user._id

        const message = await Message.find({
          $or: [
            { senderId: myId, receiverId: userTochatId },
            { senderId: userTochatId, receiverId: myId },
          ],
        });

        res.status(200).json(message);
    } catch (error) {
        console.log("error in get messages controller",error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {id:receiverId}=req.params
        const myId=req.user._id
        const {text,image}=req.body

        let ImageUrl;

        if (image) {
          const uploadResponse = await cloudinary.uploader.upload(image);
          ImageUrl = uploadResponse.secure_url;
        }   
        const message = new Message({
          senderId: myId,
          receiverId: receiverId,
          text,
          image: ImageUrl,
        });

        await message.save()

        // todo: realtime functionality goes here=> socket.id
        res.status(200).json(message)
    } catch (error) {
        console.log("error in send message controller",error.message)
        res.status(500).json({ message: 'Internal server error' });
    }
}