
const tqLinkUser = document.getElementById('_tq-link-user');
const btnLink = document.querySelector('#link')
var sldIntervalID = null;
tqLinkUser.value = location.origin+'/'+tqLinkUser.value;

function copyLink(){
    tqLinkUser.select();
    tqLinkUser.setSelectionRange(0, 99999);
    document.execCommand("copy");
    Alert.trigger('Link copiado',/*{
        btnCSS: `box-sizing: border-box !important;width: 100%;margin-bottom: 10px;`, (Defecto)
        btnHTML: `<button id="btn-ok" class="btn cyan waves-light waves-effect" onclick="alert.ok()">Ok</button>`, (Defecto)
        titleHTML: `<img class="responsive-img alert-img" src="/img/ltqrNEW.png" />`, (Defecto)
    }*/);
}

startSlider = () => {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
        indicators: true,
        fullWidth: true,
        numVisible: 4
    });
    sldIntervalID = setInterval(() => {
        instances[0].next()
    }, 3000);
}

document.addEventListener('DOMContentLoaded', startSlider)