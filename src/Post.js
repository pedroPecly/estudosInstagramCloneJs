import React from 'react';

function Post(props) {
    function comentar(id, e) {
        e.preventDefault();
        alert('comentando no post ' + id);
    }

    return (
        <div className='postSingle'>
            <img src={props.info.image}></img>
            <p><b>{props.info.username}</b>: {props.info.texto}</p>
            <form onSubmit={(e) => comentar(props.val.id, e)}>
                <textarea></textarea>
                <input type='submit' value='Comentar!'></input>
            </form>
        </div>
    )
}

export default Post;