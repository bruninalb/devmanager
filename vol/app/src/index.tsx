import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/';
import './boot.scss' ;
import Alert from "./components/Alert";
import {DeveloperProvider} from "./hooks/Developers";
import {LoadingProvider} from "./hooks/Loading";
import {AlertProvider} from "./hooks/Alert";
import Loading from "./components/Loading";
import {SearchProvider} from "./hooks/Search";
import {ModalsProvider} from "./hooks/Modals";

ReactDOM.render(
    <React.StrictMode>
        <LoadingProvider>
            <AlertProvider>
                <SearchProvider>
                    <DeveloperProvider>
                        <ModalsProvider>
                            <Loading/>
                            <Alert/>
                            <App/>
                        </ModalsProvider>
                    </DeveloperProvider>
                </SearchProvider>
            </AlertProvider>
        </LoadingProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

