export const templateData = [
  {
    identifier: "invoice_payment_link",
    name: "Invoice Payment Link",
    subject: "Invoice Payment Link - Compass",
    subject_tags: [],
    message_body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://compass-website-assets.s3.us-east-1.amazonaws.com/logo_picture_email.png" alt="Compass Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
      <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">Compass</h1>
      <p style="color: #7f8c8d; margin: 5px 0;">Your Trusted Payment Partner</p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="color: #2c3e50; font-size: 16px; margin: 0;">Dear {{FIRST_NAME}},</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6;">Thank you for choosing Compass for your payment needs.</p>
    </div>

    <div style="background-color: #ecf0f1; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">📋 Invoice Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Invoice Number:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{INVOICE_ID}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Amount Due:</td>
          <td style="padding: 8px 0; color: #e74c3c; font-weight: bold; font-size: 16px;">{{AMOUNT}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Due Date:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{DUE_DATE}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Property:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{ADDRESS}}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #27ae60; margin: 0 0 15px 0; font-size: 18px;">💳 Payment Information</h3>
      <p style="color: #2c3e50; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
        This is your secure ACH payment link for the above invoice. Please click the button below to complete your payment:
      </p>
      <div style="text-align: center;">
        <a href="{{PAYMENT_URL}}" style="background-color: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Pay Now</a>
      </div>
    </div>

    <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
      <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">⚠️ Important Notes</h4>
      <ul style="color: #856404; font-size: 13px; line-height: 1.5; margin: 0; padding-left: 20px;">
        <li>This payment link is valid for ACH (Automated Clearing House) transactions</li>
        <li>Please ensure you have sufficient funds in your account</li>
        <li>Payment processing may take 1-3 business days</li>
        <li>A confirmation email will be sent upon successful payment</li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
      <p style="color: #7f8c8d; font-size: 13px; margin: 0;">If you have any questions, please contact our support team</p>
      <p style="color: #2c3e50; font-size: 14px; margin: 10px 0 0 0;">
        <strong>Compass</strong><br>
        123 Business Street, Suite 100<br>
        New York, NY 10001<br>
        📞 (555) 123-4567 | 📧 support@compass.com
      </p>
    </div>

  </div>
</div>`,
    message_body_tags: [
      "{{FIRST_NAME}}",
      "{{INVOICE_ID}}",
      "{{AMOUNT}}",
      "{{DUE_DATE}}",
      "{{ADDRESS}}",
      "{{PAYMENT_URL}}"
    ],
  },
  {
    identifier: "invoice_updated_link",
    name: "Invoice Updated Link",
    subject: "Invoice Updated - Compass",
    subject_tags: [],
    message_body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://compass-website-assets.s3.us-east-1.amazonaws.com/logo_picture_email.png" alt="Compass Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
      <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">Compass</h1>
      <p style="color: #7f8c8d; margin: 5px 0;">Your Trusted Payment Partner</p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="color: #2c3e50; font-size: 16px; margin: 0;">Dear {{FIRST_NAME}},</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6;">Your invoice has been updated. Please review the updated details below.</p>
    </div>

    <div style="background-color: #fff3cd; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">🔄 Invoice Update Notification</h3>
      <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">
        Your invoice has been updated with new information. Please review the changes and take action if needed.
      </p>
    </div>

    <div style="background-color: #ecf0f1; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">📋 Updated Invoice Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Invoice Number:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{INVOICE_ID}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Updated Amount Due:</td>
          <td style="padding: 8px 0; color: #e74c3c; font-weight: bold; font-size: 16px;">{{AMOUNT}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Due Date:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{DUE_DATE}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Property:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{ADDRESS}}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #27ae60; margin: 0 0 15px 0; font-size: 18px;">💳 Updated Payment Link</h3>
      <p style="color: #2c3e50; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
        Your payment link has been updated. Please use the button below to access the updated payment page:
      </p>
      <div style="text-align: center;">
        <a href="{{PAYMENT_URL}}" style="background-color: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Updated Invoice</a>
      </div>
    </div>

    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
      <h4 style="color: #495057; margin: 0 0 10px 0; font-size: 16px;">ℹ️ What Changed?</h4>
      <ul style="color: #495057; font-size: 13px; line-height: 1.5; margin: 0; padding-left: 20px;">
        <li>Invoice details may have been updated</li>
        <li>Payment amount may have changed</li>
        <li>Due date may have been modified</li>
        <li>Please review all changes before proceeding with payment</li>
      </ul>
    </div>

    <div style="background-color: #fff3cd; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
      <h4 style="color: #856404; margin: 0 0 10px 0; font-size: 16px;">⚠️ Important Notes</h4>
      <ul style="color: #856404; font-size: 13px; line-height: 1.5; margin: 0; padding-left: 20px;">
        <li>This is an updated invoice - please review all changes</li>
        <li>Previous payment links may no longer be valid</li>
        <li>Use the new payment link provided above</li>
        <li>Contact support if you have any questions about the changes</li>
      </ul>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
      <p style="color: #7f8c8d; font-size: 13px; margin: 0;">If you have any questions about these updates, please contact our support team</p>
      <p style="color: #2c3e50; font-size: 14px; margin: 10px 0 0 0;">
        <strong>Compass</strong><br>
        123 Business Street, Suite 100<br>
        New York, NY 10001<br>
        📞 (555) 123-4567 | 📧 support@compass.com
      </p>
    </div>

  </div>
</div>`,
    message_body_tags: [
      "{{FIRST_NAME}}",
      "{{INVOICE_ID}}",
      "{{AMOUNT}}",
      "{{DUE_DATE}}",
      "{{ADDRESS}}",
      "{{PAYMENT_URL}}"
    ],
  },
  {
    identifier: "connect_bank_account_link",
    name: "Connect Bank Account Link",
    subject: "Connect Your Bank Account - Compass",
    subject_tags: [],
    message_body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://compass-website-assets.s3.us-east-1.amazonaws.com/logo_picture_email.png" alt="Compass Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
      <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">Compass</h1>
      <p style="color: #7f8c8d; margin: 5px 0;">FURNISHED APARTMENTS</p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="color: #2c3e50; font-size: 16px; margin: 0;">Dear {{FIRST_NAME}},</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6; margin: 10px 0;">Thank you for choosing Compass Furnished Apartments! You've selected ACH as your payment method through the secure Plaid platform.</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6; margin: 10px 0;">To get started, please review the attached invoice and connect your bank account using the link below.</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6; margin: 10px 0;">Once your account is securely connected, payment will be processed according to the invoice due date.</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6; margin: 10px 0;">Going forward, invoices will be sent on the 20th of each month, with ACH payments processed automatically on the 28th for the following month.</p>
    </div>

    <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #27ae60; margin: 0 0 15px 0; font-size: 18px;">🔗 Connect Your Bank Account</h3>
      <p style="color: #2c3e50; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
        Click the button below to securely connect your bank account. This process is safe, encrypted, and takes only a few minutes.
      </p>
      <div style="text-align: center;">
        <a href="{{PAYMENT_URL}}" style="background-color: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Connect Bank Account</a>
      </div>
    </div>

    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ecf0f1;">
      <p style="color: #7f8c8d; font-size: 13px; margin: 0;">Need help connecting your bank account? Contact our support team</p>
      <p style="color: #2c3e50; font-size: 14px; margin: 10px 0 0 0;">
        <strong>Compass</strong><br>
        123 Business Street, Suite 100<br>
        New York, NY 10001<br>
        📞 (555) 123-4567 | 📧 support@compass.com
      </p>
    </div>

  </div>
</div>`,
    message_body_tags: [
      "{{FIRST_NAME}}",
      "{{DUE_DATE}}",
      "{{ADDRESS}}",
      "{{PAYMENT_URL}}"
    ],
  },
  {
    identifier: "invoice_pull_funds_link",
    name: "Invoice Pull Funds Link",
    subject: "Invoice Pull Funds - Compass",
    subject_tags: [],
    message_body: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
  <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://compass-website-assets.s3.us-east-1.amazonaws.com/logo_picture_email.png" alt="Compass Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
      <h1 style="color: #2c3e50; margin: 0; font-size: 28px;">Compass</h1>
      <p style="color: #7f8c8d; margin: 5px 0;">Your Trusted Payment Partner</p>
    </div>

    <div style="margin-bottom: 25px;">
      <p style="color: #2c3e50; font-size: 16px; margin: 0;">Dear {{FIRST_NAME}},</p>
      <p style="color: #34495e; font-size: 14px; line-height: 1.6;">Thank you for choosing Compass for your payment needs.</p>
    </div>

    <div style="background-color: #ecf0f1; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #2c3e50; margin: 0 0 15px 0; font-size: 18px;">📋 Invoice Details</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Invoice Number:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{INVOICE_ID}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Amount Due:</td>
          <td style="padding: 8px 0; color: #e74c3c; font-weight: bold; font-size: 16px;">{{AMOUNT}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Due Date:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{DUE_DATE}}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #34495e; font-weight: bold;">Property:</td>
          <td style="padding: 8px 0; color: #2c3e50;">{{ADDRESS}}</td>
        </tr>
      </table>
    </div>

    <div style="background-color: #e8f5e8; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
      <h3 style="color: #27ae60; margin: 0 0 15px 0; font-size: 18px;">💳 Payment Information</h3>
      <p style="color: #2c3e50; font-size: 14px; line-height: 1.6; margin: 0 0 15px 0;">
        This is your secure ACH payment link for the above invoice. Please click the button below to complete your payment:
      </p>
      <div style="text-align: center;">
        <a href="{{PAYMENT_URL}}" style="background-color: #27ae60; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Pay Now</a>
      </div>
    </div>
  `,
    message_body_tags: [
      "{{FIRST_NAME}}"
    ],
  },
  {
    identifier: "disconnect_bank_account_link",
    name: "Disconnect Bank Account Link",
    subject: "Bank Account Disconnected - Compass",
    subject_tags: [],
    message_body: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bank Account Disconnected</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .content {
            padding: 20px;
            background-color: #ffffff;
            border: 1px solid #e9ecef;
            border-radius: 8px;
        }
        .message {
            font-size: 16px;
            margin-bottom: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">
        <img src="https://compass-website-assets.s3.us-east-1.amazonaws.com/logo_picture_email.png" alt="Compass Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
        <h1>Bank Account Disconnected</h1>
    </div>
    
    <div class="content">
        <div class="message">
            <p>Hello {{FIRST_NAME}},</p>
            <p>Your bank account has been successfully disconnected from Compass.</p>
            <p>If you need to reconnect your bank account or have any questions, please contact our support team.</p>
        </div>
    </div>
    
    <div class="footer">
        <p>Thank you for using Compass</p>
    </div>
</body>
</html>`,
    message_body_tags: [
      "{{FIRST_NAME}}"
    ],
  },
]