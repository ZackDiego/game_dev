export class InputHandler {
     constructor() {
        this.keys = new Set();

        window.addEventListener("keydown", e => {
            if ([
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
                "Space"
            ].includes(e.code)) {
                this.keys.add(e.code);
            }
        });

        window.addEventListener("keyup", e => {
            this.keys.delete(e.code);
        });
     }
}