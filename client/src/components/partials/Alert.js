
import logo from '../../assets/images/logo.tq.png';
import { enableScroll, disableScroll } from './DE-Scroll';
import './Alert.css';

let winW = null
let winH = null
let alertoverlay = null
let alertbox = null
let alertBoxInner = null;
let alertBoxBody = null;
let xBtn = null;
let isAlerted = false;
let btnLink = null;
let alertTitle = document.createElement('div');

export default class Alert{

    // eslint-disable-next-line
    trigger = (msg, opts) => {
        opts = (opts === undefined ? {} : opts);
        btnLink = opts.btnLnk;
        // link => screen/component 
        // (waves-effect/waves-light adds z-index. "0" to disable btn-copy-link);
        if('undefined' !== typeof btnLink) 
            btnLink.style.zIndex = "0";
        // Stops link component slider
        if('undefined' !== typeof opts.sldIntervalID)
            clearInterval(opts.sldIntervalID)
        //
        window.addEventListener('resize', () => {
            this.recenter();
        });
        disableScroll();

        let wAlert = document.createElement('div');
        wAlert.id = 'whole-alert'
        wAlert.innerHTML += `<div id="alertoverlay"></div>
        <div id="alertbox" class="center" style="width: 500px;">
            <div id="alertboxinner">
                <div id="alertboxhead"></div>
                <div id="alertboxbody" class="left-align"></div>
                <div id="alertboxfoot"></div>
            </div>
        </div>`;
        document.body.appendChild(wAlert);

        wAlert.classList.add("alert-anim", "faded-out")
        requestAnimationFrame(() => {
            wAlert.classList.remove("faded-out");
        });

        isAlerted = true;
        alertoverlay = document.querySelector('#alertoverlay');
        alertbox = document.querySelector('#alertbox');
        alertBoxInner = document.querySelector('#alertboxinner');
        alertBoxBody = document.querySelector('#alertboxbody');
        
        alertTitle.innerHTML = (opts.alertTitleHTML || `<img class="responsive-img alert-img" src=${logo} />`);
        alertbox.insertBefore(alertTitle, alertBoxInner);

        alertBoxBody.innerHTML = msg;

        let alertBoxFoot = document.querySelector('#alertboxfoot');
        alertBoxFoot.innerHTML = (opts.btnHTML || `<button id="btn-ok" class="btn cyan waves-light waves-effect">Ok</button>`);

        let btnOk = document.querySelector('#btn-ok');
        if(opts.startSlider !== undefined){
            btnOk.onclick = () => this.ok(opts.startSlider);
        }
        btnOk.onclick = () => this.ok();
        btnOk.setAttribute('style', opts.btnCSS || `box-sizing: border-box !important;
        width: 100%;
        margin-bottom: 10px;`)
        this.recenter();
        document.body.classList.add('d-scroll');
    }
    // eslint-disable-next-line
    ok = (startSlider = null) => {
        //link => screen/component
        if('undefined' !== typeof btnLink) btnLink.innerHTML = `Copia el link aqu&iacute;
        <i class="material-icons right">
            link
        </i>`;
        if(null !== startSlider) startSlider();
        //

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
    recenter = () => {
        if(isAlerted){
            winW = window.innerWidth;
            winH = window.innerHeight;
            alertbox.style.maxWidth = "600px";
            alertoverlay.style.display = "block";
            alertoverlay.style.height = winH+"px";
            alertbox.style.top = "100px";
            alertbox.style.display = "block";
            alertbox.style.left = (winW/2) - (alertbox.getBoundingClientRect().width * .5)+"px";
            
            if(xBtn != null) xBtn.remove();
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