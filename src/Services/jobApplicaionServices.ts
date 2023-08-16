// import application from '../Model/AppliModel'
import user from '../Model/UserModel'
import job from '../Model/JobModel';
import mailuser from '../Mailer/applicaintMailer'

interface application {
  userId: string,
  jobId: string
}

//create job application
const createAplication = async (obj: application) => {
  await job.findByIdAndUpdate(obj.jobId, { $push: { applicantsId: obj.userId }})
  await user.findByIdAndUpdate(obj.userId, { $push: { appliedTo: obj.jobId } })
  // for mailer
  const userDetails = await user.findById(obj.userId)
  const jobDetails  = await job.findById(obj.jobId)
  if(userDetails?.email && jobDetails?.title)
  {
    mailuser(userDetails.email,jobDetails.title)
  }
}

// get existing job openings from DB  
const getJobListings = async () => {
  const result = await job.find()
  return result;
}

// get existing job openings by id from DB  
const getJobListingsId = async (id: string) => {
  const result = await job.findById(id)
  return result;
}


export { createAplication,getJobListings, getJobListingsId } 