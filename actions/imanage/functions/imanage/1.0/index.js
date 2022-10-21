import lodash from "lodash";

const BASEURL = "https://cloudimanage.com/work/api/v2/customers"

const responseResultFormatterNestedResult = {
    processResponse: (respose) => {
        return respose.data.results
    },
    returnFormat: (results) => {
        return {
            results: results,
            totalCount: results.length, 
        }
    }
}

const responseResultFormatterNoNestedResult = {
    processResponse: (respose) => {
        return respose.data
    },
    returnFormat: (results) => {
        return {
            results: results,
            totalCount: results.length, 
        }
    }
}

const responseResultFormatter = {
    processResponse: (respose) => {
        return [respose.data]
    },
    returnFormat: (results) => {
        return results
    }
}

const MODEL_LOOKUP = {
    allDocuments: {
        url: `${BASEURL}/{customerId}/documents`,
        method: "GET",
        ...responseResultFormatterNestedResult
    },
    allWorkspaces: {
        url: `${BASEURL}/{customerId}/workspaces`,
        method: "GET",
        ...responseResultFormatterNestedResult
    },
    allDocumentNVP: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}/name-value-pairs`,
        method: "GET",
        
    },
    allFolders: {
        url: `${BASEURL}/{customerId}/folders`,
        method: "GET",
        ...responseResultFormatterNoNestedResult
    },
    allFolderChildren: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}/children`,
        method: "GET",
        ...responseResultFormatterNoNestedResult
    },
    allDocumentHistory: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}/history`,
        method: "GET",
        ...responseResultFormatterNoNestedResult
    },
    allDocumentUserHistory: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}/history/users`,
        method: "GET",
        ...responseResultFormatterNoNestedResult
    },
    allLibraryCheckedOutDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/checkout`,
        method: "GET",
        ...responseResultFormatterNoNestedResult
    },
    oneDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}`,
        method: "GET",
        ...responseResultFormatter
    },
    oneWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces/{workspaceId}`,
        method: "GET",
        ...responseResultFormatter
    },
    oneFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}`,
        method: "GET",
        ...responseResultFormatter
    },
    updateDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}`,
        method: "PATCH",
        ...responseResultFormatter
    },
    updateWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspace/{workspaceId}`,
        method: "PATCH",
        ...responseResultFormatter
    },
    updateFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folder/{folderId}`,
        method: "PATCH",
        ...responseResultFormatter
    },
    createFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces/{workspaceId}/folders`,
        method: "POST",
        ...responseResultFormatter
    },
    createSubFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}/subfolders`,
        method: "POST",
        ...responseResultFormatter
    },
    createWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces`,
        method: "POST",
        ...responseResultFormatter
    },
    deleteDocuments: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/documents/{documentId}`,
        method: "DELETE",
        ...responseResultFormatter
    },
    deleteFolders: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/folders/{folderId}`,
        method: "DELETE",
        ...responseResultFormatter
    },
    deleteWorkspaces: {
        url: `${BASEURL}/{customerId}/libraries/{libraryName}/workspaces/{workspaceId}`,
        method: "DELETE",
        ...responseResultFormatter
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
        let not_implement = `${name} is not implemented`
        console.error(not_implement)
        throw Error(not_implement)
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
        console.error(response.error)
        throw Error(`${JSON.stringify(response.error)}`);
    }

    return {
        result: {}
    }
}

export default imanage;