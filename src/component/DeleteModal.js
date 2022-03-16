import React, { useState } from 'react';
import './DeleteModal.css';

function DeleteModal(props) {
    function cancelHandler() {
        props.onCancel();
    }

    function confirmHandler() {
        props.onConfirm(password);
    }

    const [value, setValue] = useState({
        password: ''
    });

    const { password } = value;
    const handleChange = (event) => {
        setValue({
            ...value,
            [event.target.name] : event.target.value
        });
    }

    return (
        <div className="modal">
            <p>삭제하려면 비밀번호를 입력해주세요.</p>
            <input type="password" name="password" onChange={handleChange} />
            <br/>
            <br/>
            <button className="btn" onClick={confirmHandler}>
                확인
            </button>
            <button className="btn btn--alt" onClick={cancelHandler}>
                취소
            </button>
        </div>
    );
}

export default DeleteModal;