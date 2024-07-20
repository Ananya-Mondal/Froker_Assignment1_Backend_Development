<center><h1>Backend Development Assignment</h1></center>
<h2>APIs</h2>
<h3>1. Approve Application During Signup</h3>
Endpoint: POST http://127.0.0.1:3010/signup

a) Accessing this end point without any payload.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img1.png" />
b) Accessing this end point with valid payload.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img2.png" />
c) Accessing this end point with duplicate email.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img3.png" />
d) Accessing this end point with a payload age is lessthan 20 or salary lessthan 25k return application_is_approve status false
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img4.png" />

<h4>Database View after SignUp</h4>
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img19.png" />

<h3>2. Login API</h3>
Endpoint: POST http://127.0.0.1:3010/login

a) Accessing this end point without any payload.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img5.png" />
b) Accessing this end point with valid payload. It return a access token. We need to use this token to access any other Api
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img6.png" />
c) Accessing this end point with valid payload but wrong credential.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img7.png" />
d) Accessing this end point with valid payload but without token.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img8.png" />
e) Accessing this end point with valid payload but without token.
<img src="https://github.com/Ananya-Mondal/Froker_Assignment1_Backend_Development/blob/main/img9.png" />
  
