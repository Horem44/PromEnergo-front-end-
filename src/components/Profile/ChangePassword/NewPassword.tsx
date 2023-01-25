import React, {FormEvent, useRef, useState} from "react";
import classes from "./ChangePassword.module.css";
import newPasswordValidator, {
    newPasswordData,
    newPasswordValidationResult,
} from "../../../util/validators/newPasswordValidator";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../../../Store/auth-slice";

const initialNewPasswordValidationResult: newPasswordValidationResult = {
    formIsValid: false,
    password: {
        isValid: true,
        message: "",
    },
    confirmPassword: {
        isValid: true,
        message: "",
    },
};

const NewPassword = () => {
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const history = useHistory();
    const { token } = useParams<{token: string}>();
    const dispatch = useDispatch();
    const confirmPasswordInputRef = useRef<HTMLInputElement>(null);

    const [newPasswordValidationResult, setNewPasswordValidationResult] =
        useState<newPasswordValidationResult>(initialNewPasswordValidationResult)

    const newPasswordFormSubmitHandler = (e: FormEvent) => {
        e.preventDefault();

        const newPasswordData: newPasswordData = {
            password: passwordInputRef.current!.value,
            confirmPassword: confirmPasswordInputRef.current!.value
        };

        const validationResult = newPasswordValidator(newPasswordData, newPasswordValidationResult);
        setNewPasswordValidationResult({...validationResult});

        if (newPasswordValidationResult.formIsValid) {
            fetch('http://localhost:8080/users/reset/' + token, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({password: newPasswordData.password}),
                credentials: "include"
            }).then(res => {
                return res.json();
            }).then(res => {
                console.log(res);
                dispatch(authActions.logout());
                history.push('/');
            }).catch(err => {
                console.log(err);
            })
        } else {
            console.log("Form is not valid");
        }

        return;
    };


    return (
        <>
            <div style={{height: "84px"}}></div>
            <div className={classes.change_password_container}>
                <form className={classes.change_password_form} onSubmit={newPasswordFormSubmitHandler}>
                    <label htmlFor="reg_password" className={classes.change_password_label}>
                        Новий пароль
                    </label>
                    <input
                        ref={passwordInputRef}
                        type="password"
                        id="reg_password"
                        className={`${classes.change_password_input} ${!newPasswordValidationResult.password.isValid
                            ? classes.change_password_error_input : ''}`}
                    />

                    {!newPasswordValidationResult.password.isValid && (
                        <p className={classes.change_password_error}>
                            {newPasswordValidationResult.password.message}
                        </p>
                    )}

                    <label htmlFor="reg_password" className={classes.change_password_label}>
                        Введіть пароль ще раз
                    </label>
                    <input
                        ref={confirmPasswordInputRef}
                        type="password"
                        id="reg_confirm_password"
                        className={`${classes.change_password_input} ${!newPasswordValidationResult.confirmPassword.isValid
                            ? classes.change_password_error_input : ''}`}
                    />
                    {!newPasswordValidationResult.confirmPassword.isValid && (
                        <p className={classes.change_password_error}>
                            {newPasswordValidationResult.confirmPassword.message}
                        </p>
                    )}

                    <button type='submit' className={classes.change_password_btn}>Змінити пароль</button>
                </form>
            </div>
        </>
    );
};

export default NewPassword;