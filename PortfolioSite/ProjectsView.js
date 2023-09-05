const container = document.getElementById("projectsView");
const examplePara = document.getElementById("examplePara");

class Project {
    constructor(pi, title) {
        this.pIndex = pi;
        this.shortDesc = "";
        this.title = title;
        this.element = null;
        this.link = "";
        this.isSelected = false;
        this.isHovering = false;
        this.scaleMultiplier = 1;
        this.embddVideo = "";
        this.embddGame = "";
        this.thumbnailCount = 1;
        this.date = "";
        this.engine = "Made in Unity";
        this.onGameThumb = false;
        if (title == "Apothalypse")
        {
            this.embddVideo = "https://www.youtube.com/embed/GrznYMMlR1Y?si=wFJH9_5cEPwg71vM?autoplay=1";
            this.link = "<a href='https://gamejolt.com/games/apothalypse/588775' target='_blank'>Play it here</a>";
            this.shortDesc = "A metroidvania demo I made with an artist. One of the largest projects I've worked on that made me truly understand the commitment and dedication it takes to produce an expansive polished game, as well as the importance of keeping your team motivated.";
            this.date = "2021";
        }
        else if (title == "Battle Babies")
        {
            this.thumbnailCount = 3;
            this.link = "<a href='https://play.google.com/store/apps/details?id=com.GIAC.BattleBabies&hl=en_AU&gl=UK' target='_blank'>Play it on android</a>";
            this.shortDesc = "The second mobile game I made and my first attempt at network multipayer."
            this.date = "2019";
        }
        else if (title == "Baby Snatcher")
        {
            this.thumbnailCount = 6;
            this.embddVideo = "https://www.youtube.com/embed/n-h5S2JMqGE?si=-JrVTVLpj5h2mSO6";
            this.embddGame = "https://serve.gamejolt.net/cecc1ec53ffe6135afb0366309f6fe5be8d27a16e30981a1d59c07005415f4f0,1693865747,7/data/games/8/51/500051/files/60ed62573da0a/index.html?"
            this.link = "<a href='https://gamejolt.com/games/BabySnatcher/500051' target='_blank'>Visit Page</a>";
            this.shortDesc = "A short stealth game me and an artist made for a game jam. The newest challenge for me here was enemy behaviour and creating a system for their pathfinding.";
            this.date = "2020";
        }
        else if (title == "Untitled VR Game")
        {
            this.thumbnailCount = 1;
            this.embddVideo = "https://www.youtube.com/embed/CiewjF7CtH4?si=Y7eTUP2qdkeFSHeX";
            this.link = "";
            this.shortDesc = "A wave based arena fighter VR game. I learnt a lot about active ragdolls and 3D animation making this as well as the struggles of balancing realistic physics with fun responsive VR controls and performance since I developed it with the Oculus Quest in mind.";
            this.date = "2021";
        }
        else if (title == "SuperGary LowFPS")
        {
            this.thumbnailCount = 1;
            this.embddGame = "https://itch.io/embed-upload/8530496?";
            this.link = "<a href='https://itch.io/jam/acm-summer-jam-2023/rate/2224849' target='_blank'>Visit Page</a>";;
            this.shortDesc = "I made this game for a game jam with the theme 'Its not a bug it's a feature'.";
            this.date = "2023";
        }
    }
}

