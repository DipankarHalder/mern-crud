import React from 'react'

export const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <section className="app-fwidth app-footer">
            <div className="app-largecontainer">
                <div className="app-fwidth app-ft-center">
                    <p>&copy; {year} contact items. &nbsp;<b><br />design &amp; developed by #dipankar, (#mongo, #express, #react, #node)</b></p>
                </div>
            </div>
        </section>
    )
}
