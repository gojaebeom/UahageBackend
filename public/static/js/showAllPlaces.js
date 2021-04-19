async function init() {
    const data = await fetch("/api/users", {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          "Authorization": ""
        },
    });
    console.log(data);

}
init();