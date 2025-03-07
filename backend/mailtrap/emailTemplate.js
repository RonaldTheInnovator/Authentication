export const EMAIL_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
</head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.8; color: #444; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #15243c; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">Confirm Your Email</h1>
  </div>
  <div style="background-color: #FFF4F4; padding: 25px; border: 1px solid #FFCCCC; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin: 0 0 15px;">Hi there,</p>
    <p style="margin: 0 0 20px;">We’re excited to have you onboard! To start exploring, please verify your email address by using the code below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; font-size: 36px; font-weight: bold; color: #15243c; padding: 10px 20px; border: 2px dashed #15243c; border-radius: 5px;">
        {verificationCode}
      </span>
    </div>
    <p style="margin: 0 0 20px;">This code is valid for only 15 minutes. Please complete the verification within this time frame.</p>
    <p style="margin: 0;">If you didn’t request this email, please disregard it.</p>
    <p style="margin: 30px 0 0;">Best regards,<br><strong>Your Support Team</strong></p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
    <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
    <p style="margin: 5px 0 0;">&copy; 2025 Your Company. All rights reserved.</p>
  </div>
</body>
</html>
`;


export const PASSWORD_RESET_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f7f7f7;
    }
    .header {
      background: #15243c;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 32px;
    }
    .content {
      background-color: white;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
    }
    .button-container {
      text-align: center;
      margin: 40px 0;
    }
    .button-container a {
      background-color: #15243c;
      color: white;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      font-size: 18px;
      transition: background-color 0.3s ease;
    }
    .button-container a:hover {
      background-color: #e04e2f;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #888;
      font-size: 0.9em;
    }
    .footer p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
  </div>

  <div class="content">
    <p>Hi there,</p>
    <p>We received a request to reset your password. If you did not make this request, please ignore this email.</p>
    <p>To reset your password, simply click the button below:</p>

    <div class="button-container">
      <a href="{resetURL}">Reset My Password</a>
    </div>

    <p>This link will expire in 30 minutes for your security.</p>
    <p>Best regards,<br>Your App Team</p>
  </div>

  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_CONFIRMATION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f7f7f7;
    }
    .header {
      background-color: #15243c;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h1 {
      color: white;
      margin: 0;
      font-size: 32px;
    }
    .content {
      background-color: white;
      padding: 20px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .content p {
      font-size: 16px;
      line-height: 1.6;
      color: #555;
    }
    .success-icon {
      background-color: #28a745;
      color: white;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 50%;
      font-size: 32px;
      margin: 20px auto;
      text-align:center;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #888;
      font-size: 0.9em;
    }
    .footer p {
      margin: 5px 0;
    }
    .list-item {
      margin-left: 20px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Successfully Updated</h1>
  </div>

  <div class="content">
    <p>Hi there,</p>
    <p>We wanted to let you know that your password has been successfully reset. You can now log in using your new password.</p>
    
    <div class="success-icon">
      ✓
    </div>

    <p>If you didn’t initiate this change, please contact our support team right away to secure your account.</p>
    <p>Thank you for being vigilant in keeping your account safe!</p>
    <p>Best regards,<br>Your App Team</p>
  </div>

  <div class="footer">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;
