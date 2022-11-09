const I_SHEET = {
  getAllTemplates: {
    path: "/{version}/isheet/template",
    method: "GET",
  },
  getAllColumns: {
    path: "/{version}/isheets/{isheetid}/columns",
    method: "GET",
  },
  getAllIsheets: {
    path: "/{version}/isheets",
    method: "GET",
  },
  getOneTemplateISheet: {
    path: "/{version}/isheet/templateisheet?templateid={templateid}",
    method: "GET",
  },
  getAllExternalId: {
    path: "/{version}/files/{fileId}/isheetRecordID",
    methos: "GET",
  },
};

const DOCUMENT_REOSURCES = {
  getOneFileDetail: {
    path: "/{version}/files/{fileid}",
    method: "GET",
  },
  getOneFolder: {
    path: "/{version}/folders/{folderid}",
    method: "GET",
  },
  getOneFile: {
    path: "/{version}/files/{fileid}/content",
    method: "GET",
  },
  getAllFile: {
    path: "/{version}/files",
    method: "GET",
  },
  getAllFolders: {
    path: "/{version}/folders/{folderid}/files",
    method: "GET",
  },
  getAllFolderPermissions: {
    path: "/{version}/folders/{folderid}/permissions",
    method: "GET",
  },
  getAllAudits: {
    path: "/{version}/files/{fileid}/audit",
    method: "GET",
  },
  getAllFolderPermissions: {
    path: "/{version}/files/{fileid}/permissions",
    method: "GET",
  },
  getAllStatusLists: {
    path: "/{version}/files/statuslist",
    method: "GET",
  },
  getAllChanges: {
    path: "/{version}/changes",
    method: "GET",
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
  ...DOCUMENT_REOSURCES,
};
