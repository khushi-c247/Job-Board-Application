// import application from '../Model/AppliModel'
import User from '../Model/UserModel'
import Job from '../Model/JobModel';
import mailuser from '../Mailer/applicaintMailer'

interface application {
  userId: string,
  jobId: string
}

//create job application
const createAplication = async (obj: application) => {
  await Job.findByIdAndUpdate(obj.jobId, { $addToSet: { applicantsId: obj.userId }})
  await User.findByIdAndUpdate(obj.userId, { $addToSet: { appliedTo: obj.jobId } })

  // for mailer
  const userDetails = await User.findById(obj.userId)
  const jobDetails  = await Job.findById(obj.jobId)
  if(userDetails?.email && jobDetails?.title)
  {
    mailuser(userDetails.email,jobDetails.title)
  }
}

// get existing job openings from DB  
const getJobListings = async () => {
  const result = await Job.find()
  return result;
}

// get existing job openings by id from DB  
const getJobListingsId = async (id: string) => {
  const result = await Job.findById(id)
  return result;
}


export { createAplication,getJobListings, getJobListingsId } 