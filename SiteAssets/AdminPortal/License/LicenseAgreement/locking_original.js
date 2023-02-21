
var Istrue = false;

function myunlock() {

    if (be04ba2170f3c(document.getElementById("txtunlock").value)) {
        document.getElementById("div_lock").removeAttribute("style");
        document.getElementById("div_lock").style.display = "none";
        document.getElementById("s4-bodyContainer").removeAttribute("style");
    } else {
        alert("Your Password is worng");
    }
}

function be04ba2170f3cd54ba828343ccd28367(str) {
    return str.split('').reverse().join('')
}

function myunlockencrypted() {



    var hash = document.getElementById("Locking_id").value; //CryptoJS.MD5("Adapt@123");
    var inputPass = CryptoJS.MD5(document.getElementById("txtunlock").value);
    if (inputPass.toString() == hash.toString()) {
        document.getElementById("div_lock").removeAttribute("style");
        document.getElementById("div_lock").style.display = "none";
        document.getElementById("s4-bodyContainer").removeAttribute("style");
    } else {
        alert("Your Password is worng");
    }

}

function be04ba2170f3c(days) {
    const date = Date.now();
    const d = new Date();
    const day = d.getDay();
    const Year = d.getFullYear();
    const options = {
        weekday: "long"
    };
    const Currentday = new Intl.DateTimeFormat("en-US", options).format(date);
    const Ischeck = day + be04ba2170f3cd54ba828343ccd28367(Currentday.toLowerCase()) + Year;
    if (Ischeck == days) {
        Istrue = true;
    }
    return Istrue;

}