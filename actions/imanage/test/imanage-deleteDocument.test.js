test("imanage deleteDocument", async () => {
    const output = await $app["imanage 1.0"]({
        name: "deleteDocument",
        params: {},
        customerId: "0000",
        libraryName: "Dev",
        documentId: "Dev!14.1",
        authToken: "tokentoken"
    })

    assert(output, {
        "result": {}
    })
})