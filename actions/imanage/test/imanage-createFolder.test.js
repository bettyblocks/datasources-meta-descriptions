test("imanage createFolder", async () => {
    const output = await $app["imanage 1.0"]({
        name: "createFolder",
        params: {select: ["id"], input: {
            "name": "Demo Folder",
            "description" : "Folder Created For Demo Purposes",
            "location" : "Demoville",
            "default_security": "public",
            "is_external" : false,
            "is_external_as_normal" : false,
            "is_container_saved_search" : false,
            "is_content_saved_search" : false
        }},
        customerId: "0000",
        libraryName: "Dev",
        workspaceId: "test",
        authToken: "tokentoken"
    })

    assert(output, {
        "result": [
            {
                "id": 13,
            }
        ]
    })
})