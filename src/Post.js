import React from 'react';
import { db } from './firebase.js';
import { useEffect, useState } from 'react';
import firebase from 'firebase';

function Post(props) {
    const [comentarios, setComentarios] = useState(null);

    useEffect(() => {
        db.collection('posts').doc(props.id).collection('comentarios').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setComentarios(snapshot.docs.map((document) => {
                return {
                    id: document.id,
                    info: document.data()
                }
            }));
        })
    }, []);

    function comentar(id, e) {
        if(id == null){
            alert('erro');
            return;
        }
        e.preventDefault();
        let comentarioAtual = document.getElementById('comentario-' + id).value;
        db.collection('posts').doc(id).collection('comentarios').add({
            nome: props.user,
            comentario: comentarioAtual,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        document.getElementById('comentario-' + id).value = "";
    }

    return (
        <div className='postSingle'>
            <img src={props.info.image}></img>
            <p><b>{props.info.username}</b>: {props.info.texto}</p>

            <div className='coments'>
                {comentarios ? (
                    comentarios.map((val) => (
                        <div className='coment-single'>
                            <p><b>{val.info.nome}</b>: {val.info.comentario}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            <form onSubmit={(e) => comentar(props.id, e)}>
                <textarea id={'comentario-' + props.id}></textarea>
                <input type='submit' value='Comentar!'></input>
            </form>
        </div>
    )
}

export default Post;