export class AssetLoader {
    static images = {};

    static load(name, src) {
        return new Promise(resolve => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                AssetLoader.images[name] = img;
                resolve(img);
            };
        });
    }

    static get(name) {
        return AssetLoader.images[name];
    }
}