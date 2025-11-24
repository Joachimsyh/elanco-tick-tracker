import rodentTick from '../assets/Ixodes_acuminatus.jpg';
import starvedMarshTick from '../assets/Ixodes_ricinus_starved.jpg';
import hedgehogTick from '../assets/Ixodes_hexagonus.jpg';
import treeHoleTick from '../assets/Ixodes_arboricola.jpg';
import foxBadgerTick from '../assets/Ixodes_canisuga.jpg';
// Define a static array holding all the information for each tick species
// This serves as our "data model" for the component
const speciesInfo = [
    {
        imageURL: rodentTick,
        name: "Southern rodent-Tick",
        description: "The Southern rodent-Tick (Ixodes acuminatus) is a species of hard tick in the family Ixodidae. It primarily parasitises small mammals such as rodents and shrews, and occasionally larger mammals and humans. It is widely distributed across Europe, including the UK and parts of Russia, and is found in humid woodland and burrow environments.",
        diseases: "Associated with Babesia microti, Louping-ill virus and Q fever among small-mammal host cycles.",
        activity: "It is commonly found in rodent nests, burrows and underground host habitats, typically in forest or humid meadow regions rather than open fields.",
    },
    {
        imageURL: starvedMarshTick,
        name: "Marsh Tick",
        description: "The Marsh Tick (Ixodes ricinus), also called the castor-bean tick, is a widely distributed European hard tick of the Ixodidae family. It can grow up to about 11 mm when fully engorged, and parasitises a wide range of hosts including mammals, birds and reptiles. :contentReference[oaicite:3]{index=3}",
        diseases: "Known vector of Lyme disease (Borrelia burgdorferi sensu lato), tick-borne encephalitis virus (TBE), Anaplasma spp. and Babesia spp. ",
        activity: "Lives in humid woodlands, heathland and grassy vegetation where hosts are abundant; follows a three-host lifecycle often taking 2-3 years to complete.",
    },
    {
        imageURL: hedgehogTick,
        name: "Hedgehog Tick",
        description: "The Hedgehog Tick (Ixodes hexagonus) is a nest-dwelling hard tick species of Europe that primarily parasitises hedgehogs but also foxes, dogs and cats.",
        diseases: "The tick carries Borrelia spirochaetes (Lyme disease agents) and may serve as a reservoir-host vector in urban gardens though human bites are less commonly reported.",
        activity: "Typically found in burrows and nests of mammals; it feeds in more sheltered, humid environments rather than questing out in open vegetation.",
    },
    {
        imageURL: treeHoleTick,
        name: "Tree-hole Tick",
        description: "The Tree-hole Tick (Ixodes arboricola) is a species of tick in the genus Ixodes that parasitises small passerine birds, often in tree-hole or cavity habitats.",
        diseases: "Less commonly reported biting humans; its role in pathogen transmission is not well documented.",
        activity: "Found in bird nests and tree-hole habitats, this species specialises on nest-dwelling birds rather than large mammals.",

    },
    {
        imageURL: foxBadgerTick,
        name: "Fox/Badger Tick",
        description: "The Fox/Badger Tick (Ixodes canisuga), commonly called the dog-tick in Europe, is a hard-tick species of the family Ixodidae that inhabits dens and burrows of foxes, badgers, dogs and other mammals.",
        diseases: "Occasionally bites humans but is primarily a parasite of carnivores; though low incidence, it may harbour zoonotic pathogens in mammal dens.",
        activity: "Lives primarily in sheltered, burrow-based environments and is frequently found in kennels or animal shelters rather than seeking hosts in open vegetation.",
    }
];

export default speciesInfo;