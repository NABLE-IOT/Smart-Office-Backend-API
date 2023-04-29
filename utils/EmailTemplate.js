const EmailTemplate = (OTP, userName) => {
  return `
  <div
  style="
    background: url(https://img.freepik.com/free-vector/white-gray-geometric-pattern-background-vector_53876-136510.jpg?w=2000);
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    width: 100%;
    padding-top: 5%;
    padding-bottom: 5%;
  "
>
  <div
    style="
      background-color: #f5f5f5;
      border: 3px solid white;
      padding: 10px 30px;
      width: 400px;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    "
  >
    <h2
      style="
        background-color: #f68122;
        text-align: center;
        padding: 20px;
        color: white;
        letter-spacing: 1px;
        line-height: 30px;
        font-weight: 600;
      "
    >
      Welcome To N*able Smart Office
    </h2>

    <h3 style="color: black; font-weight: 600; letter-spacing: 1px">
      Hello ${userName},
    </h3>

    <p style="letter-spacing: 1px; text-align: justify">
      Please be aware that your credentials have been added to our system.
      You can login to our system using temporary password.
    </p>

    <p style="letter-spacing: 1px; font-weight: 600">
      Your Temporary Password is : ${OTP}
    </p>

    <p style="letter-spacing: 1px">Thank You,</p>
    <p style="letter-spacing: 1px">Application Team.</p>
  </div>
</div>
 
  `;
};

export { EmailTemplate };
