# Newsletter-Signup
Sign up to my newsletter and receive monthly updates from me. This web application is fully functioning and hosted on the Cyclic platform

**Tools used:**
1. ExpressJS
2. mailchimp (for storing the emails and names)
3. HTML, CSS, JS, Bootstrap

Note: if repo is cloned locally, a SECRET_KEY variable needs to be added to the .env file and dotenv package needs to be installed to configure environment
variables. node/nodemon can be to run app.js to start server on port 3000.
The newsletter-signup server receives POST request when user info is submitted and sends a POST request containing this data to the mailchimp API. If mailchimp returns
status code 200 everything is OK and you are signed up.
