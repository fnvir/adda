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
        const user = await User.findById(id).select('+friends').populate('friends','firstName lastName picturePath location')
        res.status(200).json(user.friends);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

export const getNonFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('+friends')
        const others = await User.find({
            $and: [
                { _id: { $nin: user.friends } },
                { _id: { $ne: user._id } }
            ]
        }).select(['firstName', 'lastName', 'picturePath', 'location'])
        res.status(200).json(others);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};

// UPDATE
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        if(id==friendId)
            return res.status(400).json({message:"Can't add ownself as friend"})

        const self = await User.findById(id).select('+friends')
        const other = await User.findById(friendId).select('+friends')

        if (self.friends.some(e=>e.equals(friendId))) { //remove
            self.friends = self.friends.filter((_id) => _id != friendId);
            other.friends = other.friends.filter((_id) => _id != id);
            --self.friendCount
            --other.friendCount
        } else {
            self.friends.push(friendId);
            other.friends.push(id)
            ++self.friendCount
            ++other.friendCount
        }

        await self.save();
        await other.save();
        await self.populate('friends','firstName lastName picturePath location')
        res.status(200).json(self.friends);
    } catch (err) {
        console.error(err)
        res.status(404).json({ message: err.message });
    }
};
