
/**
 * Basic GET for customer/auth
 * @returns url, state etc for OAUTH
 */
const getOAUTH = async () => {
    const response = await fetch("http://192.168.0.10:1337/customer/auth?redirectUrl=exp://192.168.0.10:8081&mobile=true");
    const result = await response.json();
    const state = result.data.state
    //console.log(result)
    return result
};

const postOAUTH = async (code:string, state:string) => {
    const response = await fetch("http://192.168.0.10:1337/customer/auth?mobile=true", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({"code": code, "state": state})
      });
      const result = await response.json();
}