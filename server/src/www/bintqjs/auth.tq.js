
const form = document.querySelector('form');
const socket = io();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('tq:exists', {username: inputNomTQ.value})
    socket.once('tq:exists', (data) => {
        if(data == null){
            socket.emit('tq:register', { tquser: inputNomTQ.value });
            socket.on('save:LS', (data) => {
                localStorage.setItem(data._id, data.key);
                socket.emit('tq:login', data);
            });
        }else{
            data.key = localStorage.getItem(data._id);
            socket.emit('tq:login', data)
        }
        socket.once('tq:login', async (res) => {
            if(res.expired){
                A.trigger('Este usuario ha expirado.', {
                    btnHTML: '<button id="btn-ok" class="btn red darken-4 waves-light waves-effect" onclick="A.ok()">Ok</button>'
                });
                setElementsRed();
                return 0;
            }
            inputKey.value = (res.key != null ? res.key : 'err');
            inputKey.hidden = true;
            form.insertBefore(inputKey, form.querySelector('div'));
            let settings = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                mode: 'same-origin'
            }
            const resp = await fetch(`/auth?tqpwd=${inputKey.value}&tquser=${inputNomTQ.value}`, settings);
            const jres = await resp.json();
            if(jres.ok)
                window.location.replace(`${window.origin}/auth/${inputNomTQ.value}`)
            else{
                A.trigger('Este usuario no está disponible.', {
                    btnHTML: '<button id="btn-ok" class="btn red darken-4 waves-light waves-effect" onclick="A.ok()">Ok</button>'
                });
                setElementsRed();
            }
        });
    })
});
// Debug purpose
(() => {
    socket.on('date-time', (data) => {
        document.querySelector('#date-n-time').innerHTML = data.iso;
    });
    socket.on('connections:updated', (data) => {
        document.querySelector('#active-connections').innerHTML = data.n;
    });
})();