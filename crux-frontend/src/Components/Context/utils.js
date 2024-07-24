export const makeRequest = async (URL, DATA) => {

    const res = await fetch(URL, { 
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(DATA)
    })
    return res
}