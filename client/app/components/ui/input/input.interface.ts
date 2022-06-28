import {HTMLAttributes} from "react";

export interface IInput extends HTMLAttributes<HTMLInputElement> {
    placeholder?: string
    type?: string
}