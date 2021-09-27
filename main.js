const ul = document.querySelector("ul"),
input = ul.querySelector("input"),
countNumb = document.querySelector(".details span")

let maxTags = 10;
let tags = [];

countTag();

function countTag() {
    input.focus();
    countNumb.innerText = maxTags - tags.length;  // Subtracting max value with tags length

    if(tags.length > 10) {
        document.querySelector(".details span").classList.add('danger');
        document.querySelector(".details span").classList.remove('success');
        document.querySelector(".details span").classList.remove('warning');
    } 
    else if (tags.length >= 7 && tags.length <= 9) {
        document.querySelector(".details span").classList.add('warning');
        document.querySelector(".details span").classList.remove('success');
        document.querySelector(".details span").classList.remove('danger');
    }
    else if (tags.length < 10) {
        document.querySelector(".details span").classList.add('success');
        document.querySelector(".details span").classList.remove('warning');
        document.querySelector(".details span").classList.remove('danger');
    }
}

function createTag() {
    ul.querySelectorAll("li").forEach(li => li.remove());  // Removing all li tags before adding so there will be not duplicate tag
    tags.slice().reverse().forEach(tag => {
        let liTag = `<li>${tag} <i class="uuit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
        ul.insertAdjacentHTML("afterbegin", liTag);  // inserting or adding li inside ul tag
    });
    countTag();
}

function remove(element, tag) {
    let index = tags.indexOf(tag);  // getting removing tag index
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];  // removing or excluding selected tag from an array
    element.parentElement.remove();  // removing li of removed tag
    countTag();
}

function addTag(e){
    if(e.key === "Enter") {
        let tag = e.target.value.replace(/\s+/g, ' ');  // Removing unwanted spaces from user tag
        if(tag.length > 1 && !tags.includes(tag)) {  // If tag length is greater than 1 and the tag isn't exist already
            if(tags.length < 10) {  // if tags length is less than 10 then only add tag
                tag.split(',').forEach(tag => {  // spliting each tag from comma (,)
                    tags.push(tag);  // Adding each tag inside array
                    createTag();
                })
            }
        }
        e.target.value = "";
    }
}

input.addEventListener("keyup", addTag)

const removeBtn = document.querySelector("button")
removeBtn.addEventListener("click", () => {
    tags.length = 0;  // maaking array empty
    ul.querySelectorAll("li").forEach(li => li.remove());  // remove all li tag
    countTag();
});
