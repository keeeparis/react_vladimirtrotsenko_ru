import React from 'react'

export default function CardLoader() {
    return (
        <div className="preloader-wrapper big active" style={{margin: 'auto'}}>
            {/* <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                    <div className="circle"></div></div>
                <div className="gap-patch">
                    <div className="circle"></div></div>
                <div className="circle-clipper right">
                    <div className="circle"></div></div>
            </div> */}

            <div className="spinner-layer spinner-red">
                <div className="circle-clipper left">
                    <div className="circle"></div></div>
                <div className="gap-patch">
                    <div className="circle"></div></div>
                <div className="circle-clipper right">
                    <div className="circle"></div></div>
            </div>

            <div className="spinner-layer spinner-yellow">
                <div className="circle-clipper left">
                    <div className="circle"></div></div>
                <div className="gap-patch">
                    <div className="circle"></div></div>
                <div className="circle-clipper right">
                    <div className="circle"></div></div>
            </div>

            <div className="spinner-layer spinner-green">
                <div className="circle-clipper left">
                    <div className="circle"></div></div>
                <div className="gap-patch">
                    <div className="circle"></div></div>
                <div className="circle-clipper right">
                    <div className="circle"></div></div>
            </div>
        </div>
    )
}
