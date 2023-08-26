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