import {WebSocketServer} from "ws";
import {handleIncomingAuctionAction} from "./controllers/auctionController.js";
import { v4 as uuidv4 } from 'uuid';
import {sessionParser} from "./app.js";

export const wss = new WebSocketServer({ noServer: true, clientTracking: true, path: "/api/auction"})

let interval;
let clients = [];

//Handle socket connection to client and data exchange
wss.on("connection", (ws, req, param) => {
    ws.isAlive = true;
    ws.connectionId = uuidv4();
    ws.userId = param.userId;
    ws.on('pong', heartbeat);
    ws.on('close', handleClose);
    ws.on("message", (data, isBinary) => {
        try {
            const action = isBinary ? data : data.toString();
            handleIncomingAuctionAction(action, ws).then(r => r);
        } catch (err) {
            ws.send(JSON.stringify({}))
        }
    })

    // Store connection information
    const clientInfo = {
        userId: ws.userId,
        connectionId: ws.connectionId,
        socket: ws
    };
    clients.push(clientInfo);

});

function init(server) {
    //Handle upgrade request from client
    server.on("upgrade", (request, socket, head) => {
        console.log("Attempting connection for client " + request.socket.remoteAddress);
        // Make sure that we only handle WebSocket upgrade requests
        if (request.headers['upgrade'] !== 'websocket') {
            socket.end('HTTP/1.1 400 Bad Request');
            return;
        }
        sessionParser(request, {}, () => {
            if (!request.session || !request.session.passport || !request.session.passport.user) {
                socket.end('HTTP/1.1 403 Forbidden');
                return;
            }
            wss.handleUpgrade(request, socket, head, (ws) => {
                console.log("Emitting connection for client " + request.socket.remoteAddress);
                wss.emit('connection', ws, request, {
                    userId: request.session.passport.user
                });
            });
        });
    });
    // Check all connections once in a while
    interval = setInterval(() => {
        wss.clients.forEach((ws) => {
            if (!ws.isAlive) return ws.terminate();
            ws.isAlive = false;
            ws.ping(noop);
        });
    }, process.env.AUCTION_WEBSOCKET_HEARTBEAT);
}

function heartbeat() {
    this.isAlive = true
}

/**
 * Noop
 */
function noop() {}

function handleClose() {
    clients = clients.filter(c => c.connectionId !== this.connectionId);
}

export default init