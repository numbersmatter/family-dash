import {
  getApps as getServerApps,
  getApp,
  initializeApp as initializeServerApp,
  cert as serverCert,
} from "firebase-admin/app";

// if (getServerApps().length === 0) {
//   let config;
//   if (process.env.NODE_ENV === "development" && !process.env.SERVICE_ACCOUNT) {
//     console.warn(
//       "Missing SERVICE_ACCOUNT environment variable, using local emulator"
//     );
//     // https://github.com/firebase/firebase-admin-node/issues/776
//     process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";
//     process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
//     config = {
//       projectId: process.env.PROJECT_ID,
//     };
//   } else if (!process.env.SERVICE_ACCOUNT) {
//     throw new Error("Missing SERVICE_ACCOUNT environment variable");
//   } else {
//     try {
//       const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
//       config = {
//         credential: serverCert(serviceAccount),
//         storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
//       };
//     } catch {
//       throw Error("Invalid SERVICE_ACCOUNT environment variable");
//     }
//   }
//   initializeServerApp(config);
// }

const service_account = process.env.SERVICE_ACCOUNT ?? "";

const serviceAccount = JSON.parse(service_account);

export const intializeFb = () => {
  const service_account = process.env.SERVICE_ACCOUNT ?? "no-id";
  const project_id = process.env.GOOGLE_CLOUD_PROJECT ?? "no-id";
  let config;

  try {
    const serviceAccount = JSON.parse(service_account);
    config = {
      credential: serverCert(serviceAccount),
      storageBucket: `${process.env.PROJECT_ID}.appspot.com`,
      projectId: project_id,
    };
  } catch {
    throw Error("Invalid SERVICE_ACCOUNT environment variable");
  }
  try {
    const checkApp = getApp("drivethru");
    return checkApp;
  } catch {
    return initializeServerApp(config, "drivethru");
  }
};

// export const firebase = getServerApps().length
//   ? getServerApps()[0]
//   : initializeServerApp({
//       projectId: process.env.PROJECT_ID,
//       credential: serviceAccount,
//     });
