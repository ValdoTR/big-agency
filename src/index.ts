/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

// The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure.
bootstrapExtra().catch(e => console.error(e));

console.log('Script started successfully');

// Manage popups
let currentZone: string;
let currentPopup: any;

WA.room.onEnterLayer('exitWest').subscribe(() => {
    currentZone = 'exitWest'
    const isDoorConfigured = WA.state.loadVariable(currentZone + 'URL')
    if (isDoorConfigured) return;
    openExitPopup()
})
WA.room.onLeaveLayer('exitWest').subscribe(closePopup)

WA.room.onEnterLayer('exitEast').subscribe(() => {
    currentZone = 'exitEast'
    const isDoorConfigured = WA.state.loadVariable(currentZone + 'URL')
    if (isDoorConfigured) return;
    openExitPopup()
})
WA.room.onLeaveLayer('exitEast').subscribe(closePopup)

// Popup management functions
function openExitPopup(): void {
    const popupName = currentZone + 'Popup'
    const variableName = currentZone + 'URL'

    let cta = []
    if (WA.player.tags.includes('editor')) {
        cta.push({
            label: 'Configure',
            className: 'primary',
            callback: () => WA.nav.openCoWebSite('https://workadventu.re')
        })
    }
    // TODO: add WA.nav.openConfig(variableName)

    // @ts-ignore otherwise we can't assign cta variable
    currentPopup = WA.ui.openPopup(popupName, 'This exit is not configured yet.', cta)
}
function closePopup(): void {
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
