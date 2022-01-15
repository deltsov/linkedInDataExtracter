import { browser } from "webextension-polyfill-ts";
import { LinkedInProfile } from '../Profile'
import { createBtn, disableButton } from './button'

function getProfileNameFromTitle(): string | null{
    if (document.title && document.title.length) {
        // (23) => '' and (99+) => ''
        return document.title.replace(/\([0-9\+]+\)/, '').replace(/\|?[ ]*linkedin/i, "").trim()
    } else {
        return null
    }
}// Получение имени пользователя


function getCompanyNameFromExperience(node: Element): string | null{
    function method1(){
        const companyNameNode = node.querySelector('.pv-top-card--experience-list li')?.firstElementChild?.querySelector('span')

        if (!companyNameNode || !companyNameNode.textContent) {
            return null;
        }

        return companyNameNode.textContent.trim();
    }

    function method2(){
        const rightPanel = node.querySelector('.pv-text-details__right-panel li')?.firstElementChild?.querySelector('h2 div')
        if (!rightPanel || !rightPanel.textContent) {
            return null;
        }

        return rightPanel.textContent.trim();
    }

    return method1() || method2();
}// Получение названия компании

function getProfileLink(): string{
    return window.location.href;
}// Получение ссылки на профиль

function findProfileTitle(node: Element): string | null {
    const titleNode = node.querySelector('h2,.text-body-medium');
    if(!titleNode || !titleNode.textContent)
        return null;

    return titleNode.textContent.trim();
}

/*function findProfileImage(node: Element): string | null {
    const imageNode = node.querySelector('.pv-top-card--photo img,.pv-top-card__photo-wrapper img') as HTMLImageElement;

    if(!imageNode || !imageNode.src)
        return null;

    return imageNode.src;
}*/
// Получение фото профиля

 /*   async function findEmail(): Promise<any> {
    let a = null;
    let text = null;
    let str = await fetch(document.location+'detail/contact-info/',{
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        }) 
    text = await str.text()
        .then(text=>{
            a = text.match(/(?<=emailAddress&quot;:&quot;)(.*)(?=&quot;,&quot;entityUrn&quot;:&quot;urn:li:)/)![0];
        return  a
        })
    console.log(text);return text;
    };*/

function onClick(e: MouseEvent){
    const target = e.target as HTMLButtonElement;
    if(!target) return;

    // Find top card
    const topCardElement = target.closest("section.pv-top-card");
    if(!topCardElement) return

    const profile:LinkedInProfile = {
        name: getProfileNameFromTitle(),
        link: getProfileLink(),
        title: findProfileTitle(topCardElement),
        company: getCompanyNameFromExperience(topCardElement),

        //email: findEmail(),
        
    }
    console.log(profile)

    /*function postData{
        fetch('google.com',{
            "body": ,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
            })
    }*/

    var btnNode: HTMLButtonElement | null = null;

    browser.runtime.sendMessage({
        action: "saveProfiles",
        payload: [profile]
    }).catch( (err) => {
        console.log(err)
        const errorText = 'Error while importing!';
        if(btnNode) disableButton(btnNode, errorText)
    });

    // Remplace btn text
    const successText = "Imported!"
    if(target.nodeName.toLowerCase() !== "button"){ // Mean click on inner elem in button
        const button = target.closest("button");
        if(button){
            btnNode = button;
        }
    }else{
        btnNode = target;
    }1

    if(btnNode) btnNode = disableButton(btnNode, successText)

    e.preventDefault();
}


export const saveProfileBtnIdentifier = 'save-profile-extension';


export const renderAddProfileBtn = async (rootNode: HTMLDivElement | null) => {
    if(!rootNode) {
        return
    }

    const btn = await createBtn({
        btnIdentifier: saveProfileBtnIdentifier
    });
    btn.addEventListener('click', onClick, false);


    if (!document.querySelector('#extDiv')){
    let div = document.createElement('div');
    div.id = "extDiv";
    div.style.display = 'block';
    div.style.left = '384px';
    div.style.position = 'fixed';
    div.style.top = '113px';
    div.style.zIndex = '200000';
    document.body.append(div)}
    
    const listActionNodeOld = rootNode.querySelector('ul.pv-top-card--list:not(.pv-top-card--list-bullet)');
    if(listActionNodeOld){
        const listingElem = document.createElement('li');
        listingElem.appendChild(btn)
        listActionNodeOld.appendChild(listingElem);
    }else{
        const listActionNode = document.querySelector('#extDiv');
        if(listActionNode){
            const flexElem = document.createElement('div');
            flexElem.appendChild(btn)
            listActionNode.appendChild(flexElem);
        }
    }/*function postData{
        fetch('google.com',{
            "body": ,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
        })

    */    }

// Рисование кнопки сохранения на странице
