
var winW = null
var winH = null
var alertoverlay = null
var alertbox = null
var alertBoxInner = null;
var alertBoxBody = null;
var xBtn = null;
var isAlerted = false;
var title = document.createElement('div');

class tqAlert{
    trigger(msg, opts){
        // Para: user-idx => view (waves-effect/waves-light agrega "z-index". Establecido a "0" para deshabilitar btnLink);
        if(typeof btnLink !== 'undefined') btnLink.style.zIndex = "0";
        (typeof sldIntervalID !== 'undefined' ? clearInterval(sldIntervalID) : 0);

        disableScroll();

        opts = (opts == undefined ? {} : opts);

        let wholeAlert = document.createElement('div');
        wholeAlert.id = 'whole-alert';

        wholeAlert.innerHTML += `<div id="alertoverlay"></div>
        <div id="alertbox" class="center" style="width: 500px;">
            <div id="alertboxinner">
                <div id="alertboxhead"></div>
                <div id="alertboxbody" class="left-align"></div>
                <div id="alertboxfoot"></div>
            </div>
        </div>`;

        document.body.appendChild(wholeAlert)
        wholeAlert.classList.add("alert-anim", "faded-out")
        requestAnimationFrame(() => 
            wholeAlert.classList.remove("faded-out")
        );

        isAlerted = true;
        alertoverlay = document.querySelector('#alertoverlay');
        alertbox = document.querySelector('#alertbox');
        alertBoxInner = document.querySelector('#alertboxinner');
        alertBoxBody = document.querySelector('#alertboxbody');
        
        title.innerHTML = (opts.titleHTML || `<img class="responsive-img alert-img" src="/img/logo.tq.png" />`);
        alertbox.insertBefore(title, alertBoxInner);

        alertBoxBody.innerHTML = msg;

        let alertBoxFoot = document.querySelector('#alertboxfoot');
        alertBoxFoot.innerHTML = (opts.btnHTML || '<button id="btn-ok" class="btn cyan waves-light waves-effect" onclick="A.ok()">Ok</button>');

        let btnOk = document.querySelector('#btn-ok');
        btnOk.setAttribute('style', opts.btnCSS || `box-sizing: border-box !important;
        width: 100%;
        margin-bottom: 10px;`)
        A.recenter();
        document.body.classList.add('d-scroll');
    }

    ok(){
        // Para: user-idx => view
        (typeof btnLink != 'undefined' ? btnLink.innerHTML = `Copia el link aqu&iacute;
        <i class="material-icons right">
            link
        </i>` : 0);
        if(typeof startSlider != 'undefined') startSlider();

        let wholeAlert = document.querySelector('#whole-alert');
        wholeAlert.classList.add("alert-anim", "almost-removed")
        wholeAlert.style.animationPlayState = "running";
        wholeAlert.addEventListener('animationend', () => {
            wholeAlert.remove();            
        });
        enableScroll();
        document.body.classList.remove('d-scroll');
        isAlerted = false;
    }

    recenter(){
        if(isAlerted){
            winW = window.innerWidth;
            winH = window.innerHeight;
            alertbox.style.maxWidth = "600px";
            alertoverlay.style.display = "block";
            alertoverlay.style.height = winH+"px";
            alertbox.style.top = "100px";
            alertbox.style.display = "block";
            alertbox.style.left = (winW/2) - (alertbox.getBoundingClientRect().width * .5)+"px";
            
            (xBtn != null ? xBtn.remove() : '');
            if(alertbox.getBoundingClientRect().width < 435){
                xBtn = document.createElement('span')
                xBtn.innerHTML = 'X';
                xBtn.onclick = () => this.ok();
                xBtn.id = 'x-btn';
                xBtn.setAttribute('class', 'red-text darken-3');
                xBtn.setAttribute('style', 'font-size: 20px;min-width: 25px;min-height: 40px;')
                alertBoxInner.appendChild(xBtn)
            }
            else{
                xBtn = document.createElement('button');
                xBtn.innerHTML = 'X';
                xBtn.onclick = () => this.ok();
                xBtn.id = 'x-btn';
                xBtn.setAttribute('class', 'btn red darken-3 waves-light waves-effect')
                alertBoxInner.appendChild(xBtn)
            }
        }
    }
}

window.addEventListener('resize', () => {
    A.recenter();
});

var A = new tqAlert();