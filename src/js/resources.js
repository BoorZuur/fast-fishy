import { ImageSource, Sound, Resource, Loader, ImageWrapping } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Background: new ImageSource('images/water.jpg', { wrapping: ImageWrapping.Repeat}),
    Ground: new ImageSource('images/sand.png', { wrapping: ImageWrapping.Repeat}),
    Fish: new ImageSource('images/fish.png'),
    Shark: new ImageSource('images/shark.png'),
    Coral1: new ImageSource('images/coral1.png'),
    Coral2: new ImageSource('images/coral2.png'),
    Coral3: new ImageSource('images/coral3.png'),
    Coral4: new ImageSource('images/coral4.png'),
    NomNom: new Sound('sounds/plop.mp3'),
    Bones: new ImageSource('images/bones.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }