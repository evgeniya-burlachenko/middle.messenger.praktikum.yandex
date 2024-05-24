export function validateEmail(email: string): boolean {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateLogin(login: string): boolean {
	return /^[a-zA-Z0-9_-]{3,20}$/.test(login);
}

export function validateName(name: string): boolean {
	return /^[A-Za-zА-Яа-яЁё-]+$/.test(name);
}

export function validatePassword(password: string): boolean {
	return /(?=.*\d)(?=.*[A-Z]).{8,40}/.test(password);
}

export function validatePasswordRepeat(password: string, passwordRepeat: string): boolean {
	return password === passwordRepeat;
}

export function validatePhone(phone: string): boolean {
	return /^(\+?\d{10,15})$/.test(phone);
}

export function validateMessage(message: string): boolean {
	return message.trim().length > 0;
}
