import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_vfqR52SPO3xNm1jq5rMxnqY31erFHWg",
  authDomain: "reiki-gerenciamento.firebaseapp.com",
  projectId: "reiki-gerenciamento",
  storageBucket: "reiki-gerenciamento.firebasestorage.app",
  messagingSenderId: "913549564652",
  appId: "1:913549564652:web:7594db85cbcd820c0a23c9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add Contact
async function addContact(name, taxNumber, phone, email, notes) {
    try {
        await addDoc(collection(db, "contacts"), {
            name: name || "N/A",
            taxNumber: taxNumber || "N/A",
            phone: phone || "N/A",
            email: email || "N/A",
            notes: notes || "N/A",
            createdAt: new Date()
        });
        return true;
    } catch (error) {
        console.error("Erro ao adicionar contato:", error);
        return false;
    }
}

// Load Contacts
async function loadContacts() {
    try {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        const contacts = [];
        querySnapshot.forEach((doc) => {
            contacts.push({ id: doc.id, ...doc.data() });
        });
        return contacts;
    } catch (error) {
        console.error("Erro ao carregar contatos:", error);
        return [];
    }
}

// Search Contact
async function searchContact(query) {
    try {
        const contacts = await loadContacts();
        const searchLower = query.toLowerCase();
        return contacts.find(c => 
            (c.name && c.name.toLowerCase() === searchLower) || 
            (c.taxNumber && c.taxNumber.toLowerCase() === searchLower)
        );
    } catch (error) {
        console.error("Erro ao procurar contato:", error);
        return null;
    }
}

// Update Contact
async function updateContact(contactId, name, taxNumber, phone, email, notes) {
    try {
        await updateDoc(doc(db, "contacts", contactId), {
            name: name || "N/A",
            taxNumber: taxNumber || "N/A",
            phone: phone || "N/A",
            email: email || "N/A",
            notes: notes || "N/A"
        });
        return true;
    } catch (error) {
        console.error("Erro ao atualizar contato:", error);
        return false;
    }
}

// Delete Contact
async function deleteContact(contactId) {
    try {
        await deleteDoc(doc(db, "contacts", contactId));
        return true;
    } catch (error) {
        console.error("Erro ao deletar contato:", error);
        return false;
    }
}

// Export functions for use in HTML
window.addContact = addContact;
window.loadContacts = loadContacts;
window.searchContact = searchContact;
window.updateContact = updateContact;
window.deleteContact = deleteContact;
