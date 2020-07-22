class ValidationFields{ // model de validação de dados
    constructor() {
        this.errors = new Array();
    }
    isRequired(value, message){
        if (!value || value.length <= 0) this.errors.push({ message: message });
    }

    hasMinLen(value, min, message){
        if (!value || value.length < min) this.errors.push({ message: message });
    }

    hasMaxLen(value, max, message){
        if (!value || value.length > max) this.errors.push({ message: message });
    }
    isEmail(value,message){
        let reg = new RegExp(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i);
        if(!reg.test(value)) this.errors.push({message:message});
    }
    isNumber(value,message){
        if( isNaN(value) == true || typeof value != 'number') this.errors.push({message:message});
    }
    isValid(){
        return this.errors.length == 0 ? true:false;
    }
}


module.exports = ()=>{
    return ValidationFields;
}