const gql = async (query) => {
  return [{ id: 1, name: 'Bruce Wayne' }];
};

const fetch = async (url, options) => {
  if (url === "https://cloudimanage.com/auth/oauth2/token") {
    return {
      ok: true,
      status: 200,
      json: () => {
          return {
            "access_token": "access_token_12345",
            "refresh_token": "refresh_token",
            "token_type": "Bearer",
            "expires_in": 1800
          }
        }
    }
  }

  if (url === "https://cloudimanage.com/work/api/v2/customers/0000/documents") {
    return {
      ok: true,
      status: 200,
      json: () => {
          return {
            "data": {
              "results": [
                {
                  "author_description": "testtest",
                  "author": "test",
                  "checksum": "SHA256:7FCEFF211111111111111111111111111111111111111111111C",
                  "class": "DOC",
                  "class_description": "Document",
                  "content_type": "D",
                  "create_date": "2022-10-12T16:13:28.579Z",
                  "create_profile_date": "2022-10-12T16:13:28.579Z",
                  "database": "DEV",
                  "default_security": "public",
                  "document_number": 74,
                  "edit_date": "2022-10-12T16:13:28.579Z",
                  "edit_profile_date": "2022-10-12T16:13:28.579Z",
                  "file_create_date": "2022-10-12T16:13:28.579Z",
                  "file_edit_date": "2022-10-12T16:13:28.579Z",
                  "id": "Dev!74.1",
                  "is_checked_out": false,
                  "is_declared": false,
                  "is_external": false,
                  "is_external_as_normal": false,
                  "is_hipaa": false,
                  "is_in_use": false,
                  "is_restorable": true,
                  "iwl": "iwl:dms=cloudimanage.com&&lib=Dev&&num=74&&ver=1",
                  "last_user": "test",
                  "last_user_description": "testtest",
                  "name": "Assesment Result",
                  "operator_description": "testtest",
                  "operator": "test",
                  "retain_days": 10,
                  "size": 59760,
                  "subclass_description": "",
                  "extension": "PDF",
                  "type": "ACROBAT",
                  "type_description": "Adobe Acrobat Reader",
                  "version": 1,
                  "wopi_file_size_warning": false,
                  "workspace_id": "Dev!11",
                  "workspace_name": "test test Assesments",
                  "wstype": "document"
                }
              ]
            }
          }
        }
    }
  }

  if (url === "https://cloudimanage.com/work/api/v2/customers/0000/libraries/Dev/documents/Dev!11.1") {
    return {
      ok: true,
      status: 200,
      json: () => {
          return {
            "data": {
              "author_description": "testtest",
              "author": "test",
              "checksum": "SHA256:7FCEFF211111111111111111111111111111111111111111111C",
              "class": "DOC",
              "class_description": "Document",
              "content_type": "D",
              "create_date": "2022-10-12T16:13:28.579Z",
              "create_profile_date": "2022-10-12T16:13:28.579Z",
              "database": "DEV",
              "default_security": "public",
              "document_number": 11,
              "edit_date": "2022-10-12T16:13:28.579Z",
              "edit_profile_date": "2022-10-12T16:13:28.579Z",
              "file_create_date": "2022-10-12T16:13:28.579Z",
              "file_edit_date": "2022-10-12T16:13:28.579Z",
              "id": "Dev!11.1",
              "is_checked_out": false,
              "is_declared": false,
              "is_external": false,
              "is_external_as_normal": false,
              "is_hipaa": false,
              "is_in_use": false,
              "is_restorable": true,
              "iwl": "iwl:dms=cloudimanage.com&&lib=Dev&&num=74&&ver=1",
              "last_user": "test",
              "last_user_description": "testtest",
              "name": "Assesment Result",
              "operator_description": "testtest",
              "operator": "test",
              "retain_days": 10,
              "size": 59760,
              "subclass_description": "",
              "extension": "PDF",
              "type": "ACROBAT",
              "type_description": "Adobe Acrobat Reader",
              "version": 1,
              "wopi_file_size_warning": false,
              "workspace_id": "Dev!11",
              "workspace_name": "test test Assesments",
              "wstype": "document"
            }
          }
        }
    }
  }

  return {
    ok: true,
    status: 200,
    json: () => {
        return {}
    }
  }
}
