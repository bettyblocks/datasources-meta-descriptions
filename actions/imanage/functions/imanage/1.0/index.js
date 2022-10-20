import lodash from "lodash";

const BASEURL = "https://cloudimanage.com/work/api/v2/customers"

const MODEL_LOOKUP = {
    allDocuments: {
        url: `${BASEURL}/{customerId}/documents`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data.results
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allWorkspaces: {
        url: `${BASEURL}/{customerId}/workspaces`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data.results
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allDocumentNVP: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}/name-value-pairs`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allFolders: {
        url: `${BASEURL}/{customerId}/folders`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allFolderChildren: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}/children`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allDocumentHistory: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}/history`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allDocumentUserHistory: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}/history/users`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    allLibraryCheckedOutDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/checkout`,
        method: "GET",
        processResponse: (respose) => {
            return respose.data
        },
        returnFormat: (results) => {
            return {
                results: results,
                totalCount: results.length, 
            }
        }
    },
    oneDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}`,
        method: "GET",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    oneWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces/{workspaceId}`,
        method: "GET",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    oneFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}`,
        method: "GET",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    updateDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}`,
        method: "PATCH",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    updateWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspace/{workspaceId}`,
        method: "PATCH",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    updateFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folder/{folderId}`,
        method: "PATCH",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    createFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces/{workspaceId}/folders`,
        method: "POST",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    createSubFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}/subfolders`,
        method: "POST",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    createWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces`,
        method: "POST",
        processResponse: (respose) => {
            return [respose]
        },
        returnFormat: (results) => {
            return results
        }
    },
    deleteDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}`,
        method: "DELETE",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    deleteFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}`,
        method: "DELETE",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    },
    deleteWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces/{workspaceId}`,
        method: "DELETE",
        processResponse: (respose) => {
            return [respose.data]
        },
        returnFormat: (results) => {
            return results
        }
    }

}

const mapKeys = (key) => {
    if (["size", "class", "type"].includes(key)) {
      return `document_${key}`;
    } else {
      return key;
    }
  };
  
  const pruneId = (value, libraryName) => {
      let combinedId = lodash.trimStart(value.replace(libraryName, ""), "!");
      let [id] = combinedId.split(".")
      return parseInt(id)
  }
  
  const mapResults = (data, requestedFields, libraryName) => {
    return data.map((map) => {
      let newMap = {};

      for (let [key, value] of Object.entries(map)) {
        let convertedKey = lodash.camelCase(mapKeys(key));
        if (requestedFields.includes(convertedKey) || requestedFields.includes("all")) {
            if (convertedKey == "id") {
                newMap[convertedKey] = pruneId(value, libraryName);
            } else {
                newMap[convertedKey] = value;
            }
        } else {
            newMap;
        }
      };

      return newMap;
    });
  };

  const fetchData = async (url, method, authToken, body) => {
    let request = {
        method: method,
        headers: { "Content-Type": "application/json", "X-Auth-Token": authToken }
    }
    
    if (method != 'GET') {
        request['body'] = body
    }

    let response = await fetch(url, request);

    return response.json();
  }

const imanage = async ({name, params, customerId, libraryName, workspaceId, folderId, documentId, authToken}) => {
    const requestedFields = typeof(params) == "undefined" ? ["all"] : params.select || ["all"];
    const requestData = typeof(params) == "undefined" ? {} : JSON.stringify(params.input) || {};
    const MODEL_RESOURCE = MODEL_LOOKUP[name]

    if (MODEL_RESOURCE == undefined) {
        throw Error(`${name} is not implemented`)
    }

    const url = MODEL_RESOURCE.url
        .replace("{customerId}", customerId)
        .replace("{libraryName}", libraryName)
        .replace("{documentId}", documentId)
        .replace("{folderId}", folderId)
        .replace("{workspaceId}", workspaceId)

    let response = await fetchData(url, MODEL_RESOURCE.method, authToken, requestData);
    
    if (response.data) {
        let data = MODEL_RESOURCE.processResponse(response)
        let results = mapResults(data, requestedFields, libraryName)

        return {
            result: MODEL_RESOURCE.returnFormat(results)
        }
    }
    
    if (response.error) {
        throw Error(`${JSON.stringify(response.error)}`);
    }

    return {
        result: {}
    }
}

export default imanage;