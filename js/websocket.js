let ws = null

const setText = data => {
    const msg = `<div>${data.name}: ${data.message}</div>`
    chat.insertAdjacentHTML('beforeend',msg)
}

btnConnect.addEventListener('click', event => {
    ws = new WebSocket('ws://demos.kaazing.com/echo')
    ws.onopen = () => setText('Connected')
    ws.onclose = () => setText('Disconnected')
    ws.onerror = e => setText(e)
    ws.onmessage = m => {
        const input = JSON.parse(m.data)
        setText(input) 
    }
})

btnSend.addEventListener('click',  event => {
    const output = {
        name: txtName.value,
        message: txtMsg.value 
    }
    ws.send(JSON.stringify(output));
})

btnDisconnect.addEventListener('click', event => {
    ws.onclose()
})
