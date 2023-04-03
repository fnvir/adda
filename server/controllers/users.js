import User from "../models/User.js";

// read

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

// get basic info of user
export const getInfo=async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById(id).select(['-friends','-impressions','-occupation','-location']) // no need useless stuff
        const {firstName,lastName,...rest}=user._doc
        rest['fullname']=firstName+' '+lastName
        res.status(200).json(rest);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
}

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        if(id===friendId)
            return res.status(400).json({message:"Can't add ownself as friend"})
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((_id) => _id !== friendId);
            friend.friends = friend.friends.filter((_id) => _id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        res.status(200).send(user.friends);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};
