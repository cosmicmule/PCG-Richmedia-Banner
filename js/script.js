// script.js
// =============================================================================
var navObj= {};
var globVariables = {};
var trackingArr = ['none',
                    'Pasea',
                    'The Meritage',
                    'Estancia',
                    'Balboa bay',
                    'Bacara',
                    'Koa Keo',
                    'Arrow Left',
                    'Arrow Right',
                    ]

// 
//-----------------------------------
//-----------------------------------
//-----------------------------------
var currentSlide_NUM = 1;
var PrevSlide_NUM = -1;
var gallery_NUM = 1;
var prev_gallery_NUM;

btnLock = false;
globVariables.transition = 'right';
//-----------------------------------
//-----------------------------------
//-----------------------------------


//console.log(globVariables)

// Device Detection
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);
var isIE9 = (/MSIE 9\./i).test(navigator.userAgent);
// Device Detection ENDS

//Sizmek variables
var video;
var videoContainer;
var sdkVideoPlayer;
var sdkVideoPlayButton;
var isIOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent);
var isIE9 = (/MSIE 9\./i).test(navigator.userAgent);
var videoARR = [{src:'videos/intro.mp4'}];

//SIZMEK INIT//
videoContainer = document.getElementById("videoBlock");
video = document.getElementById("video");
sdkVideoPlayer = document.getElementById("sdk-video-player");
sdkVideoPlayButton = document.getElementById("sdk-video-play-button");

function initEB() {
    if (!EB.isInitialized()) {
        EB.addEventListener(EBG.EventName.EB_INITIALIZED, startAd);
    } else {
        startAd();        
    }
}

function startAd(){
    intro_CONFIG();
    cta.addEventListener("click", skipIntro);
    cta.addEventListener("mouseenter", ctaOver);
    cta.addEventListener("mouseleave", ctaOut);
    
    var changeCTA_BTN = getSymbol('copy');
    changeCTA_BTN.style.backgroundPosition = '0 -29px';
}

function intro_CONFIG(){
    if(isIOS){
        intro_HTML();
    }else{
        //intro_HTML();
        intro_VIDEO();
    }
    
    TweenLite.to(getSymbol('navigation'), 1, {top:0,overwrite:1, ease: Circ.easeOut,delay:14,onComplete:intro_COMPLETED});
    TweenLite.to(getSymbol('arrowNav'), 1, {opacity:1,overwrite:1, ease: Circ.easeOut,delay:12});

}

function skipIntro(){
    EB.automaticEventCounter("Skip Intro");
    cta.removeEventListener("click", skipIntro);
    TweenLite.to(getSymbol('navigation'), 1, {top:0,overwrite:4, ease: Circ.easeOut,onComplete:intro_COMPLETED});
    TweenLite.to(getSymbol('arrowNav'), 1, {opacity:1,overwrite:4, ease: Circ.easeOut});
}

function intro_VIDEO(){
    videoContainer = getSymbol("videoBlock");
    video = getSymbol("video");
    var sources = video.getElementsByTagName('source');
    sources[0].src = 'video/intro.mp4';
    //video.addEventListener('ended', intro_COMPLETED,false);
    video.muted = true;
    video.load();
    video.play();
}

