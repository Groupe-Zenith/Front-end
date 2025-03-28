import React from 'react';
import GIFError from '../../assets/images/.GIF/404-Page.gif'
import "./errorPage.scss";

export default function ErrorPage() {
    return (
        <div className="error-page">
            <div className="gif-image">
                <img src={GIFError} alt="Error image" />
            </div>
            <div className="button-return">
                <button onClick={() => window.history.back()}>Revenir en arrière</button>
            </div>
        </div>
    );
}