test("imanage login", async () => {
    const output = await $app["imanageLogin 1.0"]({
        email: "test@test.com",
        password: "test",
        client_id: "testtesttesttest",
        client_secret: "testsecrettesttest",
        grant_type: "password"
    })
    assert(output.token, "access_token_12345")
})