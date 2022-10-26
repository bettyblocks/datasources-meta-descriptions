test("imanage updateDocuments", async () => {
    const output = await $app["imanage 1.0"]({
        name: "updateDocuments",
        params: {select: ["id", "name"], input: {"name": "test-updated"}},
        customerId: "0000",
        libraryName: "Dev",
        documentId: "Dev!12.1",
        authToken: "tokentoken"
    })

    assert(output, {
        "result": [
            {
                "id": 12,
                "name": "test-updated"
            }
        ]
    })
})