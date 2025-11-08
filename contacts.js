function loadContacts() {
    const contacts = localStorage.getItem('contacts');
    return contacts ? JSON.parse(contacts) : [];
}

function saveContacts(contacts) {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function addContact(name, taxNumber, phone, email, notes) {
    const contacts = loadContacts();
    contacts.push({ name, taxNumber, phone, email, notes });
    saveContacts(contacts);
}