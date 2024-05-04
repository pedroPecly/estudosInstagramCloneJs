import { useEffect, useState } from 'react';
import React from 'react';
import Logo from './img/logo.png';
import firebase from 'firebase';
import { auth, db, storage } from './firebase.js';

function Header(props) {
    const [user, setUser] = useState(null);
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState(null);

    useEffect(() => {

    }, []);

    function abrirModalCriarConta(e) {
        e.preventDefault();
        let modalCriarConta = document.querySelector('.modalCriarConta');

        modalCriarConta.style.display = 'block';
    }

    function fecharModalCriarConta() {
        let modalCriarConta = document.querySelector('.modalCriarConta');

        modalCriarConta.style.display = 'none';
    }

    function abrirModalUpload(e) {
        e.preventDefault();
        let modalUpload = document.querySelector('.modalUpload');

        modalUpload.style.display = 'block';
    }

    function fecharModalUpload() {
        let modalUpload = document.querySelector('.modalUpload');

        modalUpload.style.display = 'none';
    }

    function uploadPost(e) {
        e.preventDefault();

        let textoPost = document.getElementById('texto_post').value;
        let modalUpload = document.querySelector('.modalUpload');

        const uploadTask = storage.ref(`images/${file.name}`).put(file);

        uploadTask.on('stage_changed', (snapshot) => {
            const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        }, (erro) => {

        }, () => {
            storage.ref('images').child(file.name).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    texto: textoPost,
                    image: url,
                    username: props.user,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

                setProgress(0);
                setFile(null);

                alert('upload feito com sucesso!');

                document.getElementById('formUpload').reset()
                fecharModalUpload();
            });
        });
    }

    function criarConta(e) {
        e.preventDefault();
        let email = document.getElementById('email_cadastro').value;
        let username = document.getElementById('username_cadastro').value;
        let senha = document.getElementById('senha_cadastro').value;

        auth.createUserWithEmailAndPassword(email, senha).then((authUser) => {
            authUser.user.updateProfile({
                displayName: username
            });
            alert('Conta criada');

            let modalCriarConta = document.querySelector('.modalCriarConta');

            modalCriarConta.style.display = 'none';
        }).catch((error) => {
            alert(error.message);
        });
    }

    function logar(e) {
        e.preventDefault();
        let credenciais = document.getElementById('credenciais_login').value;
        let senha = document.getElementById('senha_login').value;

        auth.signInWithEmailAndPassword(credenciais, senha).then((auth) => {
            props.setUser(auth.user.displayName);
            alert('logado com sucesso');
            window.location.href = '/';
        }).catch((error) => {
            alert(error.message);
        });
    }

    function deslogar(e) {
        e.preventDefault();
        auth.signOut().then((val) => {
            props.setUser(null);
            window.location.href = '/';
        });
    }

    return (
        <div className="header">
            <div className='modalCriarConta'>
                <div className='formCriarConta'>
                    <div onClick={() => fecharModalCriarConta()} className='closeModalCriarConta'>X</div>
                    <h2>Criar conta</h2>
                    <form onSubmit={(e) => criarConta(e)}>
                        <input type='text' id='email_cadastro' placeholder='Seu email...'></input>
                        <input type='text' id='username_cadastro' placeholder='Seu username...'></input>
                        <input type='password' id='senha_cadastro' placeholder='Sua senha...'></input>
                        <input type='submit' value='Criar conta!'></input>
                    </form>
                </div>
            </div>
            <div className='modalUpload'>
                <div className='formUpload'>
                    <div onClick={() => fecharModalUpload()} className='closeModalUpload'>X</div>
                    <h2>Fazer post</h2>
                    <form id='formUpload' onSubmit={(e) => uploadPost(e)}>
                        <input type='text' id='texto_post' placeholder='texto para postagem...'></input>
                        <input onChange={(e) => setFile(e.target.files[0])} type='file' name='file'></input>
                        <progress id='progressUpload' value={progress}></progress>
                        <input type='submit' value='Fazer post!'></input>
                    </form>
                </div>
            </div>
            <div className='center'>
                <div className='header_logo'>
                    <img src={Logo}></img>
                </div>
                {
                    (props.user) ?
                        <div className='header_logadoInfo'>
                            <span>Olá, <b>{props.user}</b></span>
                            <a onClick={(e) => abrirModalUpload(e)} href='#'> Postar!</a>
                            <a onClick={(e) => deslogar(e)}>Deslogar!</a>
                        </div>
                        :
                        <div className='header_loginForm'>
                            <form onSubmit={(e) => logar(e)}>
                                <input id='credenciais_login' type='text' placeholder='login...'></input>
                                <input id='senha_login' type='password' placeholder='senha...'></input>
                                <input type='submit' name='acao' value='Logar!'></input>
                            </form>
                            <div className='btn_criarConta'>
                                <a onClick={(e) => abrirModalCriarConta(e)} href='#'>Criar conta!</a>
                            </div>
                        </div>
                }
            </div>
        </div>
    );
}


export default Header;
