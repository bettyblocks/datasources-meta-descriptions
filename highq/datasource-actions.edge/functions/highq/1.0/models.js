const I_SHEET = {
  getAllTemplates: {
    path: "/{version}/isheet/template",
    method: "GET",
  },
  getAllIsheets: {
    path: "/{version}/isheets",
    method: "GET",
  },
  // isheetRecordID
  getAllExternalId: {
    path: "/{version}/files/{fileId}/isheetRecordID",
    methos: "GET",
  },
};

export const MODEL_LOOKUP = {
  getOneSite: {
    path: "/{version}/sites/{siteid}",
    method: "GET",
  },
  getAllUserLoginRepost: {
    path: "/{version}/systemreports/userloginreport",
    method: "GET",
  },
  getAllComments: {
    path: "/{version}/comments",
    method: "GET",
  },
  ...I_SHEET,
};
