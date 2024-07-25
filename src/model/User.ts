import mongoose , { Schema ,Document} from "mongoose";



export interface Message extends Document {
    content: string;
    createAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createAt: { type: Date, required: true, default: Date.now }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpire: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
    createAt: Date;
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, 
        required: [true,"Username is required"],
        trim: true,
        unique: true
    },
    email: { type: String, 
        required: [true,"Email is required"],
        trim: true,
        unique: true,
        match:[ /.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: { type: String, required: [true, "Verify Code is required"] },
    verifyCodeExpire: { type: Date, required: [true, "Verify Code expiry is required"] },
    isVerified: { type: Boolean, 
        default: false
    },
    isAcceptingMessages: { type: Boolean, 
        default: true
    },
    messages: [MessageSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;