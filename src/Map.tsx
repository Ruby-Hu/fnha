import './Map.css';
import { Dispatch, SetStateAction, useState } from 'react';
import Houseone from './houseone';
import { Drawer } from '@mantine/core';


const LandImg = '/img/base-map-no-bg.svg'
const houseData = [
    {className: 'Examination-room', image: '/img/examination-room.svg', marker: '/img/examination-room-tag.svg', content: <Houseone/>},
    {className: 'Counselling-room', image: '/img/consulting-room.svg', marker: '/img/counselling-room-tag.svg', content:  <div>content 2</div>},
    {className: 'Healing-room', image: '/img/healing-room.svg', marker: '/img/healing-room-tag.svg', content:  <div>content 3</div>},
    {className: 'Pharmacy', image: '/img/pharmacy.svg', marker: '/img/pharmacy-tag.svg', content:  <div>content 4</div>},
    {className: 'Medicine-room', image: '/img/medicine-room.svg', marker: '/img/medicine-room-tag.svg', content:  <div>content 5</div>},
];


type HouseProps = {
    className: string;
    image: string;
    marker: string;
    onClick: Dispatch<SetStateAction<string | null>>;
}

function House({className, image, marker, onClick}: HouseProps) {

    // for showing name tag
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    // for showing side panel
    const handleClick = () => {
        onClick(className);
    }

    return (
        <button className={`Houses ${className}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleClick}>
            {isVisible && <img className='Marker' src={marker} alt={`${marker}`}/>}
            <img className='House-img' src={image} alt={`${image}`} />
        </button>
    );
}


export default function Map() {
    const [currentHouse, setCurrentHouse] = useState<string | null>(null)
    function close()  {
        setCurrentHouse(null);
    }

    const selectedContent = houseData.find(el => el.className === currentHouse)?.content;


    return (
        <>
            <Drawer opened={currentHouse !== null} onClose={close} size="40%">
                {selectedContent}
            </Drawer>
            <div className='map-container'>
                <img 
                    className="Map"
                    src={LandImg}
                    alt="Island">
                </img>
                {houseData.map((house, index) => 
                    <House
                        image={house.image}
                        marker={house.marker}
                        key={index}
                        className={house.className}
                        onClick={setCurrentHouse}
                    />
                )}
            </div>

        </>
    );
}