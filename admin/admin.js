alert("ADMIN.JS FUNCIONANDO!");

const SUPABASE_URL =
    "https://kmxpwdgenkhqyhnjjfzf.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_UpAW1S3BKBNGGrlUCB_EvA_BwwDhBbF";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.textContent = "Entrando...";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        message.textContent = "Erro: " + error.message;
        return;
    }

    message.textContent = "LOGIN REALIZADO!";
});