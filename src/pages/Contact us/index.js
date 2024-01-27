import React from 'react'
import { useEffect, useState } from 'react';

export default function Contact() {
    const [WalletAddress, setWalletAddress] = useState(null);


    const handleClick = async () => {
        if (window.ethereum) {
            console.log('detected');

            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setWalletAddress(accounts[0]);
                console.log('accounts[0]', accounts[0]);

            } catch (error) {
                console.log('Error connecting...');
            }

        } else {
            alert('Meta Mask not detected');
        }
    }




    return (
        <>
            <div >
                <h1>Hello i m Home</h1>
                <div >

                    <button type="button" class="btn btn-primary btn-sm" onClick={handleClick}>Connect Wallet</button>
                    <p>lorem32</p>

                </div>
            </div>
        </>
    )

}
