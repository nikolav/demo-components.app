/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    "app.name": "app0",
    MONGODB_URI:
      "mongodb+srv://0K3qnYek3DR:RovrWqBrqk5@cluster0.ymotm.mongodb.net/dhs3ERJKuef?retryWrites=true&w=majority",
    SUPABASE_URL: "https://dooobbgqjthlgnrwsfpw.supabase.co",
    SUPABASE_KEY:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvb29iYmdxanRobGducndzZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1NTcxNzMsImV4cCI6MTk2OTEzMzE3M30.8ed9ta3guh_A-YzHzc1qmUP7JzIf8BMSMspBnddX-SE",
  },
  // images: {
  //   domains: [],
  // },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};

module.exports = nextConfig;
