"use strict";
import {callAJAX} from "./ajax.js";
import {dateBefore} from "./datebefore.js";

const props = {
    url: "https://buttercup-island.glitch.me/latest"
};

class ManipulateDom {
    constructor() {
        this.elem = {};
    }
}

const myDom = new ManipulateDom();
myDom.elem.flexBody = document.getElementById("flex-body");

callAJAX(props).then(data => {
    // convert users array to the usable format:
    const users = {};
    for (let i = 0; i < data.users.length; i ++) {
        users[data.users[i].id] = {
            userName: data.users[i].username,
            avatar: data.users[i].avatar_template
        }
    }
    const topics = data.topic_list.topics; // array with 30 values
    let content = "";
    for (let i = 0; i < topics.length; i ++) {
        let posters = "";
        const activity = dateBefore(Date.parse(topics[i].bumped_at)); // last activity in timestamp
        const topicLink = `https://www.freecodecamp.org/forum/t/${topics[i].slug}/${topics[i].id}" target="_blank`;
        topics[i].posters.forEach((poster, index) => {
            const posterLink = `https://www.freecodecamp.org/forum/u/${users[poster.user_id].userName}`;
            const avatar = `https://www.freecodecamp.org/${users[poster.user_id].avatar.replace("{size}", "30")}`;
            posters += `
                <a href="${posterLink}" target="_blank"><img src="${avatar}" title="${
                    index === 0 
                        ? 'Topic created by ' + users[poster.user_id].userName 
                    : index === topics[i].posters.length - 1
                        ? 'Last reply from ' + users[poster.user_id].userName
                    : users[poster.user_id].userName
                }" /></a>
            `;
        });
        content += `
            <div class="flex-container">
                <div class="number"><span>${i + 1}.</span></div>
                <div class="topic"><a href="${topicLink}"><span>${topics[i].title}</spanp></a></div>
                <div class="poster"><span>${posters}</span></div>
                <div class="replies" title="replies"><span>${topics[i].reply_count}</span></div>
                <div class="views" title="views"><span>${topics[i].views}</span></div>
                <div class="activity" title="last activity"><span>${activity}</span></div> 
            </div>
        `;
        
    }
    myDom.elem.flexBody.innerHTML = content;
});
