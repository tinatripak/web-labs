import validator from 'validator';


class ValidateFields {
    validateEmail(email) {
        if (validator.isEmpty(email)) {
            return 'Email is required';
        } else if (!validator.isEmail(email)) {
            return 'Email should be written like "pretty@gmail.com"';
        }
        return false;
    }

    validatePassword(password) {
        if (validator.isEmpty(password)) {
            return 'Password is required';
        } else if (!validator.isLength(password, { min: 6 })) {
            return 'Password should be minimum 6 characters';
        }
        return false;
    }
    validatePhone(phone) {
        const phoneRegex = /^\((\d{3})\)-\d{3}-\d{2}-\d{2}/;
        if (validator.isEmpty(phone)) {
            return 'Phone is required';
        } else if (!phoneRegex.test(phone)) {
            return 'Phone should be Ukrainian like (099)-771-62-95';
        }
        return false;
    }
    validatePhoto(photo) {
        const ext = photo.split('.').pop().toLowerCase()
        console.log(ext)
        if (ext!=="jpg" && ext!=="jpeg" && ext!=="png") {
            return 'Phone should have extension jpg, jpeg or png';
        }
        return false;
    }
    validateName(name) {
        const fullNameRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]+\s[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]\.[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]\./;
        if (validator.isEmpty(name)) {
            return 'Name is required';
        } else if (!validator.isLength(name, { min: 6 })) {
            return 'Name should be minimum 6 characters';
        } else if (!fullNameRegex.test(name)) {
            return 'Name should be written like Santa K.O.';
        }
        return false;
    }
    validateGroup(group){
        const groupRegex = /^[а-щА-ЩЬьЮюЯяЇїІіЄєҐґ]{2}-\d{2}/;
        if (validator.isEmpty(group)) {
            return 'Group is required';
        } else if (!groupRegex.test(group)) {
            return 'Group should be written like IT-94';
        }
        return false;
    }
    validateVariant(variant){
        if (validator.isEmpty(variant)) {
            return 'Variant is required';
        } else if (variant <1 || variant> 11) {
            return 'Variant is more 0 and less than 11';
        }
        return false;
    }
}

const validateFields = new ValidateFields();

export { validateFields };