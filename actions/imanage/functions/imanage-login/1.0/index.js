import urlSearchParams from "../../utils/url-search-params"

const AUTHURL = "https://cloudimanage.com/auth/oauth2/token"

const imanageLogin = async ({email, password, client_id, client_secret}) => {
    const formData = new urlSearchParams({
        username: email,
        password,
        client_id,
        client_secret,
        grant_type: "password"
    })

    return await fetch(AUTHURL, {
        method: "post",
        body: formData.toString(),
        headers: { "Content-Type": "application/x-www-form-urlencoded"}
    })
    .then(response => {
        if (response.status === 200 && response.ok === true) {
            const tokens = response.json()
            return {
                token: tokens.access_token
            }
        }
        throw Error(`${JSON.stringify(response)}`)
    })
    .catch(error => {
        throw Error(`${JSON.stringify(error)}`)
    })
}

export default imanageLogin;