let projButtons = [];
let projects = [];
let uiSpacerRight = null;
let uiSpacerLeft = null;
let projectTitle = null;
let shortDesc = null;
let thumbnailIndex = 0;
let scrollArrows = [null, null];
const projectNames = ["!Blood Skating","Untitled VR Game", "Apothalypse", "Baby Snatcher", "!Horror Laboratory", "!The Punk Police", "Battle Babies", "!Limb Land", "!Ant Farm Simulation", "SuperGary LowFPS", "!Multiplayer FPS", "!Gnome Wizard"];
function SetUpProjects()
{
    /*projects.push(new Project(0, "Apothalypse"));
    projects.push(new Project(1, "Battle Babies"));
    projects.push(new Project(2, "Untitled VR Game"));
    projects.push(new Project(3, "SuperGary LowFPS"));
    projects.push(new Project(4, "Baby Snatcher"));
    projects.push(new Project(5, "Apothalypse"));
    projects.push(new Project(6, "Apothalypse"));
    projects.push(new Project(7, "Apothalypse"));
    projects.push(new Project(8, "Apothalypse"));*/
    let projCounter = 0;
    projectNames.forEach((pName, index) => {
        if (pName[0] != "!") {projects.push(new Project(projCounter, pName)); projCounter += 1;}
    });

    /*var fs = require('fs');
    var files = fs.readdirSync('Projects/');
    files.forEach((nme, index))
    {
        projects.push(new Project(index, nme));
    }*/
    uiSpacerLeft = document.createElement('div');
    uiSpacerLeft.style.padding = '0px';
    //uiSpacerRight.style.backgroundColor = '#ffffff';
    container.appendChild(uiSpacerLeft);

    projects.forEach((project, index) => {
        project.element = new Image();
        project.element.src ='Projects/' + project.title + '/Thumbnails/0.png';
        project.element.style.height = '200px';
        project.element.style.width = 'auto';
        project.element.style.padding = '2px';
        project.element.addEventListener("mouseenter", function( event ) {   
            project.isHovering = true; Interact();}, false);
        project.element.addEventListener("mouseleave", function( event ) {   
            project.isHovering = false; Interact();}, false);
        project.element.addEventListener("click", function( event ) {   
            InspectProject(index);}, false);
        //el.float = "left";
        container.appendChild(project.element);
        projButtons.push(project.element);
        
        //project.element.style =
        
        //document.body.insertAdjacentElement("afterend", el);
    });
    uiSpacerRight = document.createElement('div');
    uiSpacerRight.style.padding = '0px';
    //uiSpacerRight.style.backgroundColor = '#ffffff';
    container.appendChild(uiSpacerRight);

}

