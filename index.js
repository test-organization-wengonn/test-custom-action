const core = require('@actions/core');
const github = require('@actions/github');
const axios = require("axios");

try {
    
    const clickup_api_token = core.getInput('clickup_api_token', { required: true });
    const pull_request_title = core.getInput('pull_request_title', { required: true });
    const list_id = core.getInput('list_id', { required: true });
    const team_id = core.getInput('team_id', { required: true });
    
    const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: team_id
    }).toString();

    create_task_axios(clickup_api_token, pull_request_title, list_id, query)
} catch (error) {
    const list_id = core.getInput('list_id', { required: true });
    core.setFailed(error.message);
    console.log(`LIST_ID: ${list_id}`)
}


async function create_task(clickup_api_token, pull_request_title, list_id, query){
    // const list_id = list_id;
    const resp = await fetch(
    `https://api.clickup.com/api/v2/list/${list_id}/task?${query}`,
    {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: clickup_api_token
        },
        body: JSON.stringify({
        name: `Dependabot - ${pull_request_title}`,
        description: 'New Task Description'
        })
    }
    );
    if (!resp.ok){
        const message = `An error has occured: ${resp.status}`;
        throw new Error(message);
    }
    
    const data = await resp.json();
    console.log("TESTING123");
    console.log(pull_request_title);
}


async function create_task_axios(clickup_api_token, pull_request_title, list_id, query){
    let body= JSON.stringify({
        name: `Dependabot - ${pull_request_title}`,
        description: 'New Task Description'
        })
    const response = await axios.post(`https://api.clickup.com/api/v2/list/${list_id}/task?${query}`, body, {
    headers: {
        'Content-Type': 'application/json',
        Authorization: clickup_api_token
    }
    });

    const json = await response.data
    
    console.log(json)
    console.log(json.status)
    console.log(`LIST_ID: ${list_id}`)
}


