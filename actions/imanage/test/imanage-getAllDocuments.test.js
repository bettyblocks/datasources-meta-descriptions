test("imanage getAllDocuments", async () => {
    const output = await $app["imanage 1.0"]({
        name: "getAllDocuments",
        params: {},
        customerId: "0000",
        libraryName: "Dev",
        authToken: "tokentoken"
    })

    assert(output, {
        "result": {
            "results": [
                {
                    "authorDescription":"testtest",
                    "author":"test",
                    "checksum":"SHA256:7FCEFF211111111111111111111111111111111111111111111C",
                    "documentClass":"DOC",
                    "classDescription":"Document",
                    "contentType":"D",
                    "createDate":"2022-10-12T16:13:28.579Z",
                    "createProfileDate":"2022-10-12T16:13:28.579Z",
                    "database":"DEV",
                    "defaultSecurity":"public",
                    "documentNumber":74,
                    "editDate":"2022-10-12T16:13:28.579Z",
                    "editProfileDate":"2022-10-12T16:13:28.579Z",
                    "fileCreateDate":"2022-10-12T16:13:28.579Z",
                    "fileEditDate":"2022-10-12T16:13:28.579Z",
                    "id":74,
                    "isCheckedOut":false,
                    "isDeclared":false,
                    "isExternal":false,
                    "isExternalAsNormal":false,
                    "isHipaa":false,
                    "isInUse":false,
                    "isRestorable":true,
                    "iwl":"iwl:dms=cloudimanage.com&&lib=Dev&&num=74&&ver=1",
                    "lastUser":"test",
                    "lastUserDescription":"testtest",
                    "name":"Assesment Result",
                    "operatorDescription":"testtest",
                    "operator":"test",
                    "retainDays":10,
                    "documentSize":59760,
                    "subclassDescription":"",
                    "extension":"PDF",
                    "documentType":"ACROBAT",
                    "typeDescription":"Adobe Acrobat Reader",
                    "version":1,
                    "wopiFileSizeWarning":false,
                    "workspaceId":"Dev!11",
                    "workspaceName":"test test Assesments",
                    "wstype":"document"
                }
            ],
            "totalCount": 1
        }
    })
});

test("imanage getAllDocuments only return id", async () => {
    const output = await $app["imanage 1.0"]({
        name: "getAllDocuments",
        params: {select: ["id"]},
        customerId: "0000",
        libraryName: "Dev",
        authToken: "tokentoken"
    })

    assert(output, {
        "result": {
            "results": [
                {
                    "id":74,
                }
            ],
            "totalCount": 1
        }
    })
})