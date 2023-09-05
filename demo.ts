import Queue from "bull";
import milliseconds from "milliseconds";

const scheduler = new Queue("schedulerQueue", {
  defaultJobOptions: { repeat: { every: milliseconds.seconds(2) } },
});

const main = async () => {
  await scheduler.add({});
};

scheduler.process((_, done) => {
  console.log("Scheduled job");
  done();
});

main().catch(console.error);

// import Redis from  'ioredis'
// const redis = new Redis()
//  redis.set('key', 'value');
// const jobListing = undefined
// redis.set('jobListing', JSON.stringify(jobListing))

// redis.get('jobListing').then((data)=>{
// if(data) {
//   const cachedData = JSON.parse(data)
//   console.log(cachedData);
// }
// else {
//   console.log("no cached data");
// }})