function intro_HTML(){

    console.log('iPad intro called!!!');
    // remove video block for the iPad devices
    var tempVideoVar = getSymbol('videoBlock');
    tempVideoVar.style.left = '-3000px';

    var img1 = getSymbol('slide_0');
    var introCopy_1 = getSymbol('introCopy_1');
    var introCopy_2 = getSymbol('introCopy_2');
    var introCopy_3 = getSymbol('introCopy_3');
    var introCopy_4 = getSymbol('introCopy_4');

    var img2 = getSymbol('slide_0_1');
    var introCopy_5 = getSymbol('introCopy_5');

    var imgHolder = getSymbol('slide_0_Holder');

    //intro img1
    TweenLite.to(img1, 3, {scale:1,opacity:1, ease: Circ.easeOut});

    //intro 1 frame
    TweenLite.to(introCopy_1, 1, {opacity:1, ease: Circ.easeOut,delay:2});
    TweenLite.to(introCopy_1, 1, {opacity:0, ease: Circ.easeOut,delay:4});
    //intro 2 frame
    TweenLite.to(introCopy_2, 1, {opacity:1, ease: Circ.easeOut,delay:5});
    TweenLite.to(introCopy_3, 1, {opacity:1, ease: Circ.easeOut,delay:6});
    //TweenLite.to(introCopy_2, 1, {x:'-=120px',opacity:1, ease: Circ.easeOut,delay:3.5});

    //intro 3 frame
    TweenLite.to(introCopy_2, 1, {opacity:0, ease: Circ.easeOut,delay:8.5});
    TweenLite.to(introCopy_3, 1, {opacity:0, ease: Circ.easeOut,delay:8.5});
    //intro 4 frame
    TweenLite.to(introCopy_4, 1, {opacity:1, ease: Circ.easeOut,delay:9});

    //intro 5 frame

    //intro img 2
    TweenLite.to(img2, 3, {scale:1,opacity:1, ease: Circ.easeOut,delay:10.5});
    TweenLite.to(introCopy_4, 1, {opacity:0, ease: Circ.easeOut,delay:11.5});
    TweenLite.to(introCopy_5, 1, {opacity:1, ease: Circ.easeOut,delay:12.5});

    //intro holder
    TweenLite.to(imgHolder, 3, {opacity:0, ease: Circ.easeOut,delay:14,onComplete:removeHTMLIntro});

}

function removeHTMLIntro(){
    var imgHolder = getSymbol('slide_0_Holder');
    imgHolder.style.left = '5000px';

    
}

function intro_COMPLETED(){

    var changeCTA_BTN = getSymbol('copy');
    changeCTA_BTN.style.backgroundPosition = '0 0';
    cta.addEventListener("click", cta_CLICKTHROUGH);
    
    var imgHolder = getSymbol('slide_0_Holder');
    imgHolder.style.left = '5000px';

    TweenLite.to(getSymbol('videoBlock'), 5, {opacity:0, ease: Circ.easeOut});

    //NAVIGATION
    cta = document.getElementById('cta');
    leftArrow = document.getElementById('left');
    rightArrow = document.getElementById('right');

    //EVENTS
        //LEFT ARROW
        leftArrow.addEventListener("click", Arrow_CLICK);
        console.log('called')
        if(!isIOS){
            console.log('called')
            leftArrow.addEventListener("mouseover", Arrow_MOUSEOVER);
            leftArrow.addEventListener("mouseout", Arrow_MOUSEOUT);
            
        }
        
        // RIGHT ARROW
        
        rightArrow.addEventListener("click", Arrow_CLICK);
        
        if(!isIOS){

            rightArrow.addEventListener("mouseover", Arrow_MOUSEOVER);
            rightArrow.addEventListener("mouseout", Arrow_MOUSEOUT);
        }
        
     
     Gallery_START()
}


function ctaOver(){
    var instance = getSymbol('rollover');
    TweenLite.to(instance, 3, {left:'-180px', ease: Circ.easeOut});
}

function ctaOut(){
    var instance = getSymbol('rollover');
    TweenLite.to(instance, 0, {left:'350px', ease: Circ.easeOut});
}


function Gallery_START() {
    
    var videoBlock = getSymbol('videoBlock');
    videoBlock.style.left = '2000px';

    currentSlide = 1;
    initListeners_Btns_GALLERY();
    
    
    SideNav_RESET();
}



//EVENT FUNCTIONS
//------------------------------
//------------------------------
//------------------------------

function Arrow_CLICK(e){
    //console.log('[Arrow_CLICK]');
    //console.log(this);
    
    if(!btnLock){
    //if(currentSlide_NUM != PrevSlide_NUM){
            PrevSlide_NUM = currentSlide_NUM;
            
            // Update SlideCount
            if(this.id === 'right'){ 
                //console.log('right arrow called')
                if(currentSlide_NUM >= 18){
                    currentSlide_NUM = 1;
                }else{
                    currentSlide_NUM += 1;
                }

                console.log('Arrow Right')
                EB.userActionCounter('Arrow Right');

            }
            
            if(this.id === 'left'){ 
                //console.log('left arrow called'
                if(currentSlide_NUM <= 1){
                    currentSlide_NUM = 18;
                }else{
                    currentSlide_NUM -= 1;
                }
                console.log('Arrow Left')
                EB.userActionCounter('Arrow Left');
    
            }


            //console.log(PrevSlide_NUM +"{}"+ currentSlide_NUM)
            section_POINTER();
            SideNav_RESET(this);
        }
   // }


}

