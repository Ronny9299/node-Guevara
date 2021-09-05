import { schema, model, Schema } from 'mongoose';

const userSchema = new schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId,
    }]
}, {
    timestamps: true,
    versionKey: false,
});

export default userSchema;