import React, { useState, useEffect } from "react";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType, BeaconEvent, defaultEventCallbacks } from "@airgap/beacon-sdk";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import { LedgerSigner } from "@taquito/ledger-signer";


const ConnectButton = ({ Tezos, setContract, setWallet, setUserAddress, setUserBalance, contractAddress, setBeaconConnection, setPublicToken, wallet }) => {
    const [loadingNano, setLoadingNano] = useState(false);
    const setup = async (userAddress) => {
        setUserAddress(userAddress);
        // updates balance
        const balance = await Tezos.tz.getBalance(userAddress);
        setUserBalance(balance.toNumber());
        // creates contract instance
        const contract = await Tezos.wallet.at(contractAddress);
        setContract(contract);
    };
    const connectWallet = async () => {
        try {
            await wallet.requestPermissions({
                network: {
                    type: NetworkType.MAINNET,
                    rpcUrl: "https://api.tez.ie/rpc/mainnet"
                }
            });
            // gets user's address
            const userAddress = await wallet.getPKH();
            await setup(userAddress);
            setBeaconConnection(true);
        }
        catch (error) {
            console.log(error);
        }
    };
    const connectNano = async () => {
        try {
            setLoadingNano(true);
            const transport = await TransportU2F.create();
            const ledgerSigner = new LedgerSigner(transport, "44'/1729'/0'/0'", true);
            Tezos.setSignerProvider(ledgerSigner);
            //Get the public key and the public key hash from the Ledger
            const userAddress = await Tezos.signer.publicKeyHash();
            await setup(userAddress);
        }
        catch (error) {
            console.log("Error!", error);
            setLoadingNano(false);
        }
    };
    useEffect(() => {
        (async () => {
            // creates a wallet instance
            const wallet = new BeaconWallet({
                name: "Taquito Boilerplate",
                preferredNetwork: NetworkType.MAINNET,
                disableDefaultEvents: true,
                eventHandlers: {
                    // To keep the pairing alert, we have to add the following default event handlers back
                    [BeaconEvent.PAIR_INIT]: {
                        handler: defaultEventCallbacks.PAIR_INIT
                    },
                    [BeaconEvent.PAIR_SUCCESS]: {
                        handler: data => setPublicToken(data.publicKey)
                    }
                }
            });
            Tezos.setWalletProvider(wallet);
            setWallet(wallet);
            // checks if wallet was connected before
            const activeAccount = await wallet.client.getActiveAccount();
            if (activeAccount) {
                const userAddress = await wallet.getPKH();
                await setup(userAddress);
                setBeaconConnection(true);
            }
        })();
    }, []);
    return (
        React.createElement("div", { className: "buttons" },
            React.createElement("button", { className: "button", onClick: connectWallet },
                React.createElement("span", null,
                    React.createElement("i", { className: "fas fa-wallet" }),
                    "\u00A0 Connect with wallet")),
            React.createElement("button", { className: "button", disabled: loadingNano, onClick: connectNano }, loadingNano ? (React.createElement("span", null,
                React.createElement("i", { className: "fas fa-spinner fa-spin" }),
                "\u00A0 Loading, please wait")) : (React.createElement("span", null,
                React.createElement("i", { className: "fab fa-usb" }),
                "\u00A0 Connect with Ledger Nano")))));
};
export default ConnectButton;