let pd = 230;
let inspectingProject = false;
let selectedProject = null;
let isHovering = false;
let scrollVeloc = 0;
let spacerRWidth = 1;
let spacerLWidth = 1;
const scrollAccel =0.2;
let lastInterTime;
let lastInspectTime;
let scollPerc = 0;
let leftInspect = false;
let sideInspPad = 0;
let mouseXPos = 0;
let isOnContainer;
var PVStart = function Start()
{
    lastInterTime = 0;
    SetUpProjects();
    return true;
}
let iframe = null;
function ManageIFrame()
{
    if (inspectingProject && selectedProject != null)
    {
        let parRect = container.getBoundingClientRect();
        let rect = selectedProject.element.getBoundingClientRect();
        if (time - lastInspectTime > 1.3)
        {
            if (projectTitle == null)
            {
                console.log("Created Header");
                projectTitle = document.createElement('h2');
                projectTitle.innerHTML = selectedProject.title;
                projectTitle.style.position = "absolute";
                projectTitle.style.marginLeft = ((rect.width + Math.abs(sideInspPad)) * 1.025) + "px";
                projectTitle.style.marginRight = ((rect.width + Math.abs(sideInspPad)) * 0.025) + "px";
                if (leftInspect)
                {
                    projectTitle.style.marginLeft = ((rect.width + Math.abs(sideInspPad)) * 0.025) + "px";
                    projectTitle.style.marginRight = ((rect.width + Math.abs(sideInspPad)) * 1.025) + "px";
                }
                projectTitle.style.marginTop = (rect.height * 0.25) + "px";
                projectTitle.style.textAlign = "center";
                container.appendChild(projectTitle);
                shortDesc = document.createElement('p');
                
                //shortDesc.style.position = "absolute";
                let bio = selectedProject.shortDesc;
                if (selectedProject.link != "") {bio = selectedProject.link + "<br>" + bio;}
                shortDesc.innerHTML = bio + "<br><br>" + selectedProject.engine + " (" + selectedProject.date + ")";//"this game is great";
                shortDesc.style.fontSize = "17px";
                shortDesc.style.fontWeight= "normal";
                shortDesc.style.textAlign = "left";
                shortDesc.style.wordWrap = "break-word";
                if (leftInspect)
                {
                    shortDesc.style.marginLeft = "10px";
                }
                else
                {
                    shortDesc.style.marginRight = "10px";
                }
                projectTitle.appendChild(shortDesc);

            }
            else
            {
                if (!leftInspect) {projectTitle.style.marginLeft = ((rect.width + Math.abs(sideInspPad)) * 1.025) + "px";}
                else {projectTitle.style.marginRight = ((rect.width + Math.abs(sideInspPad)) * 1.025) + "px";}
            }
        }
        if (time - lastInspectTime > 2.5)
        {
            /*if (iframe == null && (selectedProject.embddVideo != "" || selectedProject.embddGame != "" ))
            {
                iframe = document.createElement('iframe');
                iframe.style.width = rect.width + "px";
                iframe.style.height = rect.height + "px";
                iframe.style.position = "absolute";
                iframe.style.alignItems = "right";
                if (leftInspect)
                {
                    iframe.style.marginLeft = (parRect.width - (rect.width + sideInspPad)) + "px";
                    iframe.style.marginRight = 0;
                }
                else
                {
                    iframe.style.marginLeft = -sideInspPad + "px";
                }
                if (selectedProject.embddVideo != "")
                {
                iframe.title="YouTube video player";
                iframe.frameborder="0px";
                iframe.style.border = "2px solid #ff24ed";
                iframe.style.boxShadow = "0 0 10px #ff24ed";
                iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowfullscreen;
                iframe.src = selectedProject.embddVideo;
                }
                container.appendChild(iframe);
            }*/
            if (thumbnailIndex == 0 && iframe == null && (selectedProject.embddVideo != "" || selectedProject.embddGame != "")) {SetThumbnail(false,0, false);}
        }
    }
    else
    {
        if (iframe != null)
        {
            console.log("REMOVED IFRAme");
            iframe.parentNode.removeChild(iframe);
            //iframe.remove();
            iframe = null;
        }
        if (projectTitle != null)
        {
            projectTitle.parentNode.removeChild(projectTitle);
            projectTitle = null;
        }

    }
}
function ManageArrows()
{
    if (isOnContainer || inspectingProject)
    {
        if (scrollArrows[0] == null)
        {
            let parRect = container.getBoundingClientRect();
            for (let s = 0; s < 2; s++)
            {
                let dir = (s * 2) - 1;
                scrollArrows[s] = new Image();
                scrollArrows[s].src = "thinArrow.png";
                scrollArrows[s].style.position = "absolute";
                scrollArrows[s].style.zIndex = "10";
                scrollArrows[s].style.height = (160) + "px";
                scrollArrows[s].style.width = 25 + "px";//(scrollArrows[s].height * 0.5) + "px";
                scrollArrows[s].style.mixBlendMode ="normal";
                scrollArrows[s].style.backgroundColor = "#ec60ff00";
                
                scrollArrows[s].title = "";
                if (s == 1)
                {
                    scrollArrows[s].style.marginLeft = parRect.width - 25 + "px";
                }
                else 
                {
                    scrollArrows[s].style.transform = "scaleX(-1)";
                    scrollArrows[s].style.marginLeft = "3px";
                }
                scrollArrows[s].style.marginTop = 20 + "px";

                scrollArrows[s].addEventListener("mouseenter", function( event ) {   
                    if (inspectingProject) {scrollArrows[s].style.backgroundColor = "#ec60ff";}}, false);
                scrollArrows[s].addEventListener("mouseleave", function( event ) {   
                    if (inspectingProject) {scrollArrows[s].style.backgroundColor = "#ec60ff00";}}, false);
                scrollArrows[s].addEventListener("mousedown", function( event ) {   
                    if (inspectingProject) {DespectProject(); InspectProject(selectedProject.pIndex + dir);}}, false);

                container.appendChild(scrollArrows[s]);
            }
        }
        scrollArrows.forEach((arrow, s) => {
            let dir = (s * 2) - 1;
            if (inspectingProject)
            {
                let parRect = container.getBoundingClientRect();
                let rect = selectedProject.element.getBoundingClientRect();
                if (time - lastInspectTime > 1.5 && !(s == 0 && selectedProject.pIndex == 0) && !(s == 1 && selectedProject.pIndex == projects.length - 1))
                {
                    arrow.style.display = "block";
                    if (s == 0) {scrollArrows[s].title = "Last Project (<- arrowkey)";}
                    else {scrollArrows[s].title = "Next Project (-> arrowkey)";}
                    if (s == 0 && !leftInspect)
                    {
                        scrollArrows[s].style.marginLeft = "1px";
                    }
                    else if (s == 0)
                    {
                        scrollArrows[s].style.marginLeft = (parRect.width - rect.width - sideInspPad - 30) + "px";
                    }
                    else if (s == 1 && leftInspect)
                    {
                        scrollArrows[s].style.marginLeft = (parRect.width - 30) + "px";
                    }
                    else
                    {
                        scrollArrows[s].style.marginLeft = (rect.width - sideInspPad + 15) + "px";
                    }
                }
                else
                {
                    arrow.style.display = "none";
                }
                scrollArrows[s].style.marginTop = 10 + "px";
                scrollArrows[s].style.height = (80) + "px";
            }
            else
            {
                scrollArrows[s].style.marginTop = 20 + "px";
                scrollArrows[s].style.height = (160) + "px";
                if (scrollVeloc * dir > 0)
                {
                    let parRect = container.getBoundingClientRect();
                    arrow.style.display = "block";
                    if (s == 1)
                    {scrollArrows[s].style.marginLeft = parRect.width - 25 + "px";}
                    else {scrollArrows[s].style.marginLeft = "3px";}
                }
                else
                {
                    arrow.style.display = "none";
                }
                
            }
        });
    }
    else
    {
        if (scrollArrows[0] != null)
        {
            for (let s = 0; s < 2; s++)
            {
                scrollArrows[s].parentNode.removeChild(scrollArrows[s]);
                scrollArrows[s] = null;
            }
        }
    }
}
var PVUpdate = function Update()
{
    ManageIFrame();
    ManageArrows();
    if (time - lastInterTime < 3)
    {
        container.style.height = pd + "px";

        let tarSpacerLWidth = 1;
        let tarSpacerRWidth = 1;
        let firstRect = projects[0].element.getBoundingClientRect();
        let parRect = container.getBoundingClientRect();

        scrollPerc = container.scrollLeft / ((container.scrollWidth - parRect.width));
        //console.log(scrollPerc);

        if (inspectingProject)
        {
            scrollVeloc = 0;
            //container.style.overflow = "scroll";
            //container.style.alignItems = "left";
            
            if (pd < 600) {pd += 5;}
            if (selectedProject != null)
            {
                let rect = selectedProject.element.getBoundingClientRect();
                let lastRect = projects[projects.length-1].element.getBoundingClientRect();
                
                //console.log("Left: " + (rect.left - parRect.left));
                let tarScroll = ((rect.left + container.scrollLeft) - parRect.left);
                
                
                if (selectedProject.pIndex >= projects.length / 2)
                {
                    if (selectedProject.pIndex != projects.length - 1) {sideInspPad = 30;} else {sideInspPad = 0;}
                    leftInspect = true;
                    //console.log(parRect.width -rect.width);
                    tarScroll -= parRect.width -rect.width;//(rect.left);//container.scrollWidth * 100;//((rect.left + (container.scrollLeft - container.scrollWidth)) - (parRect.left));
                    tarSpacerLWidth = Math.max((lastRect.left - rect.left - rect.width - lastRect.width),1);
                }
                else
                {
                    if (selectedProject.pIndex != 0) {sideInspPad = -30;} else {sideInspPad = 0;}
                    leftInspect = false;
                    //tarScroll -= rect.width;
                    tarSpacerRWidth = Math.max(parRect.width - (lastRect.left + lastRect.width - (rect.left)),1);
                }
                tarScroll += sideInspPad;
                
                
                //container.scrollTo((rect.left - parRect.left),0);

                if (container.scrollLeft < tarScroll - 5)
                {
                    container.scrollBy(9,0);
                }
                else if (container.scrollLeft > tarScroll + 5)
                {
                    container.scrollBy(-9,0);
                }
            }
            else
            {
                inspectingProject = false;
            }
        }
        else
        {
            if (time - lastInspectTime < 3 && selectedProject != null)
            {
                let rect = selectedProject.element.getBoundingClientRect();
                let parRect = container.getBoundingClientRect();
                /*if (rect.left < parRect.left + (parRect.width / 2))
                {
                    container.scrollBy(-10,0);
                }
                if (rect.left > parRect.left + (parRect.width / 2))
                {
                    container.scrollBy(10,0);
                }*/
                let tarS = rect.left + sideInspPad - container.scrollLeft - parRect.left;
                if (leftInspect) {tarS = (rect.left + sideInspPad - container.scrollLeft - parRect.left) - parRect.width + rect.width;}
                container.scrollTo(tarS,0);
                
            }
            else
            {
                //uiSpacer.style.width = '10px';
                //container.style.overflow = "hidden";
                //container.style.alignItems = "center";
                if (pd > 260) {pd -= 5;}
                if (pd < 260) {pd += 5;}

                if (mouseXP > 0.9)
                {
                    scrollVeloc = Math.min(scrollVeloc + scrollAccel, 12);
                }
                else if (mouseXP < 0.1)
                {
                    scrollVeloc = Math.max(scrollVeloc - scrollAccel, -12);
                }
                else {scrollVeloc = 0;}
                container.scrollBy(scrollVeloc,0);
            }
        }
        isHovering = false;
        projects.forEach((project, index) => {
            if (project.isHovering && !project.isSelected)
            {
                isHovering = true;
            }
        });
        {
            if (spacerRWidth < tarSpacerRWidth) {spacerRWidth += 9;}
                if (spacerRWidth > tarSpacerRWidth) {spacerRWidth -= 9;}
                uiSpacerRight.style.paddingLeft = spacerRWidth+ 'px';
                if (spacerLWidth < tarSpacerLWidth) {spacerLWidth += 9;}
                if (spacerLWidth > tarSpacerLWidth) {spacerLWidth -= 9;}
                uiSpacerLeft.style.paddingLeft = spacerLWidth+ 'px';
        }
        
        let targScale = 1;
        projects.forEach((project, index) => {
            let targMultiplier = 1;
            if (inspectingProject && !project.isSelected) {targMultiplier = 0.5;}
            if (project.isSelected)
            {
                targScale = 1.8;
            }
            else if ((project.isHovering && !inspectingProject && ((mouseXP < 0.9 && mouseXP > 0.1) || (scrollPerc >0.9 || scrollPerc < 0.1))) || (inspectingProject && isHovering))
            {
                if (!inspectingProject) {targScale = 1.1;}
                else {targScale = 1;}
            }
            else
            {
                targScale = 1;
            }
            if (project.scaleMultiplier < targScale * targMultiplier) {project.scaleMultiplier += 0.05;}
            if (project.scaleMultiplier > targScale * targMultiplier) {project.scaleMultiplier -= 0.05;}

            if (project.element != null) {project.element.style.height = (200 * project.scaleMultiplier) + 'px';}
        })
    }
    if (!inspectingProject)
    {
        if (time - lastInspectTime < 3 && selectedProject != null)
            {
                let rect = selectedProject.element.getBoundingClientRect();
                let parRect = container.getBoundingClientRect();
                let tarS = rect.left + sideInspPad - container.scrollLeft - parRect.left;
                if (leftInspect) {tarS = (rect.left + sideInspPad - container.scrollLeft - parRect.left) - parRect.width + rect.width;}
                container.scrollTo(tarS,0);
                
            }
    }
    return true;
}
function InspectProject(p)
{
    lastInspectTime = time;
    Interact();
    if (!inspectingProject)
    {
        if (selectedProject != null) {selectedProject.isSelected = false;}
        selectedProject = projects[p];
        inspectingProject = true;
        selectedProject.isSelected = true;
        //projects[p].isHovering = true;
        //projButtons[p].width = 300;
        
    }
    else 
    {
        if (!projects[p].isSelected)
        {
            DespectProject();
        }
        else
        {
            let rect = selectedProject.element.getBoundingClientRect();
            if (selectedProject.onGameThumb && mouseXPos > rect.left + (0.3 * rect.width) && mouseXPos < rect.left + (0.7 * rect.width)) { SetIFrame(true);}
            else
            {
                if (mouseXPos > rect.left + (0.5 * rect.width)){SetThumbnail(true,1);}
                else {SetThumbnail(true,-1);}
            }
        }
    }
}
function DespectProject()
{
    if (inspectingProject)
    {
        inspectingProject = false;
        if (selectedProject != null) {selectedProject.isSelected = false;}
        SetThumbnail(false,0, true);
        if (iframe != null)
        {
            console.log("REMOVED IFRAme");
            iframe.parentNode.removeChild(iframe);
            //iframe.remove();
            iframe = null;
        }
        if (projectTitle != null)
        {
            projectTitle.parentNode.removeChild(projectTitle);
            projectTitle = null;
        }
    }
}
let mouseXP = 0.5;
container.addEventListener("mousemove", (event) => {
    var rect = container.getBoundingClientRect();
    mouseXPos = event.clientX;
    mouseXP = (mouseXPos - rect.left) / rect.width;
    Interact();
    //console.log(mouseX);
    //console.log(rect.width);
    
});
container.addEventListener("mouseenter", (event) => {
    isOnContainer = true;
});
container.addEventListener("mouseleave", (event) => {
    mouseXP = 0.5;
    isOnContainer = false;
});
function Interact()
{
    lastInterTime = time;
}
function SetThumbnail(inc, val, reset = false)
{
    if (selectedProject != null)
    {
        let valOfst = 0;
        if (selectedProject.embddGame != "") {valOfst += 1;}if (selectedProject.embddVideo != "") {valOfst += 1;}
        if (inc)
        {
            thumbnailIndex += val;
        }
        else
        {
            thumbnailIndex = val;
        }
        if (thumbnailIndex >= valOfst + selectedProject.thumbnailCount)
        {
            thumbnailIndex = 0;
        }
        else if (thumbnailIndex < 0)
        {
            thumbnailIndex = valOfst + selectedProject.thumbnailCount - 1;
        }

        selectedProject.onGameThumb = false;
        if (!reset)
        {
            if (valOfst > 0 && thumbnailIndex == 0)
            {
                if (selectedProject.embddGame != "") { selectedProject.onGameThumb = true;SetIFrame(false, true);}
                else {SetIFrame(false);}
            }
            else if (valOfst > 1 && thumbnailIndex == 1)
            {
                SetIFrame(false);
            }
            else
            {
                SetIFrame(false, true);
                console.log("SET THUMBNAIL " + (thumbnailIndex - valOfst));
            }   
        }
        else {
            SetIFrame(false, true);
            thumbnailIndex = 0;
        }

        selectedProject.element.src = 'Projects/' + selectedProject.title + '/Thumbnails/' + Math.max(thumbnailIndex - valOfst,0) + '.png';
    }
    
}
function SetIFrame(isGame, clear = false)
{
    if (iframe != null)
    {
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    }
    if (!clear)
    {
        let parRect = container.getBoundingClientRect();
        let rect = selectedProject.element.getBoundingClientRect();
        if (iframe == null && (selectedProject.embddVideo != "" || selectedProject.embddGame != "" ))
        {
            iframe = document.createElement('iframe');
            iframe.style.width = rect.width + "px";
            iframe.style.height = rect.height + "px";
            iframe.style.position = "absolute";
            iframe.style.alignItems = "right";
            if (leftInspect)
            {
                iframe.style.marginLeft = (parRect.width - (rect.width + sideInspPad)) + "px";
                iframe.style.marginRight = 0;
            }
            else
            {
                iframe.style.marginLeft = -sideInspPad + "px";
            }
            if (!isGame && selectedProject.embddVideo != "")
            {
                iframe.title="YouTube video player";
                iframe.frameborder="0px";
                iframe.style.border = "2px solid #ff24ed";
                iframe.style.boxShadow = "0 0 10px #ff24ed";
                iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowfullscreen;
                iframe.src = selectedProject.embddVideo;
            }
            else if (isGame && selectedProject.embddGame != "")
            {
                console.log("FLASH");
                iframe.title="Play " + selectedProject.title;
                iframe.frameborder="0px";
                iframe.style.border = "2px solid #ff24ed";
                iframe.style.boxShadow = "0 0 10px #ff24ed";
                //iframe.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                iframe.allowfullscreen;
                iframe.src = selectedProject.embddGame;
            }
            container.appendChild(iframe);
        }
    }
}
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "d":
            SetThumbnail(true, 1);
            break;
        case "a":
            if (thumbnailIndex != 0) {SetThumbnail(true, -1);}
            break;
        case "ArrowLeft":
            if (inspectingProject && selectedProject.pIndex != 0) {
                DespectProject();
                InspectProject(selectedProject.pIndex - 1);
                scrollVeloc = -10;
            }
            break;
        case "ArrowRight":
            if (inspectingProject && selectedProject.pIndex != projects.length - 1) {
                DespectProject();
                InspectProject(selectedProject.pIndex + 1);
                scrollVeloc = 10;
            }
            break;    
        }
});
