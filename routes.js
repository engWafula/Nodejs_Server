const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url == "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input name="message" type="text"/> <button type="submit">submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url == "/message" && method == "POST") {
    const body = [];

    //event listener
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    //event listener
    req.on("end", () => {
      const parsedData = Buffer.concat(body).toString();
      const message = parsedData.split("=")[0];
      fs.writeFile("messages.txt", message, (err) => {
    
      });
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
};