function locked(){
    btnLock = true;
}

function Unlocked(){
    btnLock = false;
}

function SideNav_RESET(clicktype){

    //console.log(clicktype);

    var targetGallery = document.getElementById("nav_"+gallery_NUM+'_galleryHolder');
    
    var targetGalleryThumbnail = document.getElementById("thumbnail_"+currentSlide_NUM);
    var targetGalleryPrevThumbnail = getSymbol("thumbnail_"+PrevSlide_NUM);
    var targetGallery_PROP = targetGallery.getAttribute('data-state');

    if(!btnLock){
        for (var i = 1; i <= 6; i++) {

            var eleParent           =   getSymbol("nav_"+i);
            var ele                 =   getSymbol("nav_"+i+'_galleryHolder');
            var targetGalleryHeader =   getSymbol("nav_"+i+'_header');
            
            if(gallery_NUM != i){
                ele.setAttribute('data-state', 'closed');
                TweenLite.to(ele, 1, {height:0,overwrite:1, ease: Circ.easeOut});
                TweenLite.to(ele, 0, {visibility:'hidden'});
                TweenLite.set(ele, 0, {clearProps:"zIndex"});

                TweenLite.to(targetGalleryHeader, .25, {z:0.000,force3D:true,scale:0.9,overwrite:1, ease: Circ.easeOut,onComplete:clearProps,onCompleteParams:[targetGalleryHeader]});

            }else{
                ele.setAttribute('data-state', 'open');
                TweenLite.to(targetGallery, 1, {height:57, ease: Circ.easeOut});
                TweenLite.to(targetGallery, 0, {visibility:'visible'});
                TweenLite.set(targetGallery, 0, {css:{zIndex:'900'}});
                TweenLite.to(targetGalleryHeader, 1, {z:0.001,scale:1, ease: Circ.easeOut});

            } 

            // animate between property section
            if(i > gallery_NUM){
                
                if(i != 1){
                    TweenLite.to(eleParent, 1, {top:'65',overwrite:1, ease: Circ.easeOut});
                }
                
            }else if(i <= gallery_NUM){
                if(i != 1){
                    TweenLite.to(eleParent, 1, {top:'0',overwrite:1, ease: Circ.easeOut});
                }
            }
        }

        var targetGalleryThumbnailPOS = targetGalleryThumbnail.offsetLeft;
        var targetGalleryArrow = getSymbol('nav_'+gallery_NUM+'_arrow');
        
        TweenLite.to(targetGalleryArrow, 1, {x:targetGalleryThumbnailPOS,overwrite:1, ease: Circ.easeOut});
        
        // scale selected Thumnail
        
        for (var i = 1; i <= 18; i++) {
            var getInstance = getSymbol('thumbnail_'+i);
            
            if(currentSlide_NUM != i){
                TweenLite.to(getInstance, .5, {scale:.95,boxShadow:"none", ease: Circ.easeOut,force3D:true});
            }else{
                //tracking(currentSlide_NUM+'thumbnail_Tracking',clicktype);
                TweenLite.to(targetGalleryThumbnail, .5, {z:0.001,scale:1.25, boxShadow:"7px 8px 22px -4px rgba(0,0,0,.4)",moverwrite:1, ease: Circ.easeOut,force3D:true});
            }

        };

        targetGalleryThumbnail.style.borderWidth = '1px';

        // scale selected Previous Thumnail
       try{
            targetGalleryPrevThumbnail.style.borderWidth = '0';
        }catch(error){
            //console.log('targetGalleryPrevThumbnail Doesn;t exist');
        }
    
    }   animate_SLIDES();
        


}

function clearProps(e){
    //console.log(e);
    e.style = 'transform3D';
}

