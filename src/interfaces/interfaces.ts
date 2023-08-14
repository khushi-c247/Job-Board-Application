//Interface for Job
interface jobObj {
    title: {
        type: String
    },

    discription: {
        type: String,
    },

    requirements: {
        type: String,
    },

    salary: {
        type: Number,
    }
}

//interface for user object 
interface newUser {
    name: {
        type: String,
    },
    email: {
        type: String,
 
    },
    experience: {
        type: Number,
    },
    discription: {
        type: String,
    },
    graduationYear: {
        type: Number,

    },
    appliedTo: {
        type: [String]

    }
}


export { jobObj, newUser }