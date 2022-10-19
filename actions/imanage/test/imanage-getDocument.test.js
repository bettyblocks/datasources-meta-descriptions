test("imanage getDocuments only return id", async () => {
    const output = await $app["imanage 1.0"]({
        name: "getDocument",
        params: {select: ["id"]},
        customerId: "0000",
        libraryName: "Dev",
        documentId: "Dev!11.1",
        authToken: "tokentoken"
    })

    assert(output, {
        "result": [
            {
                "id": 11,
            }
        ]
    })
})