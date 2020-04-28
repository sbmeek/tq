'use strict';

const inputNomTQ = document.querySelector('.inputNomTQ');
const btnTQ = document.querySelector('.btnTQ');
const inputKey = document.createElement('input'); inputKey.name = 'tqpwd';
document.querySelector('.inputNomTQ').addEventListener('focus', () => {
    (
        inputNomTQ.style.borderColor != 'rgb(217, 48, 37)' && 
        inputNomTQ.style.borderColor != 'rgb(128, 189, 255)'
        ?
        btnTQ.style.cssText += `
        color: #ccc;
        background-color: #fff !important;
        border-color: #80bdff !important;
        outline: 0 !important;
        box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(0, 123, 255, 0.25) !important;` : ''
    )
    resizeMainElements();
})

document.querySelector('.inputNomTQ').addEventListener('blur', () => {
    (
        inputNomTQ.style.borderColor != 'rgb(217, 48, 37)' && 
        inputNomTQ.style.borderColor != 'rgb(128, 189, 255)'
        ?
        btnTQ.style.cssText += `
        color: #fff;
        display: inline-block;
        background: #00909E !important;
        border: 1.5px solid #000 !important;
        border-left: none !important;
        border-top-right-radius: 30px 30px;
        border-bottom-right-radius: 30px 30px;
        border-top-left-radius: 0px 0px;
        border-bottom-left-radius: 0px 0px;
        box-sizing: border-box;
        box-shadow: none;
        padding: 0 7px;
        transition: ease-in .22s;` : ''
    )
        resizeMainElements();
});

document.querySelector('.btnTQ').addEventListener('click', (e) => {
    var valBtnTQ = document.querySelector('.inputNomTQ').value;
    valBtnTQ = valBtnTQ.replace(/\s/g, "");
    onInputNomTQKeyUp();
    if (valBtnTQ == "") {
        e.preventDefault();
        setElementsRed();
        onInputNomTQKeyUp();
        resizeMainElements();
    }
});

function setElementsRed(){
    inputNomTQ.style.cssText += 'border-color:#d93025!important;box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(249, 0, 0, 0.25) !important;';
    btnTQ.style.cssText += 'border-color:#d93025!important;box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(249, 0, 0, 0.25) !important;';
}

function onInputNomTQKeyUp() {
    inputNomTQ.addEventListener('keyup', (e) => {
            var inputVal = inputNomTQ.value;
            inputVal = inputVal.replace(/\s/g, "");
            document.querySelector('.inputNomTQ').value = inputVal;
            if (inputVal == "") {
                inputNomTQ.style.cssText += "border-color:#d93025!important; box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(249, 0, 0, 0.25) !important;";  
                btnTQ.style.cssText += "border-color:#d93025!important; box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(249, 0, 0, 0.25) !important;"; 
            }
            else {
                inputNomTQ.setAttribute('style', 'border-color:#80bdff!important;box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(76, 175, 80, 0.3) !important;');
                btnTQ.style.cssText += `color: rgb(204, 204, 204); !important;
                background-color: #fff !important;
                border-color: #80bdff !important;
                outline: 0 !important;
                box-shadow: -0.2rem 0.2rem 0.2rem 0rem rgba(0, 123, 255, 0.25) !important;`
            }
            resizeMainElements();
        });
}

document.querySelectorAll('._btn-tq').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('._btn-tq-focus');
        setTimeout(() => {
            btn.classList.toggle('._btn-tq-focus');
        }, 2000)
    })
});


function resizeMainElements(){
    const input = document.querySelector('.inputNomTQ');
    const btn   = document.querySelector('.btnTQ');
    btn.style.height = input.getBoundingClientRect().height+'px';
}

(() => {
    document.body.classList.add('d-scroll');
    let tqErr = document.querySelector('tq-error');
    if(tqErr){
        setElementsRed();
        console.log('👮🏿👮🏿⚰️👮🏿👮🏿')
    }
})();

window.addEventListener("resize", resizeMainElements);
onInputNomTQKeyUp();
resizeMainElements();