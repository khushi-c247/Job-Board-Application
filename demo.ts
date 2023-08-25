import Queue from "bull";
import milliseconds from "milliseconds";

const queue = new Queue('my-first-queue');


  const main = async () => {
    await queue.add({ name: "John", age: 30 }, {attempts :2});
  };
  
  queue.process((job, done) => {
    try {
        console.log(job.data);
        done();
    } catch (error) {
        console.log(error);
        
    }

  });
  
  main().catch(console.error);