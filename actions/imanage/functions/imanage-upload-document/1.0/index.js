import FormData from "../../utils/url-search-params"

const imanageUploadDocument = async ({documentName, customerId, documentId, authToken, fileURL}) => {
    
const resourceURL = `https://cloudimanage.com/work/api/v2/customers/${customerId}/libraries/Dev/folders/${documentId}/documents`

let response = await fetch(fileURL)

let blob = await response.blob()

let buffer = await blob.arrayBuffer()

let file = Buffer.from(buffer)

let fileProfile = {
    "warnings_for_required_and_disabled_fields": true,
    "doc_profile": {
        "name": documentName,
        "extension": "pdf"
    },
    "user_trustees": [],
    "group_trustees": []
}

let fileProfileJson = JSON.stringify(fileProfile)

let formData = new FormData({
    "profile": fileProfileJson,
    "file": file
})

let request = {
    method: "POST",
    headers: {'X-Auth-Token': authToken},
    body: formData.toString()
}

let imanageResponse = await fetch(resourceURL, request)
return imanageResponse.json()
}

export default imanageUploadDocument;