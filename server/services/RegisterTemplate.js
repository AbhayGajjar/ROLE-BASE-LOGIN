exports.registerEmail = (username) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome Email</title>
        <style>
          /* Internal CSS for email styling */
          body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
          }
          .container {
            width: 100%;
            padding: 20px;
            background-color: #f4f4f4;
          }
          .content {
            width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: center;
          }
          h1 {
            color: #333;
          }
          p {
            font-size: 16px;
            color: #555;
          }
          .btn {
            display: inline-block;
            background-color: #4CAF50;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin-top: 20px;
          }
          .footer {
            font-size: 12px;
            color: #aaa;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <h1>Welcome, ${username}!</h1>
            <p>Thank you for registering with us. We're excited to have you onboard!</p>
            <p>Feel free to explore our platform and let us know if you have any questions.</p>
            <a href="https://yourwebsite.com/login" class="btn">Login to Your Account</a>
            <div class="footer">
              © 2024 Your Company. All rights reserved.
            </div>
          </div>
        </div>
      </body>
    </html>
    `;
  };
  