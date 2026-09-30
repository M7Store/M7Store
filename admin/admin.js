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

message.textContent = "Supabase conectado. Faça login.";
message.style.color = "#55ff88";

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Entrando...";
    message.style.color = "#aaa";

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        console.error(error);

        message.textContent = "Erro: " + error.message;
        message.style.color = "#ff5555";

        return;
    }

    console.log("Usuário conectado:", data.user);

    message.textContent = "✅ Login realizado com sucesso!";
    message.style.color = "#55ff88";
});