function animate_SLIDES(e){
  
    // current slide t animate in.
    var scaleTrigger;
    var newSlide_endPos_currentSlide;
    var newSlide_endPos_time;
    var newSlide_endPos_time;

    if(currentSlide_NUM > PrevSlide_NUM){
        currentSlide_endPos_currentSlide = '683px';
        newSlide_endPos_currentSlide = '-683px';
        newSlide_endPos_time = 1;
        scaleTrigger = true;
    }else{
        //console.log('I am not as Great :(');
        currentSlide_endPos_currentSlide = '-693px';
        newSlide_endPos_currentSlide = '683px';
        newSlide_endPos_time = 1;
        scaleTrigger = false;
    }

    // current slide to animate Out.
        try{
            var currentSlide = getSymbol('slide_' + PrevSlide_NUM)
            
            TweenLite.to(currentSlide, newSlide_endPos_time, {left:currentSlide_endPos_currentSlide, ease: Circ.easeOut});

        }catch(error){
            //console.log('PrevSlide_NUM Error')
        }
    

    // New slide to animate In.
        try{
            var newSlide = getSymbol('slide_' + currentSlide_NUM)
            newSlide.style.left = newSlide_endPos_currentSlide;
            TweenLite.to(newSlide, 0, {z:0.001,scale:1.75});
            
            TweenLite.to(newSlide, 1, {z:0.001,scale:1,opacity:1,left:'0px',onStart:locked,onComplete:Unlocked, ease: Circ.easeOut});
        }catch(error){
            //console.log('currentSlide_NUM Error')
        }
    

}

function getSymbol(path){

    return document.getElementById(path);
}

function cta_CLICKTHROUGH(e){
    console.log('[cta_CLICKTHROUGH]');
    EB.clickthrough();
}

function custom_CLICKTHROUGH(e){
    console.log(trackingArr[e]);
    EB.clickthrough(trackingArr[e]);
}

function fakeTracking_clickthroughs(){
    //THIS FUNCTION IS NEVER USED. IT IS ONLY HERE FOR SIZMEK TO KNOW WHAT TO TRACK/CLICKTHROUGHS BY!!!!!!
    
    // SECTION HEADERS
    EB.userActionCounter('Pasea');
    EB.userActionCounter('The Meritage');
    EB.userActionCounter('Estancia');
    EB.userActionCounter('Balboa bay');
    EB.userActionCounter('Bacara');
    EB.userActionCounter('Koa Keo');
    EB.userActionCounter('Arrow Left');
    EB.userActionCounter('Arrow Right');
    
    // SECTION CLICKTHROUGHS
    EB.clickthrough('Pasea_clickthrough');
    EB.clickthrough('The Meritage_clickthrough');
    EB.clickthrough('Estancia_clickthrough');
    EB.clickthrough('Balboa bay_clickthrough');
    EB.clickthrough('Bacara_clickthrough');
    EB.clickthrough('Koa Keo_clickthrough');
   
    // SECTION PHOTO'S
    EB.userActionCounter('Pasea_1_thumbnail');
    EB.userActionCounter('Pasea_2_thumbnail');
    EB.userActionCounter('Pasea_3_thumbnail');
    EB.userActionCounter('The Meritage_4_thumbnail');
    EB.userActionCounter('The Meritage_5_thumbnail');
    EB.userActionCounter('The Meritage_6_thumbnail');
    EB.userActionCounter('Estancia_7_thumbnail');
    EB.userActionCounter('Estancia_8_thumbnail');
    EB.userActionCounter('Estancia_9_thumbnail');
    EB.userActionCounter('Balboa bay_10_thumbnail');
    EB.userActionCounter('Balboa bay_11_thumbnail');
    EB.userActionCounter('Balboa bay_12_thumbnail');
    EB.userActionCounter('Bacara_13_thumbnail');
    EB.userActionCounter('Bacara_14_thumbnail');
    EB.userActionCounter('Bacara_15_thumbnail');
    EB.userActionCounter('Koa Keo_16_thumbnail');
    EB.userActionCounter('Koa Keo_17_thumbnail');
    EB.userActionCounter('Koa Keo_18_thumbnail');
}

