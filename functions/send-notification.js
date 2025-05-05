const admin = require('firebase-admin');

const serviceAccount = {
  "type": "service_account",
  "project_id": "ompfinex-968c1",
  "private_key_id": "f2ce9cda1080fad4c7a1b16da21da4f7e974c4f2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDG+UHZu9m8fGQl\n+dpB6L9ZYm3VyBr8mbzQZ7+uAGG50D4CO3L/shRxZ1VV4qYaTt0Fm13+uKxWCQvU\noDWZ6q14TYH4NiK91ROuHYsW4yahhvrXjUTEiKqDbSmQJ0s0iHwDkfLI7qDDBCwE\nNF3E0OwuJrU5bDxGixEvuDrMkJW7pj7PYqJSOUuWMFZzXEBxy9tLKgzgwyyBItqE\nwnLuB+1xw6e3XXZ8PIstGmzISu32p0OJvptyF7jdL3Ux1ML+NxpH223o5iplmFkR\nsQCoHRa3pxHqxJHuVIFCKdiMEFC/mIyUzxjyTQZS5NZ4JxIcm5LFwjTf17cQg01B\nygDTnVthAgMBAAECggEACMsli0JDc1JyiSCfkhvfkAta9BCjy6/eMb4yERY0e3Yt\n9WKL+Ku1vlTNJ05s3ZsIZtno16vw9tzvvEoH0Gl4GOnhAXegBbB77g0hc2We1JLu\n9VWJmV96XLRXesbXyqaxB2Xc+18bdP7zVIy9a6g5lekRR4xGZi45eFjNpXKK4Yf5\nhefX1qfUtrJENWLKmiz8OgaaZpO1X704oG7zFvh/AfcRIXHgAJ75L6JTmfWNfQYZ\nfKKzpkFuEdv3ICLBPDW8lznAklp8B1btecOebG9XDpEiauSrDZfnaL9QnhDiw0wy\nJMv3UNVrlmw4lOHnJvGKtpuje4gOs0brKDMkDLvdyQKBgQDq2XjMqyBjcsZemX57\nECNKfUljzdGKtbHdT6VAdZTqhWj1L2zaDqck45GX+hvjYHnxzxI14EnMhAExO3zQ\nraf47soT3+1Cb6gfccpMngUYChO1FbIxPrDUNUqKJT33gJV0PmGwEv8314M7WA4G\n6I+zgBc7at8pwTDhRKlzNugJmQKBgQDY5KghgqrJ+V2rNOSnuD9Lip6b9G4NGbAh\ngnIDSlCnNClejUlpLOXhnvKetbWPF9T/jaVgxG6DuoYtl3MD5UhciXZOi+lkxxvI\nYn9aHNSXBSZLlV7szK2WCMw6DNgWNgLplPZJvq33gdE3JrppffE7Xlc7PtpTUilz\nFRYwnmJNCQKBgQDT3JA/gvla/cW6vZn+htZvcorsgFZSXgsw7ZLUjb5juyquVbRL\nGwDqJGnJwpW6D+Syoe15sPaii0tQEKxOzPpFdZXTTCWL05LFmy+24q8RurWAnSv9\nhOKc7d5qtaIrT1KEZWpXHywiQkdfF9a/oLlSY3GR5p2f22qvLfP3vkahsQKBgQDP\nPv4gtxi20Z5dX7c1Q+rHJfeUkaUuw2L3QgvrdPFIM6FsBZkl9I7cXeL7ICoSRvVy\nE0j5A/mNyYc4vURbbpUMRxVSzIIBl/fGK8gAtRe2DmefRWVk49biTBnJRkicQJPb\n2kjUAm182QCusETjVEJTNjwoElDP2OxeWMHRRyYq8QKBgDdyh73yo/qmM7gXMo4l\nMu4Fmpls/UHTf5zwesKyk+iKtxqBZJPMlincduWCm+IdPhNWW4Q6u+ck1jsappF1\ndFNuzeT9XYxm2a6umzwoHtY+6NPM7BqE8ub6RIZccyYGgJd1yq2z4gfL6CYhCUWG\nddMj7taOy259yTR8j2pZVdFR\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@ompfinex-968c1.iam.gserviceaccount.com",
  "client_id": "116146490512797174047",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40ompfinex-968c1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ompfinex-968c1-default-rtdb.firebaseio.com"
});

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }

  const { message, token } = await request.json();

  const payload = {
    notification: {
      title: "نوبت جدید",
      body: message,
      icon: "https://via.placeholder.com/192"
    }
  };

  try {
    await admin.messaging().send({
      token: token,
      notification: payload.notification
    });
    return new Response(JSON.stringify({ message: "نوتیفیکیشن با موفقیت ارسال شد" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "خطا در ارسال نوتیفیکیشن: " + error.message }), { status: 500 });
  }
}