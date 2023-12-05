import mongoose from "mongoose";


const UserSchema=new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        lastName:{
            type:String,
            required:true,
            min:2,
            max:50,
        },
        email:{
            type:String,
            required:true,
            max:80,
            unique:true,
        },
        password:{
            type:String,
            required:true,
            min:7,
            max:20,
            select:false
        },
        picturePath:{
            type:String,
            default:"default.png",
        },
        friendCount:{
            type:Number,
            default:0
        },
        friends:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            select:false,
        }],
        location:String,
        occupation:String,
        profileViews:{type:Number,default:0},
    },
    {timestamps:true}
)

UserSchema.index({firstName:'text',lastName:'text',location:'text',occupation:'text'},
    {name:'user Index', weights: {firstName: 10, lastName: 10, location: 2, occupation: 1}});


const User=mongoose.model('User',UserSchema);
export default User;