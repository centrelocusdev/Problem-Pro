const mongoose = require('mongoose');
const User = require('../models/userModal');

const questionsSchema = mongoose.Schema({
    Grade: {
        type: String,
        default: "Grade"
    },
    Subject: {
        type: String,
        default: "Any Subject"
    
    },
    LessonDescription: {
        type: String,
        Any: "Any Description"
        
    },
    QuestionsData: {
        type:String,
    },
    User: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: [true, 'Question must belong to User']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
      },

},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
)

    // // Virtual Populating the users:
    // questionsSchema.pre(/^find/, function (next) {     
    //     this.populate({
    //       path: 'User',
    //       select: '_id',
    //     });
    //     next();
    //   });




const Question = mongoose.model('Question' , questionsSchema);
module.exports = Question;