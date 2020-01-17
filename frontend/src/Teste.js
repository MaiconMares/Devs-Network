import React from 'react';

function Teste(props) {
    return (
        <>
        <h1>Isso é apenas um teste.</h1>
        <h2>Este componente possui o atributo title = {props.title}</h2>
        </>
        /* Essa tag sem nome se chama tag fragmentada e serve para resolver 
           um problema do React. O problema é que mais de um elemento HTML que esteja
           um embaixo do outro não pode estar sem nenhuma tag em volta. Assim, 
           utilizamos essa tag que não possui significado. */
    );
}
/* Cada arquivo deve conter somente um componente. Um componente pode usar outro
componente. */

export default Teste;