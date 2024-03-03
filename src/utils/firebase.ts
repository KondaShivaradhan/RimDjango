const firebaseConfig = {
  apiKey: "AIzaSyAeZsBmCD8YH4S4dH8YVUOd2qUbqqhI7H4",
  authDomain: "excalidraw-7a474.firebaseapp.com",
  projectId: "excalidraw-7a474",
  storageBucket: "excalidraw-7a474.appspot.com",
  messagingSenderId: "842379270351",
  appId: "1:842379270351:web:02f432622fcaf589937fba",
  measurementId: "G-HEM1Q2WXF8",
};

import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const admin = require("firebase-admin");
// admin.initializeApp(
//   {
//     credential: admin.credential.cert({
//       type: "service_account",
//       project_id: "excalidraw-7a474",
//       private_key_id: "04f8792561d9802a7096eff4fec4796277cc2e77",
//       private_key:
//         "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUvFBBxWhADsmr\nqxXCBq1JFJGY+trLYyz8zVRvfBI8KZy3h0QbR5ICjkW0Xng/vdfSLq28zHBt7Zr8\n286aucnaHgjtgtp/RJ2WkP20j1WobNx2fG/NFo4oCSrCb/LZpsIHY+tCCugYJAfy\niw+mQFj4RMRRXkfETDnzqOr+cyqGWlelOtK4wFvJqncHl5C2/eLZi4yyfrf9m/Sm\nW8cZoHuJhyBvoBaz9Obc54sadM7hk3FQIR+ggJoES/f5nwmztigQmbg6qthedLUK\nVKtwHJAwYUMQR/GYD/irxKSVUKebJfpaiUQr1RZkAnkldmjEvJ09hhJtUmxnF3W7\n5ObCXOYdAgMBAAECggEACZAlEeGFLy80OMkuhDPlMuBzbxRb+n1FMHjsP6HI01zy\nkltMXfunT+pBYZQ8Y47LgFxXd97mMK85Cp6AZXLiH1fUh57k+Q9amYp3gYNAxOxA\n7Y5ZKuTTHZBfUzKa+PMPoSWDxBKK8zhn2WinCC+1eLsFK10mPKERDdFT0Knrd0lh\nJuiYbjx1dmnWvP90c+3jiWzYvmiQyAddAcGvuatOB/PBHG+Cxc43WLqutSlvYD6O\nXI8w9JzsidKZ/6x1/Ktkk5/lv615+A9hUXjL4v/sHTAfTXKFS3zWymGh6b767nLC\nUlUpoR5TInYe2WZPNw/+/rQgU3LXxcGeFWMYMHgXyQKBgQDEaa31PkI3mk+YVWp3\ntG2ZH/nyDFPaPCxcTGbce+1uvSoN0WXf6QHsD6Ed93KKcIVXjr5h40BzQ35JAZ8t\nemuKa4/6XonucGVn1b2P7BRpszo2DMd8EUrGjEWfBqWEpTmYPEc/F4BicTaS0JXx\npxbAfmsFVi0v5gVs6eYFqWwp+QKBgQDB282MCJJMp5FbR+v5E26tnWqmngH3tPE5\nyAPc6OFJUtL2BaM6nb/NAyGdEMYuCwYTIFMz2x5FqWPBZAWH66Acgxf3NOQTUOZQ\nyJ/VjiitS04dq8y4amAGOv3nFOUGG2lxcAxYsIQDty6LZcWXEJK0zdyE0NfqApaf\nnDPplXfGRQKBgQChmln46ErPOPW4Xr8E0r1COd8K2j2717qgDnSrgIOwk4+gYuOx\nQSPFuG5WG5xwb3gmvFnEbJhAvg2Pv/faEVmeQDXsSBCw0GV+84vOeO2qsj547jbL\ny+Z8SjmWSH+zDca/jQkJziph1MiUL27Pryy3IMypTWhMerOIE0Kg8e7+8QKBgGer\nSt2TC+GwTrxY1ulpKevwXcNihjzYZ5P10ZMGesvCXgyw8Rx8lcBl50jeWozu2j3K\nMJRvnl20eyNFgOux5vq4ZE2P3FQ0FCapU0hZ8IjT159oa19Hi7hpPbSg6OT+LcI7\nIG8hXke6Y0qqjyL8+udzm3TvVjfPUItkdiJ5CwddAoGAF1/RYvK2CD5lloIUlcqH\nlyXcpUCi5+INoUMCYihjYcDgDYZJj9JeBbjbLkW4KoxhMvsgrlMF1fQ+jc7LNR8Q\nI69StPcL8a4gtKmy8fWEIV6VgJmtCN6LeMG6LloVSfQEHK3EZMnShtG1vwPRTWI/\nJd+pRQphvmF7/jsPdEB0qUs=\n-----END PRIVATE KEY-----\n",
//       client_email:
//         "firebase-adminsdk-9m4vp@excalidraw-7a474.iam.gserviceaccount.com",
//       client_id: "111864512251518379203",
//       auth_uri: "https://accounts.google.com/o/oauth2/auth",
//       token_uri: "https://oauth2.googleapis.com/token",
//       auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//       client_x509_cert_url:
//         "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9m4vp%40excalidraw-7a474.iam.gserviceaccount.com",
//       universe_domain: "googleapis.com",
//     }),
//     databaseURL: "https://excalidraw-7a474-default-rtdb.firebaseio.com",
//   },
//   "Excali"
// );