function tracking(e,clicktype){

    //console.log(clicktype)
    //console.log(clicktype)

    if(e == 'nav_1_header'){
        console.log(trackingArr[1]);
        EB.userActionCounter(trackingArr[1]);
        return true;
    }else if(e == 'nav_2_header'){
        console.log(trackingArr[2]);
        EB.userActionCounter(trackingArr[2]);
        return true;
    }else if(e == 'nav_3_header'){
        console.log(trackingArr[3]);
        EB.userActionCounter(trackingArr[3]);
        return true;
    }else if(e == 'nav_4_header'){
        console.log(trackingArr[4]);
        EB.userActionCounter(trackingArr[4]);
        return true;
    }else if(e == 'nav_5_header'){
        console.log(trackingArr[5]);
        EB.userActionCounter(trackingArr[5]);
        return true;
    }else if(e == 'nav_6_header'){
        console.log(trackingArr[6]);
        EB.userActionCounter(trackingArr[6]);
        return true;
    }else if(e == currentSlide_NUM +'thumbnail_Tracking'){
        
        var tempName = getSymbol('thumbnail_'+ currentSlide_NUM);
        var tempNameID = tempName.getAttribute('data-name');
        var trackingName = trackingArr[gallery_NUM] +'_'+ tempNameID +'_thumbnail'
        
        
        //EB.userActionCounter(trackingName); 
        if(clicktype == undefined || e.id == 'nav_1_header'||e.id == 'nav_2_header'||e.id == 'nav_3_header'||e.id == 'nav_4_header'||e.id == 'nav_5_header'||e.id == 'nav_6_header'){
            console.log(trackingName +"  "+ 'automaticEventCounter')
            EB.automaticEventCounter(trackingName);
        }else if(clicktype.id == 'right' || clicktype.id == 'left'){
            console.log(trackingName +"  "+ 'automaticEventCounter')
            EB.automaticEventCounter(trackingName)
        }else{
            console.log(trackingName +"  "+ 'userActionCounter')
            EB.userActionCounter(trackingName)
        }  
       
       // EB.userActionCounter(trackingName);

          
        
    }
}

function slideClickthrough(e){
    
    if(e !== 'undefined'){
        console.log(trackingArr[gallery_NUM]);
        EB.clickthrough(trackingArr[gallery_NUM]+'_clickthrough');

    }
    
}


function section_POINTER(){

    if(currentSlide_NUM >= 1 && currentSlide_NUM <= 3){gallery_NUM = 1;}
    if(currentSlide_NUM >= 4 && currentSlide_NUM <= 6){gallery_NUM = 2;}
    if(currentSlide_NUM >= 7 && currentSlide_NUM <= 9){gallery_NUM = 3;}
    if(currentSlide_NUM >= 10 && currentSlide_NUM <= 12){gallery_NUM = 4;}
    if(currentSlide_NUM >= 13 && currentSlide_NUM <= 15){gallery_NUM = 5;}
    if(currentSlide_NUM >= 16 && currentSlide_NUM <= 18){gallery_NUM = 6;}

}

function Arrow_MOUSEOVER(e){
    // ANIMATE ARROWS
    if(this.id === 'right'){ 
        TweenLite.to(this, .5, {z:0.001,scale:1.2,x: '-15px',y:'-5px',overwrite:1, ease: Circ.easeOut});
        globVariables.currentSlide = parseInt(+1);
    }
    
    if(this.id === 'left'){ 
        TweenLite.to(this, .5, {z:0.001,scale:1.2,x: '15px',y:'-5px',overwrite:1, ease: Circ.easeOut});

        globVariables.currentSlide = parseInt(-1);
    }
}

function Arrow_MOUSEOUT(e){
    
    if(this.id === 'right'){ 
        TweenLite.to(this, .5, {z:0.001,scale:1,y:'+=5px',x:'+=15px'});
    }

    if(this.id === 'left'){ 
        TweenLite.to(this, .5, {z:0.001,scale:1,y:'+=5px',x:'-=15px'});
    }
}



