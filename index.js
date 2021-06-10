const fs = require("fs");
const { SendEmail } = require("./emailSender");

function loadSource(path) {
  const users = [];
  try {
    const data = fs.readFileSync(path, "utf8");
    const rows = data.split("\n");
    console.log(rows);
    for (let row of rows) {
      const [name, email, filename] = row.split(";");
      users.push({ name, email, filename });
    }
    return users;
  } catch (err) {
    console.error(err);
  }
}

async function start() {
  const users = loadSource("./source.txt");
  for (let user of users) {
    let result;
    try {
      const data = await SendEmail(user);
      result = `email sent to ${user.email} data: ${data}`;
    } catch (error) {
      console.log(`error sending email to ${user.email}`);
    } finally {
      fs.appendFileSync("results.txt", new Date() + " " + result + "\n");
    }
  }
}

start();