const app = initializeApp(
  {
    credential: admin.credential.cert({
      type: "service_account",
      project_id: "excalidraw-7a474",
      private_key_id: "04f8792561d9802a7096eff4fec4796277cc2e77",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCUvFBBxWhADsmr\nqxXCBq1JFJGY+trLYyz8zVRvfBI8KZy3h0QbR5ICjkW0Xng/vdfSLq28zHBt7Zr8\n286aucnaHgjtgtp/RJ2WkP20j1WobNx2fG/NFo4oCSrCb/LZpsIHY+tCCugYJAfy\niw+mQFj4RMRRXkfETDnzqOr+cyqGWlelOtK4wFvJqncHl5C2/eLZi4yyfrf9m/Sm\nW8cZoHuJhyBvoBaz9Obc54sadM7hk3FQIR+ggJoES/f5nwmztigQmbg6qthedLUK\nVKtwHJAwYUMQR/GYD/irxKSVUKebJfpaiUQr1RZkAnkldmjEvJ09hhJtUmxnF3W7\n5ObCXOYdAgMBAAECggEACZAlEeGFLy80OMkuhDPlMuBzbxRb+n1FMHjsP6HI01zy\nkltMXfunT+pBYZQ8Y47LgFxXd97mMK85Cp6AZXLiH1fUh57k+Q9amYp3gYNAxOxA\n7Y5ZKuTTHZBfUzKa+PMPoSWDxBKK8zhn2WinCC+1eLsFK10mPKERDdFT0Knrd0lh\nJuiYbjx1dmnWvP90c+3jiWzYvmiQyAddAcGvuatOB/PBHG+Cxc43WLqutSlvYD6O\nXI8w9JzsidKZ/6x1/Ktkk5/lv615+A9hUXjL4v/sHTAfTXKFS3zWymGh6b767nLC\nUlUpoR5TInYe2WZPNw/+/rQgU3LXxcGeFWMYMHgXyQKBgQDEaa31PkI3mk+YVWp3\ntG2ZH/nyDFPaPCxcTGbce+1uvSoN0WXf6QHsD6Ed93KKcIVXjr5h40BzQ35JAZ8t\nemuKa4/6XonucGVn1b2P7BRpszo2DMd8EUrGjEWfBqWEpTmYPEc/F4BicTaS0JXx\npxbAfmsFVi0v5gVs6eYFqWwp+QKBgQDB282MCJJMp5FbR+v5E26tnWqmngH3tPE5\nyAPc6OFJUtL2BaM6nb/NAyGdEMYuCwYTIFMz2x5FqWPBZAWH66Acgxf3NOQTUOZQ\nyJ/VjiitS04dq8y4amAGOv3nFOUGG2lxcAxYsIQDty6LZcWXEJK0zdyE0NfqApaf\nnDPplXfGRQKBgQChmln46ErPOPW4Xr8E0r1COd8K2j2717qgDnSrgIOwk4+gYuOx\nQSPFuG5WG5xwb3gmvFnEbJhAvg2Pv/faEVmeQDXsSBCw0GV+84vOeO2qsj547jbL\ny+Z8SjmWSH+zDca/jQkJziph1MiUL27Pryy3IMypTWhMerOIE0Kg8e7+8QKBgGer\nSt2TC+GwTrxY1ulpKevwXcNihjzYZ5P10ZMGesvCXgyw8Rx8lcBl50jeWozu2j3K\nMJRvnl20eyNFgOux5vq4ZE2P3FQ0FCapU0hZ8IjT159oa19Hi7hpPbSg6OT+LcI7\nIG8hXke6Y0qqjyL8+udzm3TvVjfPUItkdiJ5CwddAoGAF1/RYvK2CD5lloIUlcqH\nlyXcpUCi5+INoUMCYihjYcDgDYZJj9JeBbjbLkW4KoxhMvsgrlMF1fQ+jc7LNR8Q\nI69StPcL8a4gtKmy8fWEIV6VgJmtCN6LeMG6LloVSfQEHK3EZMnShtG1vwPRTWI/\nJd+pRQphvmF7/jsPdEB0qUs=\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-9m4vp@excalidraw-7a474.iam.gserviceaccount.com",
      client_id: "111864512251518379203",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9m4vp%40excalidraw-7a474.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    }),
    databaseURL: "https://excalidraw-7a474-default-rtdb.firebaseio.com",
  },
  "excali"
);

export const db = getFirestore(app);

// interfaces
export interface UserFB {
  email: string;
  ispaid: boolean;
  data: Board[];
  pass: string;
}

export interface Board {
  name: string;
  elements: Object;
  appState: Object;
}