function propertySectionHeader_CLICK(e){
    
    var temp2 = this.id;
    var tempID = temp2.substring(4,5);


    if(!btnLock && (tempID != gallery_NUM)){
        var btn = this.id;
        var btnID = btn.substring(4,5);

        PrevSlide_NUM   =   parseInt(currentSlide_NUM);
        
        prev_gallery_NUM     =   parseInt(gallery_NUM);
        gallery_NUM     =   parseInt(btnID);

        tracking(btn);

        if(gallery_NUM == 1){currentSlide_NUM = 1;}
        if(gallery_NUM == 2){currentSlide_NUM = 4;}
        if(gallery_NUM == 3){currentSlide_NUM = 7;}
        if(gallery_NUM == 4){currentSlide_NUM = 10;}
        if(gallery_NUM == 5){currentSlide_NUM = 13;}
        if(gallery_NUM == 6){currentSlide_NUM = 16;}
        

        if(currentSlide_NUM != PrevSlide_NUM){
            SideNav_RESET(this);
        } 

        btnLock = false;

          var tempNavigationObj = getSymbol('navigation');
    }  
}

function thumbnail_CLICK(e){
    
    if(!btnLock || !btnLock && PrevSlide_NUM != -1 && currentSlide_NUM == 1){
        
        var btn = this.id;
        if(btn.length == 11){
            var btnID = btn.substring(btn.length -1, btn.length);
        }else{
            var btnID = btn.substring(btn.length -2, btn.length);
        }
        
        PrevSlide_NUM = parseInt(currentSlide_NUM);
        currentSlide_NUM = parseInt(btnID);

        

        if(PrevSlide_NUM != currentSlide_NUM){
            SideNav_RESET(this);
            console.log(trackingArr[gallery_NUM]+'_'+currentSlide_NUM + '_thumbnail');
            EB.userActionCounter(trackingArr[gallery_NUM]+'_'+currentSlide_NUM + '_thumbnail');
        }    
    }
}

// Register Listeners for slides
function initListeners_Btns_GALLERY(){

    // build a object that will hold button property sections.
    for (var i = 1 ; i <= 6; i++) {
        navObj['navHeader_'+i] = getSymbol("nav_"+i+'_header');
        navObj['navHeader_'+i].addEventListener("click", propertySectionHeader_CLICK);
    };

    for (var i = 1 ; i <= 18; i++) {
        navObj['navBtn_'+i] = getSymbol("thumbnail_"+i); 
        
        if(!isIOS){
            navObj['navBtn_'+i].addEventListener("mouseover", thumbnail_CLICK);
        }
        
        navObj['navBtn_'+i].addEventListener("click", thumbnail_CLICK);
    };


    navObj['slideClick_1'] = getSymbol("click_"+1);
    navObj['slideClick_1'].addEventListener("click", slideClickthrough);

}

//========================================================
//=========== SIZMEK CODE BELOW ==========================
// SIZMEK VIDEO TRACKING //
function initializeVideoComponent(){
        
    initVideo();

    if (isIOS) {
        centerWebkitVideoControls();
    }
}

function initVideo() {
    var sdkData = EB.getSDKData();
    var useSDKVideoPlayer = false;
    var sdkPlayerVideoFormat = "mp4"; // or use "webm" for the webm format

    if (sdkData !== null) {
        if (sdkData.SDKType === "MRAID" && sdkData.version > 1) {
            document.body.classList.add("sdk");

            // set sdk to use custom close button
            EB.setExpandProperties({
                useCustomClose: true
            });

            var sourceTags = video.getElementsByTagName("source");
            var videoSource = "";

            for (var i = 0; i < sourceTags.length; i++) {
                if (sourceTags[i].getAttribute("type")) {
                    if (sourceTags[i].getAttribute("type").toLowerCase() === "video/" + sdkPlayerVideoFormat) {
                        videoSource = sourceTags[i].getAttribute("src");
                    }
                }
            }

            videoContainer.removeChild(video);
            video = null;

            sdkVideoPlayButton.addEventListener("click", function() {
                if (videoSource !== "") {
                    EB.playVideoOnNativePlayer(videoSource);
                }
            });

            useSDKVideoPlayer = true;
        }
    }

    if (!useSDKVideoPlayer) {
        videoContainer.removeChild(sdkVideoPlayer);
        var videoTrackingModule = new EBG.VideoModule(video);
    }
}

function forceVideoToDisplayInIE9() {
    video.style.height = "1px";
    setTimeout(function() {
        video.style.height = "";
    }, 100);
}

function centerWebkitVideoControls() {
    document.body.classList.add("ios-center-video-controls");
}

// load Event
window.addEventListener("load", initEB);

