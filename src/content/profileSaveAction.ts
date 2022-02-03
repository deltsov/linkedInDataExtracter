//
import { browser } from "webextension-polyfill-ts";
import { LinkedInProfile } from "../Profile";
import { createBtn, disableButton } from "./button";

function getProfileNameFromTitle(): string | null {
  if (document.title && document.title.length) {
    // (23) => '' and (99+) => ''
    return document.title
      .replace(/\([0-9\+]+\)/, "")
      .replace(/\|?[ ]*linkedin/i, "")
      .trim();
  } else {
    return null;
  }
} // Получение имени пользователя

function getCompanyNameFromExperience(node: Element): string | null {
  function method1() {
    const companyNameNode = document
      .querySelector(".pv-top-card--experience-list li")
      ?.firstElementChild?.querySelector("span");

    if (!companyNameNode || !companyNameNode.textContent) {
      return null;
    }

    return companyNameNode.textContent.trim();
  }

  function method2() {
    const rightPanel = document
      .querySelector(".pv-text-details__right-panel li")
      ?.firstElementChild?.querySelector("h2 div");
    if (!rightPanel || !rightPanel.textContent) {
      return null;
    }

    return rightPanel.textContent.trim();
  }

  return method1() || method2();
} // Получение названия компании

function getProfileNameFromTitle1(): string | null {
  // (23) => '' and (99+) => ''
  return document.title
    .replace(/\([0-9\+]+\)/, "")
    .replace(/\|?[ ]*linkedin/i, "")
    .trim();
  {
    return null;
  }
}

//class="text-body-medium break-words";class="text-body-small inline t-black--light break-words";class="pv-contact-info__contact-link link-without-visited-state t-14"

function getProfileLink(): string {
  let Regexp = /detail\/contact-info\//;
  return window.location.href.replace(Regexp, "");
} // Получение ссылки на профиль

function findProfileTitle(node: Element): string | null {
  const titleNode = document.querySelector(
    "div.pv-entity__summary-info.pv-entity__summary-info--background-section > h3"
  );
  if (!titleNode || !titleNode.textContent) return null;

  return titleNode.textContent.trim();
}
function findProfileEmail(node: Element): string | null {
  const titleNode = document.querySelector(
    "div > section.pv-contact-info__contact-type.ci-email > div > a"
  );
  if (!titleNode || !titleNode.textContent) return null;

  return titleNode.textContent.trim();
}

function findProfileCity(node: Element): string | null {
  const titleNode = document.querySelector(
    " div.ph5.pb5 > div.mt2.relative > div.pb2.pv-text-details__left-panel > span.text-body-small.inline.t-black--light.break-words"
  );
  if (!titleNode || !titleNode.textContent) return null;

  return titleNode.textContent.trim();
}
//Получение города и страны

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

function onClick(e: MouseEvent) {
  const target = e.target as HTMLButtonElement;
  if (!target) return;

  // Find top card
  const topCardElement = target.closest("#extDiv");
  if (!topCardElement) return;

  const profile: LinkedInProfile = {
    name: getProfileNameFromTitle(),
    link: getProfileLink(),
    title: findProfileTitle(topCardElement),
    company: getCompanyNameFromExperience(topCardElement),
    email: findProfileEmail(topCardElement),
    city: findProfileCity(topCardElement),
  };
  console.log(profile);

  // const corezoidUrl = 'https://www.corezoid.com/api/1/json/public/1027134/c0f8ef22981e0f249ac263641d47ef5b51ca409d'
  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", corezoidUrl);
  // // xhr.setRequestHeader("Accept", "application/json");
  // xhr.setRequestHeader("Content-Type", "application/json");
  // let data = profile.name;
  // xhr.send();
  // xhr.onreadystatechange=(e)=>{
  //     console.log(xhr.responseText)
  // }

  //https://cors.eu.org/ is proxy
  (async () => {
    const rawResponse = await fetch(
      "https://cors.eu.org/https://www.corezoid.com/api/1/json/public/1027134/c0f8ef22981e0f249ac263641d47ef5b51ca409d",
      {
        method: "POST",
        headers: {},
        body: JSON.stringify(profile),
      }
    );
    const content = await rawResponse.json();

    console.log(content);
  })();

  var btnNode: HTMLButtonElement | null = null;

  browser.runtime.sendMessage({
    action: "saveProfiles",
    payload: [profile],
  });
  // .catch((err) => {
  //     console.log(err);
  //     const errorText = "Error while importing!";
  //     if (btnNode) disableButton(btnNode, errorText);
  // });

  // Replace btn text
  const successText = "Imported!";
  if (target.nodeName.toLowerCase() !== "button") {
    // Mean click on inner elem in button
    const button = target.closest("button");
    if (button) {
      btnNode = button;
    }
  } else {
    btnNode = target;
  }
  1;

  if (btnNode) btnNode = disableButton(btnNode, successText);

  e.preventDefault();
}

export const saveProfileBtnIdentifier = "save-profile-extension";

export const renderAddProfileBtn = async (rootNode: HTMLDivElement | null) => {
  if (!rootNode) {
    return;
  }

  const btn = await createBtn({
    btnIdentifier: saveProfileBtnIdentifier,
  });
  btn.addEventListener("click", onClick, false);

  if (!document.querySelector("#extDiv")) {
    let div = document.createElement("div");
    div.id = "extDiv";
    div.style.display = "block";
    div.style.zIndex = "200000";
    const listActionNode1 = document.querySelector(".text-body-large-open");
    if (listActionNode1) {
      div.appendChild(btn);
      listActionNode1.appendChild(div);
    }
  }

  const listActionNodeOld = rootNode.querySelector("#extDiv");
  if (listActionNodeOld) {
    const listingElem = document.createElement("div");
    listingElem.appendChild(btn);
    listActionNodeOld.appendChild(listingElem);
  } else {
    const listActionNode = document.querySelector("#extDiv");
    if (listActionNode) {
      const flexElem = document.createElement("div");
      flexElem.appendChild(btn);
      listActionNode.appendChild(flexElem);
    }
  }
};

// Рисование кнопки сохранения на странице
