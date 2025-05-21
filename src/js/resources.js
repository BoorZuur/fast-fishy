import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Background } from './background'

// voeg hier jouw eigen resources toe
const Resources = {
    Fish: new ImageSource('images/fish.png'),
    Background: new ImageSource('images/water.jpg'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }