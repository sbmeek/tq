'use strict';

const form = document.querySelector('form');
var socket = io()

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
            inputKey.value = (res.key != null ? res.key : 'err');
            inputKey.hidden = true;
            form.insertBefore(inputKey, form.querySelector('div'));
            
            let url = `/tq-auth?tqpwd=${inputKey.value}&tquser=${inputNomTQ.value}`
            const resp = await fetch(url, { method: 'POST' });
            const jres = await resp.json();
            (jres.ok ? window.location.replace(`${window.origin}/tq-auth/${inputNomTQ.value}`) : setElementsRed());
        });
    })
});

(() => {
    socket.on('date-time', (data) => {
        document.querySelector('#date-n-time').innerHTML = data.iso;
    });
})();