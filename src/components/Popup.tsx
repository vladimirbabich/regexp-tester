import React, { useEffect, useState } from 'react';
import './../App.scss';
export default function Popup() {
    return (
        <div className='position-absolute mt-5 start-50 translate-middle zindex-popover'>
            <div>
                <span className='starLT'>★</span>
                <span className='starT'>★</span>
                <span className='starRT'>★</span>
            </div>
            <span className='starL'>★</span>
            <span className='popupText'>Great!</span>
            <span className='starR'>★</span>
        </div>

    );
}